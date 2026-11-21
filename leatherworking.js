(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const panel = $('#leatherworking-panel');
const search = $('#leatherworking-search');
const skillFilter = $('#leatherworking-skill');
const sourceFilter = $('#leatherworking-source');
const rows = $('#leatherworking-rows');
const count = $('#leatherworking-result-count');
const empty = $('#leatherworking-empty');
const error = $('#leatherworking-error');
const colors = ['Orange', 'Yellow', 'Green', 'Grey'];
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
  row.dataset.recipeId = recipe.spellId;
  const name = cell('Recipe', 'leatherworking-name');
  name.append(reference(recipe.name, `spell/${recipe.spellId}`));
  if (recipe.yield > 1) name.append(` ×${recipe.yield}`);
  if (recipe.station) name.append(detail(`Requires ${recipe.station}`));
  if (recipe.availability) name.append(detail(recipe.availability));

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
  return row;
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
      row: recipeRow(recipe),
      terms: [
        recipe.name, recipe.spellId, recipe.itemId, recipe.station, recipe.availability,
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
  const maxSkill = skillFilter.valueAsNumber;
  const source = sourceFilter.value;
  let matches = 0;
  for (const entry of entries) {
    const { recipe } = entry;
    const show = (!Number.isFinite(maxSkill) || (recipe.skill.learn !== null && recipe.skill.learn <= maxSkill)) &&
      (!source || recipe.sources.some(location => location.type === source)) &&
      terms.every(term => entry.terms.includes(term));
    entry.row.hidden = !show;
    if (show) matches++;
  }
  count.textContent = `${matches} of ${entries.length} recipes`;
  empty.hidden = matches > 0;
}

async function show() {
  const request = ++version;
  panel.hidden = false;
  error.hidden = true;
  empty.hidden = true;
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
skillFilter.addEventListener('input', render);
sourceFilter.addEventListener('change', render);
$('#leatherworking-retry').addEventListener('click', show);
globalThis.LeatherworkingGuide = Object.freeze({
  show,
  hide: () => { ++version; panel.hidden = true; },
});
})();
