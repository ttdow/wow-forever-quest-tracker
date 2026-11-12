(async () => {
'use strict';
const $ = selector => document.querySelector(selector);
const state = { quests: [], forwardLinks: new Map(), completed: new Set(), expanded: new Set(), zone: 'Teldrassil', view: 'quests', storageReady: false, loaded: false };
const rows = $('#quests');
let saveTimer;

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

function dropsHash(zone) {
  return `#${new URLSearchParams({ zone, view: 'drops' })}`;
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
  if (params.get('view') === 'drops' && isDungeon(params.get('zone'))) {
    state.zone = params.get('zone');
    state.view = 'drops';
    history.replaceState({ zone: state.zone, view: 'drops' }, '', location.href);
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
  document.querySelectorAll('[data-zone]').forEach(button => {
    const quests = state.quests.filter(quest => quest.zone === button.dataset.zone);
    button.setAttribute('aria-pressed', String(button.dataset.zone === state.zone));
    button.querySelector('span').textContent = `${quests.filter(quest => state.completed.has(quest.id)).length}/${quests.length}`;
  });

  const dungeon = isDungeon(state.zone);
  if (!dungeon) state.view = 'quests';
  $('#views').hidden = !dungeon;
  document.querySelectorAll('[data-view]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
  });
  $('#quest-panel').hidden = state.view === 'drops';
  $('.progress-block').hidden = state.view === 'drops';
  if (state.view === 'drops') {
    globalThis.DungeonDrops.show(state.zone);
    return;
  }
  globalThis.DungeonDrops?.hide();

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

$('#zones').addEventListener('click', event => {
  const button = event.target.closest('button[data-zone]');
  if (button) {
    state.zone = button.dataset.zone;
    if (!isDungeon(state.zone)) state.view = 'quests';
    history.pushState({ zone: state.zone, view: state.view }, '', state.view === 'drops' ? dropsHash(state.zone) : location.pathname + location.search);
    render();
  }
});
$('#views').addEventListener('click', event => {
  const button = event.target.closest('button[data-view]');
  if (!button || !isDungeon(state.zone) || !['quests', 'drops'].includes(button.dataset.view)) return;
  state.view = button.dataset.view;
  history.pushState({ zone: state.zone, view: state.view }, '', state.view === 'drops' ? dropsHash(state.zone) : location.pathname + location.search);
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
    if (state.quests.some(quest => quest.zone === history.state?.zone)) state.zone = history.state.zone;
    state.view = history.state?.view === 'drops' && isDungeon(state.zone) ? 'drops' : 'quests';
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
  if (state.quests.some(quest => quest.zone === history.state?.zone)) state.zone = history.state.zone;
  state.view = history.state?.view === 'drops' && isDungeon(state.zone) ? 'drops' : 'quests';
  render();
});
})();
