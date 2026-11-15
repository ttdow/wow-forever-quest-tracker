(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const panel = $('#profession-panel');
const state = { data: null, pending: null, active: false, version: 0 };

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

function render() {
  if (!state.active || panel.hidden || !state.data) return;
  const query = $('#fishing-search').value.trim().toLocaleLowerCase();
  const fish = state.data.fish.filter(fish => !query || [fish.name, fish.location, fish.itemId].join(' ').toLocaleLowerCase().includes(query));
  const fragment = document.createDocumentFragment();
  for (const entry of fish) {
    const row = document.createElement('tr');
    row.dataset.fishId = entry.id;
    const name = cell('', 'fish-name');
    const link = document.createElement('a');
    link.textContent = entry.name;
    link.href = `https://www.wowhead.com/forever/item=${entry.itemId}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    name.append(link);
    const location = cell(entry.location, 'fish-location', 'Where to catch');
    if (entry.verification === 'unverified') {
      const label = document.createElement('span');
      label.className = 'fish-unverified'; label.textContent = 'Unverified';
      location.append(label);
    }
    const minimum = cell(entry.minFishing === null ? 'Unverified' : String(entry.minFishing), 'fish-skill', 'Min. Fishing');
    const noFail = cell(entry.noFailFishing === null ? 'Unverified' : `${entry.noFailApproximate === true ? '~' : ''}${entry.noFailFishing}`, 'fish-skill', 'No-fail Fishing');
    row.append(name, location, minimum, noFail);
    fragment.append(row);
  }
  $('#fishing-rows').replaceChildren(fragment);
  $('#fishing-empty').hidden = fish.length > 0;
  $('#fishing-result-count').textContent = `${fish.length} of ${state.data.fish.length} entries`;
}

async function show(profession) {
  if (profession !== 'Fishing') return;
  state.active = true; panel.hidden = false;
  const version = ++state.version;
  $('#profession-error').hidden = true;
  $('#fishing-empty').hidden = true;
  $('#fishing-result-count').textContent = 'Loading Fishing…';
  try {
    await load();
    if (state.active && version === state.version && !panel.hidden) render();
  } catch {
    if (!state.active || version !== state.version || panel.hidden) return;
    $('#profession-error').hidden = false;
    $('#fishing-rows').replaceChildren();
    $('#fishing-result-count').textContent = 'Fishing unavailable';
  }
}

$('#fishing-search').addEventListener('input', render);
$('#profession-retry').addEventListener('click', () => { state.data = null; show('Fishing'); });
globalThis.ProfessionGuide = Object.freeze({
  hasProfession: profession => profession === 'Fishing', show,
  hide: () => { state.active = false; ++state.version; panel.hidden = true; },
});
})();
