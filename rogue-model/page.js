import { simulate } from "./simulator.js?v=1";

const form = document.getElementById("sim-settings");
const results = document.getElementById("sim-results");
const breakdown = document.getElementById("sim-breakdown");
const formatDamage = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });
const formatDps = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function render(character) {
  const fields = form.elements;
  const settings = {
    attackPower: fields.attackPower.valueAsNumber,
    crit: fields.crit.valueAsNumber,
    hit: fields.hit.valueAsNumber,
    expertise: fields.expertise.valueAsNumber,
    armour: fields.armour.valueAsNumber,
    position: fields.position.value,
    duration: fields.duration.valueAsNumber,
  };
  const result = simulate(character, settings);
  document.getElementById("sim-summary").textContent = `${formatDps.format(result.expectedDps)} expected DPS`;
  document.getElementById("sim-range").textContent =
    `${formatDps.format(result.lowDps)}–${formatDps.format(result.highDps)} DPS across the middle 90% of ${result.trials.toLocaleString()} simulated fights`;
  const position = settings.position === "front" ? "in front" : "from behind";
  const reduction = formatDamage.format(100 * result.armourReduction);
  document.getElementById("sim-scenario").textContent =
    `${settings.duration}s · ${position} · ${reduction}% armour reduction`;
  const rows = result.attacks.map(({ name, min, max, attempts, expectedDps }) => {
    const row = document.createElement("tr");
    const heading = document.createElement("th");
    heading.scope = "row";
    heading.textContent = name;
    row.append(heading);
    row.insertCell().textContent = `${formatDamage.format(min)}–${formatDamage.format(max)}`;
    row.insertCell().textContent = attempts;
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
  };
  for (const [name, value] of Object.entries(defaults)) {
    const field = form.elements.namedItem(name);
    field.defaultValue = value;
    field.value = value;
  }
  document.getElementById("sim-weapons").textContent =
    `Level ${character.level} · ${character.main_hand.name} / ${character.off_hand.name}`;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render(character);
  });
  form.addEventListener("reset", () => {
    // The browser applies form defaults after the reset event.
    requestAnimationFrame(() => render(character));
  });
  render(character);
  form.hidden = false;
}

loadPreset().catch((error) => {
  document.getElementById("sim-error").hidden = false;
  console.error(error);
});
