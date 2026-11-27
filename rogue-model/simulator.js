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
  avoidedCost: 8,
  globalCooldown: 1,
  aggressionMultiplier: 1.15,
};
const ENERGY_CAP = 100;
const ENERGY_PER_SECOND = 10;
const TRIALS = 1000;
const HACK_AND_SLASH_CRIT_BONUS = 5;
const HACK_AND_SLASH_PROC_CHANCE = 0.05;

export function isSwordOrAxe(type) {
  return type === "sword" || type === "axe";
}

function weaponCritBonus(type) {
  return type === "dagger" || type === "fist" ? HACK_AND_SLASH_CRIT_BONUS : 0;
}

function hackAndSlashEffects({
  mainHand, offHand, hackAndSlash = true, offHandExtraAttacks = false,
  offHandMaceArmour = false, maceArmourIgnored = 15,
}) {
  return {
    mainCrit: hackAndSlash ? weaponCritBonus(mainHand.type) : 0,
    offCrit: hackAndSlash ? weaponCritBonus(offHand.type) : 0,
    mainProc: hackAndSlash && isSwordOrAxe(mainHand.type) ? HACK_AND_SLASH_PROC_CHANCE : 0,
    offProc: hackAndSlash && offHandExtraAttacks && isSwordOrAxe(offHand.type)
      ? HACK_AND_SLASH_PROC_CHANCE : 0,
    armourIgnored: hackAndSlash && (mainHand.type === "mace" || (offHandMaceArmour && offHand.type === "mace"))
      ? maceArmourIgnored : 0,
  };
}

function nextStrike(energy, avoided) {
  const remaining = energy - (avoided ? SINISTER_STRIKE.avoidedCost : SINISTER_STRIKE.energyCost);
  // One time step is the time needed to regenerate one Energy.
  const delay = Math.max(
    SINISTER_STRIKE.globalCooldown * ENERGY_PER_SECOND,
    SINISTER_STRIKE.energyCost - remaining
  );
  return { delay, energy: Math.min(ENERGY_CAP, remaining + delay) };
}

function expectedStrikes(end, avoidChance) {
  // Each state is a possible next cast time and its Energy before the cast.
  const scheduled = Array.from({ length: end + 1 }, () => new Map());
  scheduled[0].set(ENERGY_CAP, 1);
  const outcomes = [[false, 1 - avoidChance], [true, avoidChance]];
  let expected = 0;

  for (const [time, states] of scheduled.entries()) {
    for (const [energy, probability] of states) {
      expected += probability;
      for (const [avoided, chance] of outcomes) {
        if (chance === 0) continue;
        const next = nextStrike(energy, avoided);
        const destination = scheduled[time + next.delay];
        if (!destination) continue;
        destination.set(next.energy, (destination.get(next.energy) ?? 0) + probability * chance);
      }
    }
  }
  return expected;
}

