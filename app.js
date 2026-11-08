(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const state = { quests: [], completed: new Set(), expanded: new Set(), zone: 'Teldrassil', storageReady: false, loaded: false };
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
    toggle.addEventListener('click', () => {
      if (state.expanded.has(rowKey)) state.expanded.delete(rowKey);
      else state.expanded.add(rowKey);
      row.classList.toggle('expanded', state.expanded.has(rowKey));
      toggle.setAttribute('aria-expanded', String(state.expanded.has(rowKey)));
    });
    const label = document.createElement('span');
    label.className = 'quest-label';
    toggle.title = [quest.name, quest.stage].filter(Boolean).join(' · ');
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
  if (button) { state.zone = button.dataset.zone; render(); }
});
$('#search').addEventListener('input', render);
$('#status').addEventListener('change', render);
$('#sort').addEventListener('change', render);

try {
  if (!Array.isArray(globalThis.QUESTS_DATA)) throw new Error('Quest data missing');
  state.quests = globalThis.QUESTS_DATA;
  state.loaded = true;
  try {
    state.completed = QuestProgress.load();
    state.storageReady = true;
  } catch {
    $('#save-state').textContent = 'Progress unavailable';
    $('#error').textContent = 'Could not read saved progress. Your saved data has not been changed. Allow browser storage for this site and reload.';
    $('#error').hidden = false;
  }
  render();
} catch {
  $('#progress-text').textContent = 'Quests unavailable';
  $('#save-state').textContent = '';
  $('#error').textContent = 'Could not load quests. Reload the page and check that all site files are present.';
  $('#error').hidden = false;
}

window.addEventListener('storage', event => {
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
})();
