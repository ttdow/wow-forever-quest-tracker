(async () => {
'use strict';
const $ = selector => document.querySelector(selector);
const state = { quests: [], forwardLinks: new Map(), completed: new Set(), expanded: new Set(), zone: 'Teldrassil', view: 'quests', storageReady: false, loaded: false };
const rows = $('#quests');
const zones = ['Teldrassil', 'Darkshore', 'Ashenvale', 'Stonetalon Mountains', 'Desolace', "Shen'dralas", 'Feralas', 'Deadmines', 'Wailing Caverns', 'Blackfathom Deeps', 'The Stockades', 'Gnomeregan', 'Excavation Site: Wetlands', 'The City of Dalaran', 'Razorfen Kraul', 'Scarlet Monastery Graveyard', 'Scarlet Monastery Library', 'Scarlet Monastery Armory', 'The Drowned City'];
const navigation = { open: null, zone: state.zone };
let saveTimer;

function renderZoneNavigation() {
  if (navigation.zone !== state.zone) { navigation.zone = state.zone; navigation.open = null; }
  $('#selected-zone').textContent = state.zone;
  for (const group of ['zones', 'dungeons']) {
    const toggle = $(`[data-zone-group="${group}"]`);
    const list = $(`#${group}-list`);
    toggle.disabled = !state.loaded;
    toggle.setAttribute('aria-expanded', String(navigation.open === group));
    list.hidden = navigation.open !== group;
    if (!list.childElementCount) {
      for (const zone of zones.filter(zone => isDungeon(zone) === (group === 'dungeons'))) {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.zone = zone;
        const name = document.createElement('span');
        name.textContent = zone;
        const count = document.createElement('span');
        count.className = 'zone-count';
        button.append(name, count);
        list.append(button);
      }
    }
    for (const button of list.children) {
      const quests = state.quests.filter(quest => quest.zone === button.dataset.zone);
      button.setAttribute('aria-pressed', String(button.dataset.zone === state.zone));
      const count = button.querySelector('.zone-count');
      count.textContent = `${quests.filter(quest => state.completed.has(quest.id)).length}/${quests.length}`;
      count.setAttribute('aria-label', `${count.textContent} quests completed`);
    }
  }
}

function selectZone(zone) {
  if (!zones.includes(zone)) return;
  navigation.open = null;
  if (zone !== state.zone) {
    state.zone = zone;
    if (!supportsView(state.zone, state.view)) state.view = 'quests';
    if (isDungeon(state.zone) && !state.quests.some(quest => quest.zone === state.zone)) state.view = 'drops';
    history.pushState({ zone: state.zone, view: state.view }, '', viewURL(state.zone, state.view));
    render();
  } else renderZoneNavigation();
  $(`[data-zone-group="${isDungeon(zone) ? 'dungeons' : 'zones'}"]`).focus({ preventScroll: true });
}

function cell(text, className, label) {
  const element = document.createElement('td');
  element.textContent = text || '—';
  if (text) element.title = text;
  if (className) element.className = className;
  if (label) element.dataset.label = label;
  return element;
}

function questElementID(quest) {
  return `quest-${encodeURIComponent(quest.zone)}-${quest.id}`;
}

function questHash(quest) {
  return `#${new URLSearchParams({ zone: quest.zone, id: quest.id })}`;
}

function isDungeon(zone) {
  return globalThis.DungeonDrops?.hasZone(zone) || false;
}

function hasMap(zone) {
  return globalThis.ZoneMap?.hasZone(zone) || false;
}

function supportsView(zone, view) {
  return view === 'quests' || (view === 'drops' && isDungeon(zone)) || (view === 'map' && hasMap(zone));
}

function viewURL(zone, view) {
  return view === 'quests' ? location.pathname + location.search : `#${new URLSearchParams({ zone, view })}`;
}

function restoreHistoryView() {
  const zone = history.state?.zone;
  if (isDungeon(zone) || hasMap(zone) || state.quests.some(quest => quest.zone === zone)) state.zone = zone;
  state.view = supportsView(state.zone, history.state?.view) ? history.state.view : 'quests';
}

function revealQuest(id, zone, updateHistory = true) {
  const quest = state.quests.find(item => item.id === id && item.zone === zone);
  if (!quest) return false;
  state.zone = quest.zone;
  state.view = 'quests';
  state.expanded.add(`${quest.zone}:${quest.id}`);
  $('#search').value = '';
  $('#status').value = 'all';
  if (updateHistory && location.hash !== questHash(quest)) {
    history.pushState({ zone: quest.zone, view: 'quests' }, '', questHash(quest));
  } else {
    history.replaceState({ zone: quest.zone, view: 'quests' }, '', location.href);
  }
  render();
  const row = document.getElementById(questElementID(quest));
  row?.scrollIntoView({ block: 'center' });
  row?.querySelector('.quest-toggle')?.focus({ preventScroll: true });
  return true;
}

function revealHashRoute() {
  const params = new URLSearchParams(location.hash.slice(1));
  if (['drops', 'map'].includes(params.get('view')) && supportsView(params.get('zone'), params.get('view'))) {
    state.zone = params.get('zone');
    state.view = params.get('view');
    history.replaceState({ zone: state.zone, view: state.view }, '', location.href);
    render();
    return true;
  }
  return revealQuest(params.get('id'), params.get('zone'), false);
}

function buildForwardLinks(quests) {
  const links = new Map();
  for (const quest of quests) {
    for (const [backward, forward] of [['prerequisites', 'unlocks'], ['previousQuests', 'later']]) {
      for (const reference of quest[backward] || []) {
        if (!links.has(reference.id)) links.set(reference.id, { unlocks: [], later: [] });
        const following = links.get(reference.id)[forward];
        if (!following.some(item => item.id === quest.id)) {
          following.push({ id: quest.id, name: quest.name, relation: reference.relation, evidence: reference.evidence });
        }
      }
    }
  }
  return links;
}

function referenceRow(quest) {
  const following = state.forwardLinks.get(quest.id);
  const groups = [
    ['Prerequisites', quest.prerequisites || []],
    ['Earlier in chain', quest.previousQuests || []],
    ['Unlocks', following?.unlocks || []],
    ['Later in chain', following?.later || []],
  ].filter(([, references]) => references.length);
  if (!groups.length) return null;
  const row = document.createElement('tr');
  row.className = 'quest-references';
  row.classList.toggle('completed', state.completed.has(quest.id));
  row.id = `${questElementID(quest)}-references`;
  row.hidden = !state.expanded.has(`${quest.zone}:${quest.id}`);
  const content = document.createElement('td');
  content.colSpan = 8;
  for (const [heading, references] of groups) {
    const section = document.createElement('section');
    section.className = 'quest-reference-group';
    section.setAttribute('aria-label', heading);
    const title = document.createElement('h2');
    title.textContent = heading;
    const list = document.createElement('ul');
    for (const reference of references) {
      const target = state.quests.find(item => item.id === reference.id && item.zone === (reference.zone || quest.zone))
        || state.quests.find(item => item.id === reference.id);
      const item = document.createElement('li');
      const status = document.createElement('span');
      status.className = 'reference-status';
      status.textContent = state.completed.has(reference.id) ? '✓' : '○';
      status.setAttribute('role', 'img');
      status.setAttribute('aria-label', state.completed.has(reference.id) ? 'Completed' : 'Not marked complete');
      const link = document.createElement('a');
      if (target) {
        link.href = questHash(target);
        link.textContent = `${target.name}${target.zone !== quest.zone ? ` · ${target.zone}` : ''} (#${target.id})`;
        link.addEventListener('click', event => {
          if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          revealQuest(target.id, target.zone);
        });
      } else {
        link.href = `https://foreverdb.net/quest/${reference.id}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = `${reference.name} (#${reference.id}) ↗`;
        link.title = 'View quest guide on ForeverDB';
      }
      if (reference.relation === 'Offered after') {
        link.append(' · observed order');
        link.title = 'Sequence observed by players; a mandatory prerequisite is not confirmed.';
      } else if (reference.evidence === 'community') {
        link.append(' · player report');
        link.title = 'Prerequisite from a player report; its source is recorded in the research notes.';
      }
      item.append(status, link);
      list.append(item);
    }
    section.append(title, list);
    content.append(section);
  }
  row.append(content);
  return row;
}

function render() {
  const zoneQuests = state.quests.filter(quest => quest.zone === state.zone);
  const count = zoneQuests.filter(quest => state.completed.has(quest.id)).length;
  $('#progress-text').textContent = `${count} / ${zoneQuests.length} completed`;
  $('#progress').max = zoneQuests.length || 1;
  $('#progress').value = count;
  renderZoneNavigation();

  const dungeon = isDungeon(state.zone);
  const map = hasMap(state.zone);
  if (!supportsView(state.zone, state.view)) state.view = 'quests';
  $('#views').hidden = !dungeon && !map;
  document.querySelectorAll('[data-view]').forEach(button => {
    button.hidden = !supportsView(state.zone, button.dataset.view);
    button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
  });
  $('#quest-panel').hidden = state.view !== 'quests';
  $('.progress-block').hidden = state.view !== 'quests';
  if (state.view !== 'map') globalThis.ZoneMap?.hide();
  if (state.view !== 'drops') globalThis.DungeonDrops?.hide();
  if (state.view === 'drops') {
    globalThis.DungeonDrops.show(state.zone);
    return;
  }
  if (state.view === 'map') {
    globalThis.ZoneMap.show(state.zone, { quests: state.quests, completed: state.completed, onQuest: revealQuest });
    return;
  }

  const search = $('#search').value.trim().toLocaleLowerCase();
  const status = $('#status').value;
  const visible = zoneQuests.filter(quest => {
    const completed = state.completed.has(quest.id);
    return (status === 'all' || (status === 'completed' ? completed : !completed)) &&
      (!search || [quest.name, quest.stage, quest.id, quest.level, quest.giver, quest.area, quest.coordinates, quest.objective].join(' ').toLocaleLowerCase().includes(search));
  });
  const sort = $('#sort').value;
  visible.sort((a, b) => sort === 'level' ? a.level - b.level : sort === 'level-desc' ? b.level - a.level : a[sort].localeCompare(b[sort]));
  const fragment = document.createDocumentFragment();
  for (const quest of visible) {
    const row = document.createElement('tr');
    const rowKey = `${quest.zone}:${quest.id}`;
    row.className = 'quest-row';
    row.id = questElementID(quest);
    const references = referenceRow(quest);
    row.classList.toggle('expanded', state.expanded.has(rowKey));
    row.classList.toggle('completed', state.completed.has(quest.id));
    const checkCell = document.createElement('td');
    checkCell.className = 'check';
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = state.completed.has(quest.id);
    check.disabled = !state.storageReady;
    check.dataset.id = quest.id;
    check.setAttribute('aria-label', `Completed: ${quest.name}${quest.stage ? `, ${quest.stage}` : ''} (ID ${quest.id})`);
    check.addEventListener('change', () => toggleQuest(quest.id, check.checked));
    checkCell.append(check);
    const name = cell('', 'quest');
    name.replaceChildren();
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'quest-toggle';
    toggle.dataset.id = quest.id;
    toggle.setAttribute('aria-expanded', String(state.expanded.has(rowKey)));
    if (references) toggle.setAttribute('aria-controls', references.id);
    toggle.addEventListener('click', () => {
      if (state.expanded.has(rowKey)) state.expanded.delete(rowKey);
      else state.expanded.add(rowKey);
      row.classList.toggle('expanded', state.expanded.has(rowKey));
      toggle.setAttribute('aria-expanded', String(state.expanded.has(rowKey)));
      if (references) references.hidden = !state.expanded.has(rowKey);
    });
    const label = document.createElement('span');
    label.className = 'quest-label';
    toggle.title = quest.name;
    const title = document.createElement('span');
    title.className = 'quest-name';
    title.textContent = quest.name;
    label.append(title);
    if (quest.stage) {
      const stage = document.createElement('span');
      stage.className = 'stage'; stage.textContent = quest.stage; label.append(stage);
    }
    toggle.append(label);
    name.append(toggle);
    const level = cell('', 'level-cell');
    level.replaceChildren();
    const badge = document.createElement('span');
    badge.className = 'level'; badge.textContent = quest.level;
    badge.setAttribute('aria-label', `Level ${quest.level}`); level.append(badge);
    row.append(checkCell, name, level, cell(quest.giver, 'giver', 'Quest giver / start'), cell(quest.area, 'area', 'Area'), cell(quest.coordinates, 'coordinates', 'Coordinates'), cell(quest.objective, 'objective', 'Objective'), cell(quest.id, 'quest-id', 'ID'));
    fragment.append(row);
    if (references) fragment.append(references);
  }
  const focusedID = document.activeElement?.dataset.id;
  const focusedType = document.activeElement?.tagName === 'BUTTON' ? 'button' : 'input';
  rows.replaceChildren(fragment);
  if (focusedID) rows.querySelector(`${focusedType}[data-id="${focusedID}"]`)?.focus({ preventScroll: true });
  $('#empty').hidden = visible.length > 0 || !state.loaded;
  $('#empty').textContent = dungeon && !zoneQuests.length
    ? 'No Alliance or Rogue quests recorded for this dungeon.'
    : 'No quests match your filters.';
  $('#result-count').textContent = `${visible.length} of ${zoneQuests.length} quests`;
}

function toggleQuest(id, completed) {
  clearTimeout(saveTimer);
  $('#error').hidden = true;
  try {
    // Read again so another open tab's progress is preserved.
    const next = QuestProgress.load();
    if (completed) next.add(id); else next.delete(id);
    QuestProgress.save(next);
    state.completed = next;
    $('#save-state').textContent = 'Saved';
    saveTimer = setTimeout(() => { $('#save-state').textContent = 'Saved in this browser'; }, 2000);
  } catch {
    $('#error').textContent = 'Could not save this change. Your previous status was restored. Allow browser storage for this site and try again.';
    $('#error').hidden = false;
    $('#save-state').textContent = 'Change not saved';
  }
  render();
  rows.querySelector(`input[data-id="${id}"]`)?.focus({ preventScroll: true });
}

$('#zone-navigation').addEventListener('click', event => {
  const toggle = event.target.closest('[data-zone-group]');
  if (toggle && state.loaded) {
    navigation.open = navigation.open === toggle.dataset.zoneGroup ? null : toggle.dataset.zoneGroup;
    renderZoneNavigation();
  }
  const button = event.target.closest('button[data-zone]');
  if (button) selectZone(button.dataset.zone);
});
$('#zone-navigation').addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !navigation.open) return;
  event.preventDefault();
  const group = navigation.open;
  navigation.open = null;
  renderZoneNavigation();
  $(`[data-zone-group="${group}"]`).focus({ preventScroll: true });
});
$('#views').addEventListener('click', event => {
  const button = event.target.closest('button[data-view]');
  if (!button || !supportsView(state.zone, button.dataset.view)) return;
  state.view = button.dataset.view;
  history.pushState({ zone: state.zone, view: state.view }, '', viewURL(state.zone, state.view));
  render();
});
$('#search').addEventListener('input', render);
$('#status').addEventListener('change', render);
$('#sort').addEventListener('change', render);