function attackTable({ hit, crit, expertise, position }, isSwing, critBonus = 0) {
  // Equal-level NPC estimates with both weapon skills capped.
  const miss = Math.max(0, (isSwing ? 24 : 5) - hit);
  const dodge = Math.max(0, 5 - expertise);
  const parry = position === "front" ? Math.max(0, 5 - expertise) : 0;
  const glance = isSwing ? 10 : 0;
  const avoid = miss + dodge + parry;
  const critical = Math.min(crit + critBonus, 100 - avoid - glance);
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

function rollOutcome(outcomes, roll) {
  for (const outcome of outcomes) {
    if (roll < outcome.probability) return outcome;
    roll -= outcome.probability;
  }
  return outcomes.at(-1);
}

function rollDamage(attack, random, extraSwing) {
  const outcome = rollOutcome(attack.outcomes, random());
  const damage = (attack.min + random() * (attack.max - attack.min)) * outcome.multiplier;
  if (extraSwing && attack.procChance && outcome.multiplier > 0 && random() < attack.procChance) {
    return damage + rollDamage(extraSwing, random);
  }
  return damage;
}

export function simulate(settings, seed = 29) {
  const {
    attackPower, armour, duration, level, strikeRank, mainHand, offHand,
    offHandDamagePercent = 50,
  } = settings;
  const strike = SINISTER_STRIKE_RANKS.find(({ rank }) => rank === strikeRank);
  if (!strike || strike.level > level) {
    throw new RangeError("Select a Sinister Strike rank available at your level.");
  }
  const normalizedSpeed = mainHand.type === "dagger" ? 1.7 : 2.4;
  const apDps = attackPower / 14;
  const effects = hackAndSlashEffects(settings);
  const effectiveArmour = armour * (1 - effects.armourIgnored / 100);
  const armourReduction = Math.min(0.75, effectiveArmour / (effectiveArmour + 400 + 85 * level));
  const damageAfterArmour = 1 - armourReduction;
  const mainSwingTable = attackTable(settings, true, effects.mainCrit);
  const offSwingTable = attackTable(settings, true, effects.offCrit);
  const strikeTable = attackTable(settings, false, effects.mainCrit);
  const fightEnd = Math.floor(duration * ENERGY_PER_SECOND + 1e-9);

  const mainSwing = {
    name: "Main-hand swings",
    range: rawRange(mainHand, apDps * mainHand.speed),
    attempts: Math.floor(duration / mainHand.speed + 1e-9),
    outcomes: mainSwingTable,
    procChance: effects.mainProc,
  };
  const offSwing = {
    name: "Off-hand swings",
    range: rawRange(offHand, apDps * offHand.speed, 0, offHandDamagePercent / 100),
    attempts: Math.floor(duration / offHand.speed + 1e-9),
    outcomes: offSwingTable,
    procChance: effects.offProc,
  };
  const sinisterStrike = {
    name: `Sinister Strike ${strike.rank}`,
    range: rawRange(mainHand, apDps * normalizedSpeed,
      strike.bonusDamage, SINISTER_STRIKE.aggressionMultiplier),
    attempts: expectedStrikes(fightEnd, strikeTable[0].probability),
    outcomes: strikeTable,
    procChance: effects.mainProc,
  };
  const sources = [mainSwing, offSwing, sinisterStrike];
  const extraAttempts = sources.reduce(
    (sum, attack) => sum + attack.attempts * (1 - attack.outcomes[0].probability) * attack.procChance,
    0
  );
  if (extraAttempts > 0) {
    sources.push({ ...mainSwing, name: "Hack and Slash extra swings", attempts: extraAttempts, procChance: 0 });
  }
  const attacks = sources.map(({ name, range: [min, max], attempts, outcomes, procChance }) => {
    const averageMultiplier = outcomes.reduce(
      (sum, outcome) => sum + outcome.probability * outcome.multiplier, 0
    );
    const expectedDps = (min + max) / 2 * averageMultiplier * attempts * damageAfterArmour / duration;
    return { name, min, max, attempts, outcomes, procChance, expectedDps };
  });

  // Repeatable trials let changes to stats be compared without a different random seed.
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const [mainAttack, offAttack, strikeAttack, extraSwing] = attacks;
  const swingAttacks = [mainAttack, offAttack];
  const trialDps = [];
  for (let trial = 0; trial < TRIALS; trial++) {
    let damage = 0;
    for (const attack of swingAttacks) {
      for (let attempt = 0; attempt < attack.attempts; attempt++) {
        damage += rollDamage(attack, random, extraSwing);
      }
    }
    let time = 0;
    let energy = ENERGY_CAP;
    while (time <= fightEnd) {
      const dealt = rollDamage(strikeAttack, random, extraSwing);
      damage += dealt;
      // Sinister Strike has positive base damage, so zero means it was avoided.
      const next = nextStrike(energy, dealt === 0);
      time += next.delay;
      energy = next.energy;
    }
    trialDps.push(damage * damageAfterArmour / duration);
  }
  trialDps.sort((a, b) => a - b);
  return {
    attacks,
    effectiveArmour,
    armourReduction,
    expectedDps: attacks.reduce((sum, attack) => sum + attack.expectedDps, 0),
    lowDps: trialDps[Math.floor(TRIALS * 0.05)],
    highDps: trialDps[Math.ceil(TRIALS * 0.95) - 1],
    trials: TRIALS,
  };
}
