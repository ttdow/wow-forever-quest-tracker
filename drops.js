(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const instances = new Set(['Deadmines', 'Wailing Caverns', 'Blackfathom Deeps']);
const panel = $('#drops-panel');
const state = { zone: '', data: null, pending: null };

async function load() {
  if (state.data) return state.data;
  if (!state.pending) {
    state.pending = (async () => {
      const response = await fetch('./data/drops.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('Drops unavailable');
      const data = await response.json();
      for (const zone of instances) {
        const items = data?.instances?.[zone]?.items;
        if (!Array.isArray(items) || !items.every(item => item &&
          ['id', 'name', 'slot', 'type', 'source'].every(key => typeof item[key] === 'string') &&
          /^\d+$/.test(item.id) && Number.isInteger(item.requiredLevel) && item.requiredLevel >= 0 &&
          Number.isInteger(item.quality) && typeof item.rogueUsable === 'boolean' &&
          ['seen', 'classic'].includes(item.dropEvidence) &&
          Array.isArray(item.stats) && item.stats.every(stat => typeof stat === 'string'))) {
          throw new Error('Invalid drop data');
        }
      }
      state.data = data.instances;
      return state.data;
    })().finally(() => { state.pending = null; });
  }
  return state.pending;
}

function cell(text, className, label) {
  const element = document.createElement('td');
  element.textContent = text || '—';
  element.className = className;
  if (label) element.dataset.label = label;
  return element;
}

function render() {
  const instance = state.data?.[state.zone];
  if (!instance) return;
  const search = $('#drop-search').value.trim().toLocaleLowerCase();
  const source = $('#drop-source').value;
  const rogue = $('#drop-class').value === 'rogue';
  const visible = instance.items.filter(item =>
    (source === 'all' || item.source === source) && (!rogue || item.rogueUsable) &&
    (!search || [item.id, item.name, item.slot, item.type, item.requiredLevel, item.source, ...item.stats].join(' ').toLocaleLowerCase().includes(search)));
  const fragment = document.createDocumentFragment();
  for (const item of visible) {
    const row = document.createElement('tr');
    row.className = 'drop-row';
    row.dataset.itemId = item.id;
    const name = cell('', 'drop-item');
    name.replaceChildren();
    const link = document.createElement('a');
    link.className = 'drop-name';
    link.dataset.quality = item.quality;
    link.href = `https://foreverdb.net/item/${item.id}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = item.name;
    link.title = `Item #${item.id} · Item level ${item.itemLevel}`;
    name.append(link);
    const stats = cell('', 'drop-stats', 'Base stats / effects');
    stats.replaceChildren();
    if (item.stats.length) {
      const list = document.createElement('ul');
      for (const text of item.stats) {
        const line = document.createElement('li');
        line.textContent = text;
        list.append(line);
      }
      stats.append(list);
    } else stats.textContent = '—';
    const evidence = cell(item.dropEvidence === 'seen' ? 'Seen in Forever' : 'Classic ref.', `drop-evidence ${item.dropEvidence}`, 'Drop evidence');
    evidence.title = item.dropEvidence === 'seen'
      ? 'This drop source was recorded by players in WoW: Forever.'
      : 'Drop source from Classic; not yet recorded in WoW: Forever. Stats use the Forever client.';
    row.append(name, cell(`${item.slot} · ${item.type}`, 'drop-type', 'Slot / type'), cell(String(item.requiredLevel), 'drop-level', 'Required level'), stats, cell(item.source, 'drop-source', 'Source'), evidence);
    fragment.append(row);
  }
  $('#drops').replaceChildren(fragment);
  $('#drops-empty').hidden = visible.length > 0;
  $('#drop-result-count').textContent = `${visible.length} of ${instance.items.length} items`;
  $('#drop-reference').href = instance.source;
  $('#drop-reference').hidden = false;
}

async function show(zone) {
  if (!instances.has(zone)) return;
  if (zone !== state.zone) $('#drop-source').value = 'all';
  state.zone = zone;
  panel.hidden = false;
  $('#drops-error').hidden = true;
  $('#drops-empty').hidden = true;
  $('#drops').replaceChildren();
  $('#drop-result-count').textContent = 'Loading drops…';
  $('#drop-reference').hidden = true;
  try {
    await load();
    if (state.zone !== zone || panel.hidden) return;
    const previous = $('#drop-source').value;
    const option = document.createElement('option');
    option.value = 'all'; option.textContent = 'All sources';
    $('#drop-source').replaceChildren(option);
    for (const source of new Set(state.data[zone].items.map(item => item.source))) {
      const option = document.createElement('option');
      option.value = source; option.textContent = source;
      $('#drop-source').append(option);
    }
    $('#drop-source').value = [...$('#drop-source').options].some(option => option.value === previous) ? previous : 'all';
    render();
  } catch {
    if (state.zone !== zone || panel.hidden) return;
    $('#drops-error').hidden = false;
    $('#drop-result-count').textContent = 'Drops unavailable';
  }
}

$('#drop-search').addEventListener('input', render);
$('#drop-source').addEventListener('change', render);
$('#drop-class').addEventListener('change', render);
$('#drops-retry').addEventListener('click', () => show(state.zone));
globalThis.DungeonDrops = Object.freeze({
  hasZone: zone => instances.has(zone),
  show,
  hide: () => { panel.hidden = true; },
});
})();