try {
  const response = await fetch('./data/quests.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Quest data unavailable');
  const quests = await response.json();
  const stringFields = ['id', 'zone', 'name', 'stage', 'giver', 'coordinates', 'area', 'objective'];
  if (!Array.isArray(quests) || !quests.every(quest => quest &&
    stringFields.every(key => typeof quest[key] === 'string') &&
    /^\d+$/.test(quest.id) && Number.isInteger(quest.level) && quest.level >= 0 &&
    ['prerequisites', 'previousQuests'].every(key => quest[key] === undefined ||
      (Array.isArray(quest[key]) && quest[key].every(reference => reference &&
        typeof reference.id === 'string' && /^\d+$/.test(reference.id) &&
        reference.id !== quest.id && typeof reference.name === 'string'))))) {
    throw new Error('Invalid quest data');
  }
  state.quests = quests;
  state.forwardLinks = buildForwardLinks(quests);
  state.loaded = true;
  try {
    state.completed = QuestProgress.load();
    state.storageReady = true;
  } catch {
    $('#save-state').textContent = 'Progress unavailable';
    $('#error').textContent = 'Could not read saved progress. Your saved data has not been changed. Allow browser storage for this site and reload.';
    $('#error').hidden = false;
  }
  if (!revealHashRoute()) {
    restoreHistoryView();
    history.replaceState({ zone: state.zone, view: state.view }, '', location.href);
    render();
  }
} catch {
  $('#progress-text').textContent = 'Quests unavailable';
  $('#save-state').textContent = '';
  $('#error').textContent = location.protocol === 'file:'
    ? 'Open the GitHub Pages website to load quests.'
    : 'Could not load quests. Reload the page and check data/quests.json.';
  $('#error').hidden = false;
}

window.addEventListener('storage', event => {
  if (!state.loaded) return;
  if (event.key !== QuestProgress.key && event.key !== null) return;
  try {
    state.completed = QuestProgress.load();
    state.storageReady = true;
    clearTimeout(saveTimer);
    $('#save-state').textContent = 'Saved in this browser';
    $('#error').hidden = true;
    render();
  } catch {
    state.storageReady = false;
    $('#save-state').textContent = 'Progress unavailable';
    $('#error').textContent = 'Could not read saved progress. Your saved data has not been changed. Reload the page to try again.';
    $('#error').hidden = false;
    render();
  }
});

window.addEventListener('hashchange', () => {
  if (state.loaded) revealHashRoute();
});
window.addEventListener('popstate', () => {
  if (!state.loaded || revealHashRoute()) return;
  restoreHistoryView();
  render();
});
})();
