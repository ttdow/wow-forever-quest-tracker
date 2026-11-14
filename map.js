(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const panel = $('#map-panel');
const categories = {
  'chest-2855': { label: 'Solid Chest 2855', symbol: '▣', color: '#f4d484' },
  'chest-2857': { label: 'Solid Chest 2857', symbol: '▣', color: '#ed9e6f' },
  'footlocker-179491': { label: 'Waterlogged Footlocker', symbol: '▤', color: '#93caff' },
  'footlocker-179493': { label: 'Mossy Footlocker', symbol: '▤', color: '#77d7c0' },
  'quest-giver': { label: 'Quest givers', symbol: '!', color: '#b7efb5' },
  rare: { label: 'Rares', symbol: '◆', color: '#d1afff' },
  'quest-object': { label: 'Quest objects', symbol: '?', color: '#e3e7df' },
};
const state = { data: null, pending: null, map: null, image: null, markers: null, bounds: null, active: false, failed: false, fitted: false, version: 0, context: {} };

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function externalLink(text, url) {
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return null;
    const link = element('a', text);
    link.href = parsed.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  } catch { return null; }
}

for (const [key, category] of Object.entries(categories)) {
  const label = element('label');
  const check = element('input');
  check.type = 'checkbox'; check.value = key; check.checked = true;
  const symbol = element('span', category.symbol, 'map-legend-symbol');
  symbol.style.color = category.color;
  symbol.setAttribute('aria-hidden', 'true');
  const count = element('span', '', 'map-layer-count');
  count.dataset.category = key;
  label.append(check, symbol, element('span', category.label), count);
  $('#map-layers').append(label);
}

