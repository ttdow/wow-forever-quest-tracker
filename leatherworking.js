(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const panel = $('#leatherworking-panel');
const search = $('#leatherworking-search');
const collectionFilter = $('#leatherworking-collection');
const skillFilter = $('#leatherworking-skill');
const rangeMin = $('#leatherworking-range-min');
const rangeMax = $('#leatherworking-range-max');
const rangeError = $('#leatherworking-range-error');
const sourceFilter = $('#leatherworking-source');
const rows = $('#leatherworking-rows');
const count = $('#leatherworking-result-count');
const empty = $('#leatherworking-empty');
const error = $('#leatherworking-error');
const saveError = $('#leatherworking-save-error');
const progress = globalThis.LeatherworkingProgress;
const colors = ['Orange', 'Yellow', 'Green', 'Grey'];
const bindingLabels = new Map([
  ['boe', ['BoE', 'Binds when equipped']],
  ['bop', ['BoP', 'Binds when picked up']],
  ['unbound', ['Unbound', 'Unbound']],
]);
const sourceLabels = {
  automatic: 'Learned with Apprentice Leatherworking',
  trainer: 'Trainer',
  vendor: 'Vendor',
  drop: 'Drop',
  quest: 'Quest',
  unknown: 'Source unverified',
};
let entries;
let pending;
let version = 0;
let knownRecipes = new Set();
let progressReady = false;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function cell(label, className) {
  const node = element('td', className);
  node.dataset.label = label;
  return node;
}

function reference(text, path) {
  const link = element('a', '', text);
  link.href = new URL(path, 'https://foreverdb.net/');
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function detail(text) {
  return element('span', 'leatherworking-detail', text);
}

function sourceList(sources) {
  const list = element('ul');
  for (const source of sources) {
    const line = element('li');
    const label = sourceLabels[source.type];
    const text = source.name ? `${label} · ${source.name}` : label;
    line.append(source.path ? reference(text, source.path) : text);
    if (source.location) line.append(` · ${source.location}`);
    if (source.evidence === 'classic') line.append(' (Classic reference)');
    if (source.evidence === 'community') line.append(' (Community reference)');
    if (source.requirements) line.append(detail(source.requirements));
    list.append(line);
  }
  return list;
}

function appendSources(container, sources) {
  if (!sources.length) return;
  container.append(sourceList(sources.slice(0, 2)));
  if (sources.length > 2) {
    const more = element('details');
    const remaining = sources.length - 2;
    more.append(element('summary', '', `${remaining} more ${remaining === 1 ? 'source' : 'sources'}`),
      sourceList(sources.slice(2)));
    container.append(more);
  }
}

function recipeRow(recipe) {
  const row = element('tr');
  const id = String(recipe.spellId);
  row.dataset.recipeId = id;
  const name = cell('Recipe', 'leatherworking-name');
  const heading = element('div', 'leatherworking-recipe');
  const known = element('label', 'leatherworking-known');
  const checkbox = element('input');
  checkbox.type = 'checkbox';
  checkbox.dataset.knownRecipe = id;
  known.append(checkbox, element('span', 'sr-only', `Known recipe: ${recipe.name}`));
  const description = element('div');
  const recipeLink = reference(recipe.name, `spell/${recipe.spellId}`);
  recipeLink.className = 'leatherworking-recipe-name';
  description.append(recipeLink);
  if (recipe.yield > 1) description.append(` ×${recipe.yield}`);
  const binding = bindingLabels.get(recipe.binding);
  if (binding) {
    const link = reference(binding[0], `item/${recipe.itemId}`);
    link.className = 'leatherworking-detail';
    link.title = binding[1];
    link.setAttribute('aria-label', `Crafted item: ${recipe.name}, ${binding[1]}`);
    description.append(link);
  } else {
    description.append(detail('Binding unverified'));
  }
  if (recipe.station) description.append(detail(`Requires ${recipe.station}`));
  if (recipe.availability) description.append(detail(recipe.availability));
  heading.append(known, description);
  name.append(heading);

  const ingredients = cell('Ingredients per craft');
  const materials = element('ul');
  for (const ingredient of recipe.ingredients) {
    const line = element('li');
    line.append(`${ingredient.quantity} × `, reference(ingredient.name, `item/${ingredient.itemId}`));
    materials.append(line);
  }
  ingredients.append(materials);

  const skill = cell('Skill colors');
  const thresholds = element('dl', 'leatherworking-colors');
  for (const label of colors) {
    const color = label.toLowerCase();
    const pair = element('div', `leatherworking-${color}`);
    const skipsOrange = color === 'orange' && recipe.skill.learn !== null &&
      recipe.skill.yellow !== null && recipe.skill.learn >= recipe.skill.yellow;
    const value = element('dd', '', skipsOrange ? 'None' : recipe.skill[color] ?? '—');
    if (!skipsOrange && recipe.skill[color] === null) value.setAttribute('aria-label', 'Unknown');
    pair.append(element('dt', '', label), value);
    thresholds.append(pair);
  }
  skill.append(thresholds);
  const classicSkill = recipe.skill.orangeSource === 'classic';
  if (recipe.skill.learn !== recipe.skill.orange) {
    skill.append(detail(`Learn at ${recipe.skill.learn}${classicSkill ? ' (Classic reference)' : ''}`));
  } else if (classicSkill) {
    skill.append(detail('Learning skill uses a Classic trainer reference'));
  }

  const acquisition = cell('Learn from');
  for (const pattern of recipe.patterns) {
    const line = element('div', 'leatherworking-pattern');
    line.append(reference(pattern.name, `item/${pattern.itemId}`));
    if (recipe.patterns.length > 1) {
      appendSources(line, recipe.sources.filter(source => source.patternId === pattern.itemId));
    }
    acquisition.append(line);
  }
  appendSources(acquisition, recipe.patterns.length > 1 ? recipe.sources.filter(source => !source.patternId) : recipe.sources);
  row.append(name, ingredients, skill, acquisition);
  return { row, checkbox };
}

async function load() {
  if (entries) return;
  if (!pending) pending = (async () => {
    const response = await fetch('./data/professions/leatherworking.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Leatherworking unavailable');
    const data = await response.json();
    if (data?.profession !== 'Leatherworking' || !Array.isArray(data.recipes) || !data.recipes.length) {
      throw new Error('Invalid Leatherworking data');
    }
    const recipes = data.recipes.map(recipe => ({
      recipe,
      ...recipeRow(recipe),
      terms: [
        recipe.name, recipe.spellId, recipe.itemId, recipe.station, recipe.availability,
        ...(bindingLabels.get(recipe.binding) ?? ['binding unverified']),
        ...recipe.ingredients.flatMap(item => [item.name, item.itemId]),
        ...recipe.patterns.flatMap(item => [item.name, item.itemId]),
        ...recipe.sources.flatMap(source => [sourceLabels[source.type], source.name, source.location, source.requirements]),
      ].filter(Boolean).join(' ').toLowerCase(),
    }));
    rows.replaceChildren(...recipes.map(entry => entry.row));
    entries = recipes;
  })().finally(() => { pending = null; });
  await pending;
}

function render() {
  if (panel.hidden || !entries) return;
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const collection = progressReady ? collectionFilter.value : '';
  const currentSkill = skillFilter.valueAsNumber;
  const minLearn = rangeMin.valueAsNumber;
  const maxGrey = rangeMax.valueAsNumber;
  let rangeMessage = '';
  if (!rangeMin.validity.valid || !rangeMax.validity.valid) {
    rangeMessage = 'Enter whole skill values of 1 or higher.';
  } else if (minLearn > maxGrey) {
    rangeMessage = 'Maximum grey skill must be at least the minimum learn skill.';
  }
  rangeError.textContent = rangeMessage;
  rangeError.hidden = !rangeMessage;
  const source = sourceFilter.value;
  let matches = 0;
  let knownCount = 0;
  for (const entry of entries) {
    const { recipe, row, checkbox } = entry;
    const known = knownRecipes.has(checkbox.dataset.knownRecipe);
    const { learn, grey } = recipe.skill;
    const show = !rangeMessage &&
      (!Number.isFinite(currentSkill) || (learn !== null && learn <= currentSkill)) &&
      (!Number.isFinite(minLearn) || (learn !== null && learn >= minLearn)) &&
      (!Number.isFinite(maxGrey) || (grey !== null && grey <= maxGrey)) &&
      (!source || recipe.sources.some(location => location.type === source)) &&
      (!collection || known === (collection === 'known')) &&
      terms.every(term => entry.terms.includes(term));
    row.hidden = !show;
    checkbox.checked = known;
    checkbox.disabled = !progressReady;
    if (show) matches++;
    if (known) knownCount++;
  }
  const totals = progressReady ? ` · ${knownCount} known · ${entries.length - knownCount} needed` : '';
  count.textContent = `${matches} of ${entries.length} recipes${totals}`;
  empty.hidden = matches > 0 || Boolean(rangeMessage);
}

function readProgress() {
  try {
    knownRecipes = progress.load();
    progressReady = true;
    saveError.hidden = true;
  } catch {
    progressReady = false;
    saveError.textContent = 'Could not read saved recipes. Allow browser storage for this site and reload to try again.';
    saveError.hidden = false;
  }
  collectionFilter.disabled = !progressReady;
}

rows.addEventListener('change', event => {
  const checkbox = event.target.closest('input[data-known-recipe]');
  if (!checkbox || !progressReady) return;
  const id = checkbox.dataset.knownRecipe;
  const hadFocus = document.activeElement === checkbox;
  try {
    // Merge with progress saved by other tabs since this view was rendered.
    const next = progress.load();
    if (checkbox.checked) next.add(id); else next.delete(id);
    progress.save(next);
    knownRecipes = next;
    saveError.hidden = true;
  } catch {
    saveError.textContent = 'Could not save this recipe. Your previous status was restored.';
    saveError.hidden = false;
  }
  render();
  if (hadFocus && checkbox.closest('tr').hidden) {
    (rows.querySelector('tr:not([hidden]) input') ?? collectionFilter).focus();
  }
});

async function show() {
  const request = ++version;
  panel.hidden = false;
  error.hidden = true;
  empty.hidden = true;
  readProgress();
  if (!entries) count.textContent = 'Loading Leatherworking…';
  try {
    await load();
    if (request === version) render();
  } catch {
    if (request !== version) return;
    error.hidden = false;
    count.textContent = 'Leatherworking unavailable';
  }
}

search.addEventListener('input', render);
collectionFilter.addEventListener('change', render);
skillFilter.addEventListener('input', render);
rangeMin.addEventListener('input', render);
rangeMax.addEventListener('input', render);
sourceFilter.addEventListener('change', render);
$('#leatherworking-retry').addEventListener('click', show);
window.addEventListener('storage', event => {
  if (panel.hidden || (event.key !== progress.key && event.key !== null)) return;
  readProgress();
  render();
});
globalThis.LeatherworkingGuide = Object.freeze({
  show,
  hide: () => { ++version; panel.hidden = true; },
});
})();
