import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadQuests, parseCSV, sources } from './quests.mjs';
import { runInNewContext } from 'node:vm';

const directory = dirname(fileURLToPath(import.meta.url));

test('CSV parser preserves quoted commas, escaped quotes, multiline cells, BOM, and blank lines', () => {
  assert.deepEqual(parseCSV('\uFEFFName,Description\r\n"A, B","Say ""hello""\nand return"\r\n\r\nC,Last'), [
    { Name: 'A, B', Description: 'Say "hello"\nand return' },
    { Name: 'C', Description: 'Last' },
  ]);
  assert.throws(() => parseCSV('A,B\n"unfinished,x'), /Unclosed/);
  assert.throws(() => parseCSV('A,B\nx,y,z'), /column count/);
});

test('every source quest and requested field is preserved, with separate coordinates', () => {
  const quests = loadQuests(directory);
  assert.equal(quests.length, 225);
  assert.deepEqual(Object.fromEntries(sources.map(([zone]) => [zone, quests.filter(quest => quest.zone === zone).length])), {
    Teldrassil: 76, Darkshore: 74, Ashenvale: 75,
  });
  for (const [zone, filename] of sources) {
    for (const source of parseCSV(readFileSync(join(directory, filename), 'utf8'))) {
      const quest = quests.find(item => item.zone === zone && item.id === source['Quest ID']);
      assert.ok(quest);
      assert.equal(quest.name, source['Quest Name']);
      assert.equal(quest.level, Number(source['Quest Level']));
      assert.equal(quest.area, source['Pickup Sub-area']);
      assert.equal(quest.objective, source['Objective / Destination']);
      assert.equal(quest.stage, source['Quest Stage / Distinction']);
    }
  }
  const buzzbox = quests.find(quest => quest.id === '983');
  assert.equal(buzzbox.giver, 'Wizbang Cranktoggle');
  assert.equal(buzzbox.coordinates, '37.0, 44.1');
  const poster = quests.find(quest => quest.giver === 'Wanted poster' && quest.coordinates === '37.2, 44.2');
  assert.ok(poster);
  assert.ok(quests.some(quest => quest.giver.includes('turn in to Aldia') && quest.coordinates === '55.4, 57.2'));
  assert.ok(quests.some(quest => quest.coordinates === ''));
  assert.ok(quests.some(quest => quest.level === 0));
});

const progressScript = readFileSync(join(directory, 'progress.js'), 'utf8');
const bundledScript = readFileSync(join(directory, 'quests-data.js'), 'utf8');
function browser(storage = new Map(), pathname = '/wow-forever-quest-tracker/') {
  const context = {
    location: { pathname },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
  };
  runInNewContext(bundledScript + '\n' + progressScript, context);
  return context;
}

test('the checked-in quest bundle exactly matches all source CSVs', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(browser().QUESTS_DATA)), loadQuests(directory));
});

test('completion and undo survive a fresh browser context', () => {
  const storage = new Map();
  let page = browser(storage);
  assert.deepEqual([...page.QuestProgress.load()], []);
  page.QuestProgress.save(new Set(['983', '3118']));
  page = browser(storage, '/wow-forever-quest-tracker/index.html');
  assert.deepEqual([...page.QuestProgress.load()].sort(), ['3118', '983']);
  const next = page.QuestProgress.load();
  next.delete('983');
  page.QuestProgress.save(next);
  assert.deepEqual([...browser(storage).QuestProgress.load()], ['3118']);
  assert.deepEqual([...browser(storage, '/a-different-site/').QuestProgress.load()], []);
  assert.deepEqual([...browser().QuestProgress.load()], []);
});

test('invalid or inaccessible storage is reported without overwriting saved data', () => {
  const storage = new Map();
  const page = browser(storage);
  for (const raw of ['{', 'null', '{}', '[983]', '["not-an-id"]']) {
    storage.set(page.QuestProgress.key, raw);
    assert.throws(() => page.QuestProgress.load());
    assert.equal(storage.get(page.QuestProgress.key), raw);
  }
  storage.set(page.QuestProgress.key, '["983","999999999"]');
  assert.deepEqual([...page.QuestProgress.load()], ['983']);
  page.localStorage.setItem = () => { throw new Error('Storage blocked'); };
  assert.throws(() => page.QuestProgress.save(new Set(['3118'])), /Storage blocked/);
  assert.equal(storage.get(page.QuestProgress.key), '["983","999999999"]');
  page.localStorage.getItem = () => { throw new Error('Storage blocked'); };
  assert.throws(() => page.QuestProgress.load(), /Storage blocked/);
});

test('static entry point uses existing relative assets and needs no backend', () => {
  const html = readFileSync(join(directory, 'index.html'), 'utf8');
  for (const [, filename] of html.matchAll(/(?:src|href)="(\.\/[^\"]+)"/g)) {
    assert.ok(readFileSync(join(directory, filename)).length);
    assert.equal(new URL(filename, 'https://example.github.io/tracker/').pathname, '/tracker/' + filename.slice(2));
  }
  for (const filename of ['app.js', 'progress.js', 'quests-data.js']) {
    const script = readFileSync(join(directory, filename), 'utf8');
    assert.doesNotMatch(script, /\bfetch\s*\(|\/api\/|\bimport\s/);
  }
  assert.doesNotMatch(html, /type="module"/);
});