async function load() {
  if (state.data) return state.data;
  if (!state.pending) {
    state.pending = (async () => {
      const response = await fetch('./data/maps/desolace.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('Map data unavailable');
      const data = await response.json();
      if (data?.zone !== 'Desolace' || !Number.isFinite(data.map?.width) || data.map.width <= 0 ||
        !Number.isFinite(data.map.height) || data.map.height <= 0 || typeof data.map.image !== 'string' ||
        !Array.isArray(data.points) || !data.points.every(point => point &&
          ['id', 'name', 'category'].every(key => typeof point[key] === 'string') &&
          Object.hasOwn(categories, point.category) &&
          ['x', 'y'].every(key => Number.isFinite(point[key]) && point[key] >= 0 && point[key] <= 100)) ||
        new Set(data.points.map(point => point.id)).size !== data.points.length) {
        throw new Error('Invalid map data');
      }
      // Evidence and source labels are optional metadata, never loading requirements.
      state.data = data;
      return data;
    })().finally(() => { state.pending = null; });
  }
  return state.pending;
}

function showError() {
  state.failed = true;
  if (!state.active || panel.hidden) return;
  $('#map-error span').textContent = 'Could not load the Desolace map. Retry or reload the page.';
  $('#map-error').hidden = false;
  $('#map-empty').hidden = true;
  $('#map-result-count').textContent = 'Map unavailable';
}

function fit() {
  if (!state.map || !state.active) return;
  state.map.invalidateSize({ pan: false });
  const zoom = state.map.getBoundsZoom(state.bounds, false, [12, 12]);
  state.map.setMinZoom(zoom - 0.5).setMaxZoom(zoom + 2.5);
  state.map.stop().fitBounds(state.bounds, { padding: [12, 12], animate: false });
  state.fitted = true;
}

function createMap(data) {
  if (state.map) return;
  if (!globalThis.L) throw new Error('Map library unavailable');
  state.bounds = L.latLngBounds([[-data.map.height, 0], [0, data.map.width]]);
  state.map = L.map($('#zone-map'), {
    crs: L.CRS.Simple, minZoom: -5, maxZoom: 5, zoomSnap: 0.25, zoomDelta: 0.5,
    maxBounds: state.bounds.pad(0.15), maxBoundsViscosity: 0.8, attributionControl: false,
  });
  const image = L.imageOverlay(data.map.image, state.bounds, { alt: 'Desolace zone map', className: 'zone-map-art' });
  state.image = image;
  image.on('error', () => { if (state.image === image) showError(); }).addTo(state.map);
  state.markers = L.layerGroup().addTo(state.map);
  state.map.on('mousemove', event => {
    const x = event.latlng.lng / data.map.width * 100;
    const y = -event.latlng.lat / data.map.height * 100;
    $('#map-coordinates').textContent = x >= 0 && x <= 100 && y >= 0 && y <= 100
      ? `${x.toFixed(1)}, ${y.toFixed(1)}` : '—, —';
  });
  state.map.on('mouseout', () => { $('#map-coordinates').textContent = '—, —'; });
  $('#map-reset').disabled = false;
}

function pointPosition(point) {
  return [-point.y / 100 * state.data.map.height, point.x / 100 * state.data.map.width];
}

function referenceText(point) {
  if (point.verification === 'forever-confirmed') return 'Forever confirmed';
  if (point.verification === 'classic-derived') return 'Classic reference';
  return 'Unverified reference';
}

function popup(points) {
  const content = element('div', undefined, 'map-popup');
  const point = points[0];
  const coords = `${point.x.toFixed(2)}, ${point.y.toFixed(2)}`;
  const location = element('div', undefined, 'map-popup-location');
  const text = element('span', coords);
  const copy = element('button', 'Copy coords');
  copy.type = 'button';
  copy.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(coords);
      copy.textContent = 'Copied';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(text);
      const selection = window.getSelection();
      selection.removeAllRanges(); selection.addRange(range);
      copy.textContent = 'Selected · Ctrl+C';
    }
  });
  location.append(text, copy);
  content.append(location);
  for (const point of points) {
    const section = element('section', undefined, 'map-popup-entry');
    section.dataset.pointId = point.id;
    section.append(element('h2', point.name));
    const identity = point.npcId ? `NPC #${point.npcId}` : point.objectId ? `Object #${point.objectId}` : '';
    section.append(element('p', [identity, referenceText(point)].filter(Boolean).join(' · '), 'map-popup-meta'));
    if (point.coverage === 'additional-snapshot-only') {
      section.append(element('p', 'Extra candidate · one Classic snapshot.', 'map-popup-candidate'));
    }
    if (point.moving) section.append(element('p', 'Travels with the Gizelton Caravan; reference point.'));
    if (point.category === 'rare') section.append(element('p', 'Reference point; patrol range unconfirmed.'));
    if (Number.isInteger(point.lockpicking)) section.append(element('p', `Lockpicking ${point.lockpicking} · Classic reference`));
    const questIDs = Array.isArray(point.questIds) ? point.questIds : [];
    const quests = questIDs.map(id => state.context.quests?.find(quest => quest.id === id && quest.zone === state.data.zone)).filter(Boolean);
    if (quests.length) {
      const list = element('ul', undefined, 'map-popup-quests');
      for (const quest of quests) {
        const item = element('li');
        const completed = state.context.completed?.has(quest.id);
        const link = element('a', `${completed ? '✓ ' : ''}${quest.name} (#${quest.id})`);
        link.href = `#${new URLSearchParams({ zone: quest.zone, id: quest.id })}`;
        if (completed) link.title = 'Marked complete';
        link.addEventListener('click', event => {
          if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !state.context.onQuest) return;
          event.preventDefault();
          state.context.onQuest(quest.id, quest.zone);
        });
        item.append(link); list.append(item);
      }
      section.append(list);
    }
    const sources = Array.isArray(point.sources) ? point.sources : [];
    const links = sources.map(id => state.data.sources?.[id]).filter(source => source && typeof source.name === 'string' && typeof source.url === 'string')
      .map(source => externalLink(source.name, source.url)).filter(Boolean);
    if (links.length) {
      const details = element('details', undefined, 'map-popup-sources');
      const list = element('ul');
      for (const link of links) { const item = element('li'); item.append(link); list.append(item); }
      details.append(element('summary', 'Sources'), list);
      section.append(details);
    }
    content.append(section);
  }
  return content;
}

