export const SINISTER_STRIKE_RANKS = [
  { rank: "I", level: 1, bonusDamage: 3 },
  { rank: "II", level: 6, bonusDamage: 6 },
  { rank: "III", level: 14, bonusDamage: 10 },
  { rank: "IV", level: 22, bonusDamage: 15 },
  { rank: "V", level: 30, bonusDamage: 22 },
  { rank: "VI", level: 38, bonusDamage: 33 },
  { rank: "VII", level: 46, bonusDamage: 52 },
  { rank: "VIII", level: 54, bonusDamage: 68 },
];

const SINISTER_STRIKE = {
  energyCost: 40,
  globalCooldown: 1,
  aggressionMultiplier: 1.15,
};
const ENERGY_PER_SECOND = 10;
const TRIALS = 1000;

function countStrikes(duration) {
  let time = 0;
  let energy = 100;
  let attempts = 0;
  while (time <= duration) {
    attempts++;
    energy -= SINISTER_STRIKE.energyCost;
    const wait = Math.max(
      SINISTER_STRIKE.globalCooldown,
      (SINISTER_STRIKE.energyCost - energy) / ENERGY_PER_SECOND
    );
    time += wait;
    energy += wait * ENERGY_PER_SECOND;
  }
  return attempts;
}

function attackTable({ hit, crit, expertise, position }, isSwing) {
  // Equal-level NPC estimates with both weapon skills capped.
  const miss = Math.max(0, (isSwing ? 24 : 5) - hit);
  const dodge = Math.max(0, 5 - expertise);
  const parry = position === "front" ? Math.max(0, 5 - expertise) : 0;
  const glance = isSwing ? 10 : 0;
  const avoid = miss + dodge + parry;
  const critical = Math.min(crit, 100 - avoid - glance);
  return [
    { probability: avoid / 100, multiplier: 0 },
    { probability: glance / 100, multiplier: 0.95 },
    { probability: critical / 100, multiplier: 2 },
    { probability: (100 - avoid - glance - critical) / 100, multiplier: 1 },
  ];
}

function rawRange(weapon, apDamage, bonus = 0, multiplier = 1) {
  return [weapon.minDamage, weapon.maxDamage].map(
    (damage) => (damage + apDamage + bonus) * multiplier
  );
}

function rollDamage(attack, random) {
  let roll = random();
  for (const outcome of attack.outcomes) {
    if (roll < outcome.probability) {
      return (attack.min + random() * (attack.max - attack.min)) * outcome.multiplier;
    }
    roll -= outcome.probability;
  }
  return attack.max;
}

export function simulate(settings, seed = 29) {
  const { attackPower, armour, duration, level, strikeRank, mainHand, offHand } = settings;
  const strike = SINISTER_STRIKE_RANKS.find(({ rank }) => rank === strikeRank);
  if (!strike || strike.level > level) {
    throw new RangeError("Select a Sinister Strike rank available at your level.");
  }
  const normalizedSpeed = mainHand.type === "dagger" ? 1.7 : 2.4;
  const apDps = attackPower / 14;
  const armourReduction = Math.min(0.75, armour / (armour + 400 + 85 * level));
  const damageAfterArmour = 1 - armourReduction;
  const swingTable = attackTable(settings, true);
  const strikeTable = attackTable(settings, false);

  const attacks = [
    {
      name: "Main-hand swings",
      range: rawRange(mainHand, apDps * mainHand.speed),
      attempts: Math.floor(duration / mainHand.speed + 1e-9),
      outcomes: swingTable,
    },
    {
      name: "Off-hand swings",
      range: rawRange(offHand, apDps * offHand.speed, 0, 0.5),
      attempts: Math.floor(duration / offHand.speed + 1e-9),
      outcomes: swingTable,
    },
    {
      name: `Sinister Strike ${strike.rank}`,
      range: rawRange(mainHand, apDps * normalizedSpeed,
        strike.bonusDamage, SINISTER_STRIKE.aggressionMultiplier),
      attempts: countStrikes(duration),
      outcomes: strikeTable,
    },
  ].map(({ name, range: [min, max], attempts, outcomes }) => {
    const averageMultiplier = outcomes.reduce(
      (sum, outcome) => sum + outcome.probability * outcome.multiplier, 0
    );
    const expectedDps = (min + max) / 2 * averageMultiplier * attempts * damageAfterArmour / duration;
    return { name, min, max, attempts, outcomes, expectedDps };
  });

  // Repeatable trials let changes to stats be compared without a different random seed.
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const trialDps = [];
  for (let trial = 0; trial < TRIALS; trial++) {
    let damage = 0;
    for (const attack of attacks) {
      for (let attempt = 0; attempt < attack.attempts; attempt++) {
        damage += rollDamage(attack, random);
      }
    }
    trialDps.push(damage * damageAfterArmour / duration);
  }
  trialDps.sort((a, b) => a - b);
  return {
    attacks,
    armourReduction,
    expectedDps: attacks.reduce((sum, attack) => sum + attack.expectedDps, 0),
    lowDps: trialDps[Math.floor(TRIALS * 0.05)],
    highDps: trialDps[Math.ceil(TRIALS * 0.95) - 1],
    trials: TRIALS,
  };
}
