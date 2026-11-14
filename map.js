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
  'dungeon-chest': { label: 'Chest spawns', symbol: '▣', color: '#f4d484' },
  boss: { label: 'Bosses', symbol: '◆', color: '#f19595' },
  npc: { label: 'NPCs', symbol: '●', color: '#a6d7ed' },
  entrance: { label: 'Entrance', symbol: '↪', color: '#e3e7df' },
};
const zones = {
  Desolace: { file: 'desolace', guide: 'https://foreverdb.net/maps/1443', report: 'desolace-map' },
  Gnomeregan: { file: 'gnomeregan', guide: 'https://foreverdb.net/dungeon/90-gnomeregan', report: 'gnomeregan-map' },
};
const dataCache = new Map();
const pending = new Map();
const settings = new Map();
const viewports = new Map();
const state = { zone: '', data: null, floor: null, map: null, image: null, markers: null, bounds: null, active: false, failed: false, fitted: false, version: 0, context: {} };

function preferences(zone = state.zone) {
  if (!settings.has(zone)) settings.set(zone, { search: '', evidence: 'all', enabled: new Set(Object.keys(categories)), floor: '' });
  return settings.get(zone);
}

function rememberSettings() {
  if (!state.zone) return;
  const saved = preferences();
  saved.search = $('#map-search').value;
  saved.evidence = $('#map-evidence').value;
}

function viewportKey() { return `${state.zone}:${state.floor?.id}`; }

function rememberViewport() {
  if (state.map && state.fitted) viewports.set(viewportKey(), { center: state.map.getCenter(), zoom: state.map.getZoom() });
}

function destroyMap() {
  rememberViewport();
  state.image = null;
  state.map?.remove();
  state.map = null; state.markers = null; state.fitted = false;
  $('#map-reset').disabled = true;
}

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

function buildLayers() {
  const fragment = document.createDocumentFragment();
  fragment.append(element('legend', 'Map layers and legend', 'sr-only'));
  for (const [key, category] of Object.entries(categories)) {
    const total = state.data.points.filter(point => point.floor === state.floor.id && point.category === key).length;
    if (!total) continue;
    const label = element('label');
    const check = element('input');
    check.type = 'checkbox'; check.value = key; check.checked = preferences().enabled.has(key);
    const symbol = element('span', category.symbol, 'map-legend-symbol');
    symbol.style.color = category.color;
    symbol.setAttribute('aria-hidden', 'true');
    label.append(check, symbol, element('span', category.label), element('span', total, 'map-layer-count'));
    fragment.append(label);
  }
  $('#map-layers').replaceChildren(fragment);
}

