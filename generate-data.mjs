// Optional maintenance tool. The published app does not need Node.js or a build.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadQuests } from './quests.mjs';

const directory = dirname(fileURLToPath(import.meta.url));
const quests = loadQuests(directory);
writeFileSync(join(directory, 'quests-data.js'), '// Generated from the three source CSV files.\n' +
  `globalThis.QUESTS_DATA = ${JSON.stringify(quests, null, 2)};\n`, 'utf8');
console.log(`Bundled ${quests.length} quests.`);