function render() {
  if (!state.active || panel.hidden || !state.data || !state.map || state.failed) return;
  const query = $('#map-search').value.trim().toLocaleLowerCase();
  const evidence = $('#map-evidence').value;
  const selected = new Set([...$('#map-layers').querySelectorAll('input:checked')].map(check => check.value));
  const points = state.data.points.filter(point => {
    const extra = point.coverage === 'additional-snapshot-only';
    if (!selected.has(point.category) || (evidence === 'shared' && extra) || (evidence === 'additional' && !extra) ||
      (evidence === 'forever' && point.verification !== 'forever-confirmed')) return false;
    const questIDs = Array.isArray(point.questIds) ? point.questIds : [];
    const names = questIDs.map(id => state.context.quests?.find(quest => quest.id === id)?.name || '');
    return !query || [point.name, point.npcId, point.objectId, point.x, point.y, `${point.x}, ${point.y}`, ...questIDs, ...names].join(' ').toLocaleLowerCase().includes(query);
  });
  state.map.closePopup();
  state.markers.eachLayer(marker => marker.closeTooltip());
  state.markers.clearLayers();
  const groups = new Map();
  for (const point of points) {
    const key = `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(point);
  }
  for (const group of groups.values()) {
    const point = group[0];
    const category = categories[point.category];
    const extra = group.every(point => point.coverage === 'additional-snapshot-only');
    const icon = L.divIcon({
      className: 'map-marker', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12],
      html: `<span class="map-pin${extra ? ' map-pin-extra' : ''}" style="--pin:${category.color}">${category.symbol}</span>${group.length > 1 ? `<span class="map-pin-count">${group.length}</span>` : ''}`,
    });
    const title = group.map(point => point.name).join(' / ');
    const popupWidth = Math.max(160, Math.min(320, $('#zone-map').clientWidth - 70));
    L.marker(pointPosition(point), { icon, title, alt: title, keyboard: true })
      .bindTooltip(element('span', `${title} · ${point.x.toFixed(1)}, ${point.y.toFixed(1)}`), { direction: 'top' })
      .bindPopup(() => popup(group), { maxWidth: popupWidth, minWidth: Math.min(220, popupWidth), maxHeight: 330, autoPanPadding: [20, 20] })
      .addTo(state.markers);
  }
  for (const count of $('#map-layers').querySelectorAll('[data-category]')) {
    count.textContent = state.data.points.filter(point => point.category === count.dataset.category).length;
  }
  $('#map-empty').hidden = points.length > 0;
  $('#map-empty').textContent = evidence === 'forever' ? 'No Forever-confirmed locations recorded.' : 'No locations match your filters.';
  $('#map-result-count').textContent = `${points.length} of ${state.data.points.length} entries`;
}

async function show(zone, context = {}) {
  if (zone !== 'Desolace') return;
  state.active = true;
  state.context = context;
  panel.hidden = false;
  const version = ++state.version;
  if (state.failed && state.map) {
    state.map.remove(); state.map = null; state.image = null; state.fitted = false;
  }
  state.failed = false;
  $('#map-error').hidden = true;
  $('#map-empty').hidden = true;
  $('#map-result-count').textContent = 'Loading map…';
  try {
    const data = await load();
    if (!state.active || panel.hidden || version !== state.version) return;
    createMap(data);
    render();
    requestAnimationFrame(() => {
      if (!state.active || panel.hidden || version !== state.version) return;
      state.map.invalidateSize({ pan: false });
      if (!state.fitted) fit();
    });
  } catch {
    if (state.active && version === state.version) showError();
  }
}

$('#map-layers').addEventListener('change', render);
$('#map-search').addEventListener('input', render);
$('#map-evidence').addEventListener('change', render);
$('#map-reset').disabled = true;
$('#map-reset').addEventListener('click', fit);
$('#map-retry').addEventListener('click', () => { state.data = null; show('Desolace', state.context); });
globalThis.ZoneMap = Object.freeze({
  hasZone: zone => zone === 'Desolace',
  show,
  hide: () => { state.active = false; ++state.version; panel.hidden = true; state.map?.closePopup(); },
});
})();
