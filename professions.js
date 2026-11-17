(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const panel = $('#profession-panel');
const state = { data: null, pending: null, active: false, version: 0, view: 'fish', itemId: '' };
const waterLabels = { freshwater: 'Freshwater', ocean: 'Ocean' };
const waterLabel = fish => typeof fish.catchType === 'string' && fish.catchType.trim() ? fish.catchType.trim() : typeof fish.waterType === 'string' && Object.hasOwn(waterLabels, fish.waterType) ? waterLabels[fish.waterType] : 'Unverified';

async function load() {
  if (state.data) return state.data;
  if (!state.pending) state.pending = (async () => {
    const response = await fetch('./data/professions/fishing.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Fishing data unavailable');
    const data = await response.json();
    const skill = value => value === null || (Number.isInteger(value) && value >= 1);
    if (data?.profession !== 'Fishing' || !Array.isArray(data.fish) || !data.fish.every(fish => fish &&
      ['id', 'itemId', 'name', 'location'].every(key => typeof fish[key] === 'string') && /^\d+$/.test(fish.itemId) &&
      skill(fish.minFishing) && skill(fish.noFailFishing) &&
      (fish.minFishing === null || fish.noFailFishing === null || fish.noFailFishing >= fish.minFishing)) ||
      new Set(data.fish.map(fish => fish.id)).size !== data.fish.length) throw new Error('Invalid Fishing data');
    // Source/evidence metadata is optional and must never block valid table rows.
    state.data = data;
    return data;
  })().finally(() => { state.pending = null; });
  return state.pending;
}

function cell(text, className, label) {
  const node = document.createElement('td');
  node.textContent = text;
  if (className) node.className = className;
  if (label) node.dataset.label = label;
  return node;
}

function markUnverified(node) {
  const label = document.createElement('span');
  label.className = 'fish-unverified'; label.textContent = '(Unverified)';
  node.append(' ', label);
}

function fishRow(entry, locationText = entry.location, unverified = entry.verification === 'unverified') {
  const row = document.createElement('tr');
  row.dataset.fishId = entry.id;
  const name = cell('', 'fish-name');
  const link = document.createElement('a');
  link.textContent = entry.name;
  link.href = `https://www.wowhead.com/forever/item=${entry.itemId}`;
  link.target = '_blank'; link.rel = 'noopener noreferrer';
  name.append(link);
  if (globalThis.CookingGuide?.hasRecipesFor(entry.itemId)) {
    const recipes = document.createElement('a');
    recipes.href = `#${new URLSearchParams({ profession: 'Cooking', item: entry.itemId })}`;
    recipes.className = 'fish-cooking-link'; recipes.textContent = 'Cooking';
    recipes.title = 'Show recipes using this fish'; name.append(' ', recipes);
  }
  const location = cell(locationText, 'fish-location', state.view === 'area' ? 'Where in area' : 'Where to catch');
  if (unverified) markUnverified(location);
  const water = cell(waterLabel(entry), 'fish-water', 'Water / catch type');
  if (typeof entry.waterDetail === 'string' && entry.waterDetail.trim()) {
    const detail = document.createElement('span');
    detail.className = 'fish-detail'; detail.textContent = entry.waterDetail;
    water.append(detail);
  }
  const minimum = cell(entry.minFishing === null ? 'Unverified' : String(entry.minFishing), 'fish-skill', 'Min. Fishing');
  const noFail = cell(entry.noFailFishing === null ? 'Unverified' : `${entry.noFailApproximate === true ? '~' : ''}${entry.noFailFishing}`, 'fish-skill', 'No-fail Fishing');
  row.append(name, location, water, minimum, noFail);
  return row;
}

function locations(fish) {
  const list = Array.isArray(fish.locations) ? fish.locations.filter(location => location && typeof location.area === 'string' && location.area.trim()) : [];
  // Older data can still render without guessing area boundaries from prose.
  return list.length ? list : [{ area: fish.location, detail: '' }];
}

function matches(fish, location, query) {
  if (state.itemId && fish.itemId !== state.itemId) return false;
  return !query || [fish.name, fish.itemId, location, waterLabel(fish), typeof fish.waterDetail === 'string' ? fish.waterDetail : '', fish.verification === 'unverified' ? 'unverified' : ''].join(' ').toLocaleLowerCase().includes(query);
}

function areaSection(area, catches) {
  const section = document.createElement('section');
  section.className = 'fishing-area'; section.dataset.area = area;
  section.setAttribute('aria-label', area);
  const heading = document.createElement('h2');
  heading.className = 'fishing-area-name'; heading.textContent = area;
  const unverified = catches.every(({ fish }) => fish.verification === 'unverified');
  if (unverified) markUnverified(heading);
  const wrap = document.createElement('div'); wrap.className = 'table-wrap';
  const table = document.createElement('table'); table.className = 'fishing-table';
  const caption = document.createElement('caption'); caption.className = 'sr-only';
  caption.textContent = `Fish listed for ${area}`;
  const cols = document.createElement('colgroup');
  for (const className of ['col-fish', 'col-fish-location', 'col-fish-water', 'col-fish-skill', 'col-fish-skill']) {
    const col = document.createElement('col'); col.className = className; cols.append(col);
  }
  const head = document.createElement('thead'), labels = document.createElement('tr');
  for (const label of ['Fish', 'Where in area', 'Water / catch type', 'Min. Fishing', 'No-fail Fishing']) {
    const th = document.createElement('th'); th.scope = 'col'; th.textContent = label; labels.append(th);
  }
  head.append(labels);
  const body = document.createElement('tbody');
  catches.sort((a, b) => a.fish.name.localeCompare(b.fish.name));
  for (const { fish, location } of catches) {
    body.append(fishRow(fish, typeof location.detail === 'string' && location.detail.trim() ? location.detail : '—', !unverified && fish.verification === 'unverified'));
  }
  table.append(caption, cols, head, body); wrap.append(table); section.append(heading, wrap);
  return section;
}

function render() {
  if (!state.active || panel.hidden) return;
  for (const button of document.querySelectorAll('[data-fishing-view]')) button.setAttribute('aria-pressed', String(button.dataset.fishingView === state.view));
  $('#fishing-by-fish').hidden = state.view !== 'fish';
  $('#fishing-areas').hidden = state.view !== 'area';
  if (!state.data) return;
  const query = $('#fishing-search').value.trim().toLocaleLowerCase();
  const fragment = document.createDocumentFragment();
  if (state.view === 'fish') {
    const fish = state.data.fish.filter(fish => matches(fish, [fish.location, ...locations(fish).map(location => [location.area, typeof location.detail === 'string' ? location.detail : ''].join(' '))].join(' '), query));
    fragment.append(...fish.map(entry => fishRow(entry)));
    $('#fishing-rows').replaceChildren(fragment);
    $('#fishing-empty').hidden = fish.length > 0;
    $('#fishing-result-count').textContent = `${new Set(fish.map(entry => entry.itemId)).size} fish · ${fish.length} of ${state.data.fish.length} catch groups`;
    return;
  }
  const areas = new Map();
  for (const fish of state.data.fish) {
    for (const location of locations(fish)) {
      const area = location.area.trim();
      if (!matches(fish, [area, typeof location.detail === 'string' ? location.detail : ''].join(' '), query)) continue;
      if (!areas.has(area)) areas.set(area, []);
      areas.get(area).push({ fish, location });
    }
  }
  for (const [area, catches] of [...areas].sort(([a], [b]) => a.localeCompare(b))) fragment.append(areaSection(area, catches));
  $('#fishing-areas').replaceChildren(fragment);
  $('#fishing-empty').hidden = areas.size > 0;
  const count = [...areas.values()].reduce((count, catches) => count + catches.length, 0);
  $('#fishing-result-count').textContent = `${count} catch references in ${areas.size} ${areas.size === 1 ? 'area' : 'areas'}`;
}

async function show(profession) {
  if (profession !== 'Fishing') return;
  state.active = true; panel.hidden = false;
  const version = ++state.version;
  globalThis.CookingGuide?.prepareLinks().then(() => {
    if (state.active && version === state.version) render();
  }).catch(() => {});
  $('#profession-error').hidden = true;
  $('#fishing-empty').hidden = true;
  $('#fishing-result-count').textContent = 'Loading Fishing…';
  try {
    await load();
    if (state.active && version === state.version && !panel.hidden) {
      if (state.itemId) $('#fishing-search').value = state.data.fish.find(fish => fish.itemId === state.itemId)?.name || state.itemId;
      render();
    }
  } catch {
    if (!state.active || version !== state.version || panel.hidden) return;
    $('#profession-error').hidden = false;
    $('#fishing-rows').replaceChildren();
    $('#fishing-areas').replaceChildren();
    $('#fishing-result-count').textContent = 'Fishing unavailable';
  }
}

$('#fishing-search').addEventListener('input', () => { state.itemId = ''; render(); });
$('#fishing-views').addEventListener('click', event => {
  const button = event.target.closest('button[data-fishing-view]');
  if (!button || !['fish', 'area'].includes(button.dataset.fishingView)) return;
  state.view = button.dataset.fishingView;
  render();
});
$('#profession-retry').addEventListener('click', () => { state.data = null; show('Fishing'); });
globalThis.ProfessionGuide = Object.freeze({
  hasProfession: profession => ['Fishing', 'Cooking'].includes(profession),
  show: profession => {
    if (profession === 'Cooking') {
      state.active = false; ++state.version; panel.hidden = true;
      globalThis.CookingGuide.show();
    } else {
      globalThis.CookingGuide.hide(); show('Fishing');
    }
  },
  hide: () => { state.active = false; ++state.version; panel.hidden = true; globalThis.CookingGuide.hide(); },
  prepareFishingLinks: load,
  hasFishingItem: itemId => Boolean(state.data?.fish.some(fish => fish.itemId === itemId)),
  filterItem: (profession, itemId) => {
    if (!/^\d+$/.test(itemId || '')) return;
    if (profession === 'Cooking') return globalThis.CookingGuide.filterItem(itemId);
    state.itemId = itemId; state.view = 'fish';
    $('#fishing-search').value = state.data?.fish.find(fish => fish.itemId === itemId)?.name || itemId;
  },
});
})();
