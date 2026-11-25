const SINISTER_STRIKE = {
  bonusDamage: 15,
  normalizedSpeed: 2.4,
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
  return [weapon.base_damage_min, weapon.base_damage_max].map(
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

export function simulate(character, settings, seed = 29) {
  const { attackPower, armour, duration } = settings;
  const mainHand = character.main_hand;
  const offHand = character.off_hand;
  const apDps = attackPower / 14;
  const armourReduction = Math.min(0.75, armour / (armour + 400 + 85 * character.level));
  const damageAfterArmour = 1 - armourReduction;
  const swingTable = attackTable(settings, true);
  const strikeTable = attackTable(settings, false);

  const attacks = [
    {
      name: "Main-hand swings",
      range: rawRange(mainHand, apDps * mainHand.speed_seconds),
      attempts: Math.floor(duration / mainHand.speed_seconds + 1e-9),
      outcomes: swingTable,
    },
    {
      name: "Off-hand swings",
      range: rawRange(offHand, apDps * offHand.speed_seconds, 0, 0.5),
      attempts: Math.floor(duration / offHand.speed_seconds + 1e-9),
      outcomes: swingTable,
    },
    {
      name: "Sinister Strike IV",
      range: rawRange(mainHand, apDps * SINISTER_STRIKE.normalizedSpeed,
        SINISTER_STRIKE.bonusDamage, SINISTER_STRIKE.aggressionMultiplier),
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
