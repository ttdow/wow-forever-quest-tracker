(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const instances = new Set(['Deadmines', 'Wailing Caverns', 'Blackfathom Deeps', 'The Stockades', 'Gnomeregan', 'Excavation Site: Wetlands', 'The City of Dalaran', 'Razorfen Kraul', 'Razorfen Downs', 'Scarlet Monastery Graveyard', 'Scarlet Monastery Library', 'Scarlet Monastery Armory', 'The Drowned City']);
const panel = $('#drops-panel');
const state = { zone: '', data: null, pending: null, openCards: new Set() };

async function load(zone) {
  if (!state.data) {
    if (!state.pending) {
      state.pending = (async () => {
        const response = await fetch('./data/drops.json', { cache: 'no-store' });
        if (!response.ok) throw new Error('Drops unavailable');
        const data = await response.json();
        if (!data?.instances || typeof data.instances !== 'object' || Array.isArray(data.instances)) {
          throw new Error('Invalid drop data');
        }
        state.data = data.instances;
      })().finally(() => { state.pending = null; });
    }
    await state.pending;
  }
  // Validate only this dungeon; unrelated records must not block its loot.
  const items = state.data[zone]?.items;
  if (!Array.isArray(items) || !items.every(item => item &&
    ['id', 'name', 'slot', 'type', 'source'].every(key => typeof item[key] === 'string') &&
    /^\d+$/.test(item.id) && Number.isInteger(item.requiredLevel) && item.requiredLevel >= 0 &&
    Number.isInteger(item.quality) && typeof item.rogueUsable === 'boolean' &&
    Array.isArray(item.stats) && item.stats.every(stat => typeof stat === 'string'))) {
    throw new Error('Invalid drop data');
  }
  return state.data;
}

function cell(text, className, label) {
  const element = document.createElement('td');
  element.textContent = text || '—';
  element.className = className;
  if (label) element.dataset.label = label;
  return element;
}

function rememberCards() {
  for (const card of $('#drops').querySelectorAll('.boss-card')) {
    if (card.open) state.openCards.add(card.dataset.key);
    else state.openCards.delete(card.dataset.key);
  }
}

function render() {
  const instance = state.data?.[state.zone];
  if (!instance || !$('#drops-error').hidden) return;
  rememberCards();
  const search = $('#drop-search').value.trim().toLocaleLowerCase();
  const source = $('#drop-source').value;
  const rogue = $('#drop-class').value === 'rogue';
  const visible = instance.items.filter(item =>
    (source === 'all' || item.source === source) && (!rogue || item.rogueUsable) &&
    (!search || [item.id, item.name, item.slot, item.type, item.requiredLevel, item.source, ...item.stats].join(' ').toLocaleLowerCase().includes(search)));
  const groups = new Map();
  for (const item of visible) {
    if (!groups.has(item.source)) groups.set(item.source, []);
    groups.get(item.source).push(item);
  }
  const fragment = document.createDocumentFragment();
  for (const [boss, items] of groups) {
    const card = document.createElement('details');
    card.className = 'boss-card';
    card.dataset.source = boss;
    card.dataset.key = JSON.stringify([state.zone, boss]);
    card.open = state.openCards.has(card.dataset.key) || Boolean(search) || source !== 'all';
    const summary = document.createElement('summary');
    const heading = document.createElement('span');
    heading.className = 'boss-name';
    heading.textContent = boss;
    const count = document.createElement('span');
    count.className = 'boss-item-count';
    count.textContent = `${items.length} ${items.length === 1 ? 'item' : 'items'}`;
    summary.append(heading, count);
    const wrapper = document.createElement('div');
    wrapper.className = 'boss-loot table-wrap';
    const table = document.createElement('table');
    table.className = 'drop-table';
    table.setAttribute('aria-label', `${boss} loot`);
    const columns = document.createElement('colgroup');
    for (const name of ['item', 'type', 'level', 'stats', 'evidence']) {
      const column = document.createElement('col');
      column.className = `col-drop-${name}`;
      columns.append(column);
    }
    const head = document.createElement('thead');
    const titles = document.createElement('tr');
    for (const label of ['Item', 'Slot / type', 'Req. level', 'Base stats / effects', 'Drop evidence']) {
      const title = document.createElement('th');
      title.scope = 'col'; title.textContent = label; titles.append(title);
    }
    head.append(titles);
    const body = document.createElement('tbody');
    for (const item of items) body.append(itemRow(item));
    table.append(columns, head, body);
    wrapper.append(table);
    card.append(summary, wrapper);
    card.addEventListener('toggle', () => {
      if (!card.isConnected) return;
      if (card.open) state.openCards.add(card.dataset.key);
      else state.openCards.delete(card.dataset.key);
    });
    fragment.append(card);
  }
  $('#drops').replaceChildren(fragment);
  $('#drops-empty').hidden = visible.length > 0;
  $('#drop-result-count').textContent = `${visible.length} of ${instance.items.length} items`;
  $('#drop-reference').href = instance.source;
  $('#drop-reference').textContent = `Guide: ${typeof instance.referenceName === 'string' && instance.referenceName.trim() ? instance.referenceName : 'ForeverDB'}`;
  $('#drop-reference').hidden = false;
}

function itemRow(item) {
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
    const evidenceLabels = { seen: 'Seen in Forever', classic: 'Classic ref.', wowhead: 'Wowhead ref.' };
    const evidenceKind = typeof item.dropEvidence === 'string' && Object.hasOwn(evidenceLabels, item.dropEvidence)
      ? item.dropEvidence : 'reference';
    const evidence = cell(evidenceLabels[evidenceKind] || 'Source ref.', `drop-evidence ${evidenceKind}`, 'Drop evidence');
    const statsReference = item.statsEvidence === 'wowhead' ? "Stats use Wowhead's Forever tooltip." : 'Stats use the Forever client.';
    evidence.title = item.dropEvidence === 'seen'
      ? 'This drop source was recorded by players in WoW: Forever.'
      : item.dropEvidence === 'wowhead'
        ? `Boss source listed in Wowhead's WoW Forever item database. ${statsReference}`
        : item.dropEvidence === 'classic'
          ? 'Drop source from Classic; not yet recorded in WoW: Forever. Stats use the Forever client.'
          : 'Drop source reference; see the item sources in the research data.';
    if (item.dropEvidence === 'wowhead') {
      const reference = document.createElement('a');
      reference.href = `https://www.wowhead.com/forever/item=${item.id}`;
      reference.target = '_blank';
      reference.rel = 'noopener noreferrer';
      reference.textContent = evidenceLabels.wowhead;
      evidence.replaceChildren(reference);
    }
    row.append(name, cell(`${item.slot} · ${item.type}`, 'drop-type', 'Slot / type'), cell(String(item.requiredLevel), 'drop-level', 'Required level'), stats, evidence);
    return row;
}

async function show(zone) {
  if (!instances.has(zone)) return;
  rememberCards();
  if (zone !== state.zone) $('#drop-source').value = 'all';
  state.zone = zone;
  panel.hidden = false;
  $('#drops-error').hidden = true;
  $('#drops-empty').hidden = true;
  $('#drops').replaceChildren();
  $('#drop-result-count').textContent = 'Loading drops…';
  $('#drop-reference').hidden = true;
  try {
    await load(zone);
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
    $('#drops-error span').textContent = `Could not load ${zone} drops. Retry or reload the page.`;
    $('#drops-error').hidden = false;
    $('#drop-result-count').textContent = 'Drops unavailable';
  }
}

$('#drop-search').addEventListener('input', render);
$('#drop-source').addEventListener('change', render);
$('#drop-class').addEventListener('change', render);
$('#drops-retry').addEventListener('click', () => {
  state.data = null;
  show(state.zone);
});
globalThis.DungeonDrops = Object.freeze({
  hasZone: zone => instances.has(zone),
  show,
  hide: () => { panel.hidden = true; },
});
})();
