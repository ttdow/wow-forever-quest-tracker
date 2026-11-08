(() => {
'use strict';
const sources = [
  ['Teldrassil', 'wow_forever_teldrassil_quests_full_with_ids.csv'],
  ['Darkshore', 'Quests - Darkshore.csv'],
  ['Ashenvale', 'wow_forever_ashenvale_quests_with_ids.csv'],
];

// Handles quoted commas, escaped quotation marks, and multiline CSV fields.
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(field); field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      if (row.some(value => value.trim())) rows.push(row);
      row = []; field = '';
    } else field += char;
  }
  if (quoted) throw new Error('Unclosed quotation mark in CSV.');
  row.push(field);
  if (row.some(value => value.trim())) rows.push(row);
  const headers = rows.shift() || [];
  return rows.map(values => {
    if (values.length !== headers.length) throw new Error('CSV column count does not match its header.');
    return Object.fromEntries(headers.map((header, i) => [header.trim(), values[i].trim()]));
  });
}

async function loadQuests() {
  const groups = await Promise.all(sources.map(async ([zone, filename]) => {
    const response = await fetch(`./data/${encodeURIComponent(filename)}`);
    if (!response.ok) throw new Error(`Could not load ${filename}.`);
    const rows = parseCSV(await response.text());
    return rows.map(row => {
      const giver = row['Quest Giver / Start'];
      // Leave qualifiers in place: e.g. coordinates belonging to a turn-in NPC.
      const coordinateMatch = giver.match(/\(?\b(\d{1,2}(?:\.\d+)?)\s*,\s*(\d{1,2}(?:\.\d+)?)\)?/);
      const coordinates = coordinateMatch ? `${coordinateMatch[1]}, ${coordinateMatch[2]}` : '';
      const cleanGiver = coordinateMatch
        ? giver.replace(coordinateMatch[0], '').replace(/\s+at\s*$/, '').trim()
        : giver;
      const id = row['Quest ID'];
      const level = Number(row['Quest Level']);
      if (!/^\d+$/.test(id) || !Number.isFinite(level) || !row['Quest Name']) {
        throw new Error(`Invalid quest in ${filename}.`);
      }
      return {
        id, zone, level, name: row['Quest Name'],
        stage: row['Quest Stage / Distinction'],
        giver: cleanGiver, coordinates, area: row['Pickup Sub-area'],
        objective: row['Objective / Destination'],
      };
    });
  }));
  return groups.flat();
}

globalThis.QuestData = Object.freeze({ load: loadQuests });
})();