async function load(zone) {
  if (dataCache.has(zone)) return dataCache.get(zone);
  if (!pending.has(zone)) {
    pending.set(zone, (async () => {
      const response = await fetch(`./data/maps/${zones[zone].file}.json`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Map data unavailable');
      const data = await response.json();
      const floors = data?.floors || [{ id: 'main', name: zone, ...data?.map }];
      if (data?.zone !== zone || !Array.isArray(floors) || !floors.length ||
        !floors.every(floor => floor && typeof floor.id === 'string' && typeof floor.name === 'string' &&
          Number.isFinite(floor.width) && floor.width > 0 && Number.isFinite(floor.height) && floor.height > 0 && typeof floor.image === 'string') ||
        new Set(floors.map(floor => floor.id)).size !== floors.length ||
        !Array.isArray(data.points) || !data.points.every(point => point &&
          ['id', 'name', 'category'].every(key => typeof point[key] === 'string') &&
          Object.hasOwn(categories, point.category) &&
          ['x', 'y'].every(key => Number.isFinite(point[key]) && point[key] >= 0 && point[key] <= 100) &&
          (point.floor === undefined ? floors.length === 1 : floors.some(floor => floor.id === point.floor))) ||
        new Set(data.points.map(point => point.id)).size !== data.points.length) {
        throw new Error('Invalid map data');
      }
      // Evidence and source labels are optional metadata, never loading requirements.
      const normalized = { ...data, floors, points: data.points.map(point => ({ ...point, floor: point.floor ?? floors[0].id })) };
      dataCache.set(zone, normalized);
      return normalized;
    })().finally(() => { pending.delete(zone); }));
  }
  return pending.get(zone);
}

function showError() {
  state.failed = true;
  if (!state.active || panel.hidden) return;
  $('#map-error span').textContent = `Could not load the ${state.zone} map. Retry or reload the page.`;
  $('#map-error').hidden = false;
  $('#map-empty').hidden = true;
  $('#map-result-count').textContent = 'Map unavailable';
}

function fit() {
  if (!state.map || !state.active) return;
  state.map.invalidateSize({ pan: false });
  const zoom = state.map.getBoundsZoom(state.bounds, false, [12, 12]);
  state.map.setMinZoom(zoom - 0.5).setMaxZoom(zoom + (state.data.map?.appearance === 'dungeon' ? 4 : 2.5));
  state.map.stop().fitBounds(state.bounds, { padding: [12, 12], animate: false });
  state.fitted = true;
}

function createMap() {
  if (state.map) return;
  if (!globalThis.L) throw new Error('Map library unavailable');
  const floor = state.floor;
  state.bounds = L.latLngBounds([[-floor.height, 0], [0, floor.width]]);
  state.map = L.map($('#zone-map'), {
    crs: L.CRS.Simple, minZoom: -5, maxZoom: 5, zoomSnap: 0.25, zoomDelta: 0.5,
    maxBounds: state.bounds.pad(0.15), maxBoundsViscosity: 0.8, attributionControl: false,
  });
  const image = L.imageOverlay(floor.image, state.bounds, {
    alt: `${state.zone} map: ${floor.name}`,
    className: `zone-map-art${state.data.map?.appearance === 'dungeon' ? ' zone-map-art-dungeon' : ''}`,
  });
  state.image = image;
  image.on('error', () => { if (state.image === image) showError(); }).addTo(state.map);
  state.markers = L.layerGroup().addTo(state.map);
  state.map.on('mousemove', event => {
    const x = event.latlng.lng / floor.width * 100;
    const y = -event.latlng.lat / floor.height * 100;
    $('#map-coordinates').textContent = x >= 0 && x <= 100 && y >= 0 && y <= 100
      ? `${x.toFixed(1)}, ${y.toFixed(1)}` : '—, —';
  });
  state.map.on('mouseout', () => { $('#map-coordinates').textContent = '—, —'; });
  $('#map-reset').disabled = false;
}

function pointPosition(point) {
  return [-point.y / 100 * state.floor.height, point.x / 100 * state.floor.width];
}

function referenceText(point) {
  if (point.verification === 'forever-confirmed') return 'Forever confirmed';
  if (point.verification === 'classic-derived') return 'Classic reference';
  return 'Unverified reference';
}

function popup(points) {
  const content = element('div', undefined, 'map-popup');
  if (state.data.floors.length > 1) content.append(element('p', state.floor.name, 'map-popup-meta'));
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
    const identity = point.npcId ? `NPC #${point.npcId}` : point.objectId ? `Object #${point.objectId}`
      : Array.isArray(point.objectIds) ? `Objects ${point.objectIds.map(id => `#${id}`).join(' / ')}` : '';
    section.append(element('p', [identity, referenceText(point)].filter(Boolean).join(' · '), 'map-popup-meta'));
    if (point.coverage === 'additional-snapshot-only') {
      section.append(element('p', 'Extra candidate · one Classic snapshot.', 'map-popup-candidate'));
    }
    if (point.moving) section.append(element('p', point.movementNote || 'Travels with the Gizelton Caravan; reference point.'));
    if (typeof point.note === 'string' && point.note) section.append(element('p', point.note));
    if (Array.isArray(point.variants)) {
      const list = element('ul');
      for (const variant of point.variants) if (typeof variant?.name === 'string') list.append(element('li', variant.name));
      section.append(list);
    }
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
    if (point.drops) {
      const link = element('a', 'Dungeon drops');
      link.href = `#${new URLSearchParams({ zone: state.zone, view: 'drops' })}`;
      section.append(link);
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
  const selected = preferences().enabled;
  const matching = state.data.points.filter(point => {
    const extra = point.coverage === 'additional-snapshot-only';
    if (!selected.has(point.category) || (evidence === 'shared' && extra) || (evidence === 'additional' && !extra) ||
      (evidence === 'forever' && point.verification !== 'forever-confirmed')) return false;
    const questIDs = Array.isArray(point.questIds) ? point.questIds : [];
    const names = questIDs.map(id => state.context.quests?.find(quest => quest.id === id)?.name || '');
    const variants = Array.isArray(point.variants) ? point.variants.map(variant => variant?.name || '') : [];
    const objectIDs = Array.isArray(point.objectIds) ? point.objectIds : [];
    return !query || [point.name, point.npcId, point.objectId, ...objectIDs, ...variants, point.x, point.y, `${point.x}, ${point.y}`, ...questIDs, ...names].join(' ').toLocaleLowerCase().includes(query);
  });
  const points = matching.filter(point => point.floor === state.floor.id);
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
  const otherFloors = document.createDocumentFragment();
  if (query) for (const floor of state.data.floors) {
    const count = matching.filter(point => point.floor === floor.id).length;
    if (floor.id === state.floor.id || !count) continue;
    const button = element('button', `${floor.name} · ${count} ${count === 1 ? 'match' : 'matches'}`);
    button.type = 'button';
    button.addEventListener('click', () => changeFloor(floor.id));
    otherFloors.append(button);
  }
  $('#map-floor-matches').replaceChildren(otherFloors);
  $('#map-floor-matches').hidden = !$('#map-floor-matches').childElementCount;
  $('#map-empty').hidden = points.length > 0;
  $('#map-empty').textContent = evidence === 'forever' ? 'No Forever-confirmed locations recorded.' : 'No locations match your filters on this map.';
  const total = state.data.points.filter(point => point.floor === state.floor.id).length;
  $('#map-result-count').textContent = `${points.length} of ${total} entries${state.data.floors.length > 1 ? ` · ${state.data.points.length} across all sections` : ''}`;
}

function resizeMap(version) {
  requestAnimationFrame(() => {
    if (!state.active || panel.hidden || version !== state.version || !state.map) return;
    state.map.invalidateSize({ pan: false });
    if (!state.fitted) {
      const saved = viewports.get(viewportKey());
      fit();
      if (saved) state.map.setView(saved.center, Math.max(state.map.getMinZoom(), Math.min(state.map.getMaxZoom(), saved.zoom)), { animate: false });
    }
  });
}

function changeFloor(id) {
  if (!state.data?.floors.some(floor => floor.id === id)) return;
  preferences().floor = id;
  history.pushState({ zone: state.zone, view: 'map' }, '', `#${new URLSearchParams({ zone: state.zone, view: 'map', floor: id })}`);
  show(state.zone, state.context);
}

async function show(zone, context = {}) {
  if (!Object.hasOwn(zones, zone)) return;
  if (zone !== state.zone) {
    rememberSettings(); destroyMap();
    state.zone = zone; state.data = null; state.floor = null;
    $('#map-search').value = preferences().search;
    $('#map-evidence').value = preferences().evidence;
    $('#map-layers').replaceChildren();
    $('#map-floor-matches').hidden = true;
    $('#map-floor-control').hidden = true;
  }
  state.active = true;
  state.context = context;
  panel.hidden = false;
  const version = ++state.version;
  if (state.failed && state.map) {
    destroyMap();
  }
  state.failed = false;
  $('#map-error').hidden = true;
  $('#map-empty').hidden = true;
  $('#map-result-count').textContent = 'Loading map…';
  try {
    const data = await load(zone);
    if (!state.active || panel.hidden || version !== state.version) return;
    const route = new URLSearchParams(location.hash.slice(1));
    const requested = route.get('zone') === zone && route.get('view') === 'map' ? route.get('floor') : '';
    const floor = data.floors.find(floor => floor.id === requested) || data.floors.find(floor => floor.id === preferences().floor) || data.floors[0];
    if (state.floor?.id !== floor.id) destroyMap();
    state.data = data; state.floor = floor; preferences().floor = floor.id;
    $('#map-panel').setAttribute('aria-label', `${zone} map`);
    $('#zone-map').setAttribute('aria-label', `${zone} locations. Use arrow keys to pan and plus or minus to zoom.`);
    $('#map-note').textContent = typeof data.note === 'string' ? data.note : 'Classic reference locations. Spawns may differ in Forever. Dashed markers are extra candidates.';
    $('#map-guide').href = zones[zone].guide;
    $('#map-sources').href = `./research/${zones[zone].report}/README.md`;
    $('#map-floor-control').hidden = data.floors.length < 2;
    $('#map-floor').replaceChildren(...data.floors.map(floor => {
      const option = element('option', floor.name); option.value = floor.id; return option;
    }));
    $('#map-floor').value = floor.id;
    $('#map-coordinates').textContent = '—, —';
    buildLayers();
    createMap();
    render();
    resizeMap(version);
  } catch {
    if (state.active && version === state.version) showError();
  }
}

$('#map-layers').addEventListener('change', event => {
  const check = event.target;
  if (check.matches('input[type="checkbox"]')) {
    if (check.checked) preferences().enabled.add(check.value);
    else preferences().enabled.delete(check.value);
  }
  render();
});
$('#map-floor').addEventListener('change', () => changeFloor($('#map-floor').value));
$('#map-search').addEventListener('input', render);
$('#map-evidence').addEventListener('change', render);
$('#map-reset').disabled = true;
$('#map-reset').addEventListener('click', fit);
$('#map-retry').addEventListener('click', () => { dataCache.delete(state.zone); show(state.zone, state.context); });
globalThis.ZoneMap = Object.freeze({
  hasZone: zone => Object.hasOwn(zones, zone),
  show,
  hide: () => { rememberSettings(); rememberViewport(); state.active = false; ++state.version; panel.hidden = true; state.map?.closePopup(); },
});
})();
