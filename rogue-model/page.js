import { isSwordOrAxe, simulate, SINISTER_STRIKE_RANKS } from "./simulator.js?v=5";

const form = document.getElementById("sim-settings");
const fields = form.elements;
const results = document.getElementById("sim-results");
const breakdown = document.getElementById("sim-breakdown");
const formatDamage = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });
const formatDps = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function syncRanks() {
  if (!fields.level.validity.valid) return;
  const level = fields.level.valueAsNumber;
  const selected = fields.strikeRank.selectedOptions[0];
  for (const [index, option] of Array.from(fields.strikeRank.options).entries()) {
    option.disabled = SINISTER_STRIKE_RANKS[index].level > level;
  }
  if (!selected || selected.disabled) {
    fields.strikeRank.value = SINISTER_STRIKE_RANKS.findLast((rank) => rank.level <= level).rank;
  }
}

function validateDamageRanges() {
  for (const hand of ["mainHand", "offHand"]) {
    const min = fields.namedItem(`${hand}Min`);
    const max = fields.namedItem(`${hand}Max`);
    max.setCustomValidity(
      max.valueAsNumber < min.valueAsNumber ? "Maximum damage must be at least the minimum damage." : ""
    );
  }
}

function showOption(field, visible) {
  field.disabled = !visible;
  field.closest("label").hidden = !visible;
}

function syncHackAndSlash() {
  const active = fields.hackAndSlash.checked;
  const mainHasMace = fields.mainHandType.value === "mace";
  const offType = fields.offHandType.value;
  const offMaceOption = active && !mainHasMace && offType === "mace";
  showOption(fields.offHandExtraAttacks, active && isSwordOrAxe(offType));
  showOption(fields.offHandMaceArmour, offMaceOption);
  showOption(fields.maceArmourIgnored, active && (mainHasMace || (offMaceOption && fields.offHandMaceArmour.checked)));
}

function readWeapon(hand) {
  return {
    type: fields.namedItem(`${hand}Type`).value,
    minDamage: fields.namedItem(`${hand}Min`).valueAsNumber,
    maxDamage: fields.namedItem(`${hand}Max`).valueAsNumber,
    speed: fields.namedItem(`${hand}Speed`).valueAsNumber,
  };
}

function render() {
  const settings = {
    level: fields.level.valueAsNumber,
    strikeRank: fields.strikeRank.value,
    attackPower: fields.attackPower.valueAsNumber,
    crit: fields.crit.valueAsNumber,
    hit: fields.hit.valueAsNumber,
    expertise: fields.expertise.valueAsNumber,
    armour: fields.armour.valueAsNumber,
    position: fields.position.value,
    duration: fields.duration.valueAsNumber,
    mainHand: readWeapon("mainHand"),
    offHand: readWeapon("offHand"),
    hackAndSlash: fields.hackAndSlash.checked,
    offHandExtraAttacks: !fields.offHandExtraAttacks.disabled && fields.offHandExtraAttacks.checked,
    offHandMaceArmour: !fields.offHandMaceArmour.disabled && fields.offHandMaceArmour.checked,
    maceArmourIgnored: fields.maceArmourIgnored.disabled ? 0 : fields.maceArmourIgnored.valueAsNumber,
    offHandDamagePercent: fields.offHandDamagePercent.valueAsNumber,
  };
  const result = simulate(settings);
  document.getElementById("sim-summary").textContent = `${formatDps.format(result.expectedDps)} expected DPS`;
  document.getElementById("sim-range").textContent =
    `${formatDps.format(result.lowDps)}–${formatDps.format(result.highDps)} DPS across the middle 90% of ${result.trials.toLocaleString()} simulated fights`;
  const position = settings.position === "front" ? "in front" : "from behind";
  const reduction = formatDamage.format(100 * result.armourReduction);
  const effectiveArmour = result.effectiveArmour < settings.armour
    ? ` · ${formatDamage.format(result.effectiveArmour)} effective armour`
    : "";
  document.getElementById("sim-scenario").textContent =
    `Level ${settings.level} target · ${settings.duration}s · ${position} · ${reduction}% damage reduction from armour${effectiveArmour}`;
  const rows = result.attacks.map(({ name, min, max, attempts, expectedDps }) => {
    const row = document.createElement("tr");
    const heading = document.createElement("th");
    heading.scope = "row";
    heading.textContent = name;
    row.append(heading);
    row.insertCell().textContent = `${formatDamage.format(min)}–${formatDamage.format(max)}`;
    row.insertCell().textContent = formatDamage.format(attempts);
    row.insertCell().textContent = formatDps.format(expectedDps);
    return row;
  });
  breakdown.replaceChildren(...rows);
  results.hidden = false;
}

async function loadPreset() {
  const response = await fetch(new URL("./character.json", import.meta.url), { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load Rogue preset (HTTP ${response.status})`);
  const character = await response.json();
  const defaults = {
    attackPower: character.attack_power,
    crit: character.melee_critical_strike_percent,
    hit: character.melee_hit_bonus_percent,
    expertise: character.expertise_avoidance_reduction_percentage_points,
    mainHandMin: character.main_hand.base_damage_min,
    mainHandMax: character.main_hand.base_damage_max,
    mainHandSpeed: character.main_hand.speed_seconds,
    offHandMin: character.off_hand.base_damage_min,
    offHandMax: character.off_hand.base_damage_max,
    offHandSpeed: character.off_hand.speed_seconds,
  };
  for (const [name, value] of Object.entries(defaults)) {
    const field = form.elements.namedItem(name);
    field.defaultValue = value;
    field.value = value;
  }
  const weaponTypes = {
    one_handed_axe: "axe", dagger: "dagger", fist_weapon: "fist",
    one_handed_mace: "mace", one_handed_sword: "sword",
  };
  for (const [field, weapon] of [
    [fields.mainHandType, character.main_hand], [fields.offHandType, character.off_hand],
  ]) {
    const type = weaponTypes[weapon.type] ?? "oneHand";
    for (const option of field.options) option.defaultSelected = option.value === type;
    field.value = type;
  }
  syncHackAndSlash();

  const defaultRank = SINISTER_STRIKE_RANKS.findLast(({ level }) => level <= Number(fields.level.defaultValue));
  for (const { rank, level, bonusDamage } of SINISTER_STRIKE_RANKS) {
    const selected = rank === defaultRank.rank;
    fields.strikeRank.add(new Option(`${rank} · +${bonusDamage} (Lv ${level})`, rank, selected, selected));
  }
  syncRanks();
  document.getElementById("sim-preset-note").textContent =
    `The sample weapons and sheet stats come from your saved level ${character.level} build. Replace them with your current gear and stats.`;
  form.addEventListener("input", validateDamageRanges);
  fields.level.addEventListener("input", syncRanks);
  for (const field of [fields.mainHandType, fields.offHandType, fields.hackAndSlash, fields.offHandMaceArmour]) {
    field.addEventListener("change", syncHackAndSlash);
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    syncRanks();
    validateDamageRanges();
    if (form.reportValidity()) render();
  });
  form.addEventListener("reset", () => {
    // The browser applies form defaults after the reset event.
    requestAnimationFrame(() => {
      syncRanks();
      syncHackAndSlash();
      validateDamageRanges();
      render();
    });
  });
  render();
  form.hidden = false;
}

loadPreset().catch((error) => {
  document.getElementById("sim-error").hidden = false;
  console.error(error);
});
