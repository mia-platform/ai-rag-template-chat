import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getISODateStringFrom(aJSDate) {
  return aJSDate.toISOString().split('T')[0];
}

function getNewContentForCHANGELOG({ aSemVerString, anISODateString }) {
  return `[Unreleased]\n\n## [${aSemVerString}] ${anISODateString}`;
}

const CHANGELOG_PATH = path.join(__dirname, '../CHANGELOG.md');

let changelog = readFileSync(CHANGELOG_PATH, { encoding: 'utf-8' });

changelog = changelog.replace('[Unreleased]', getNewContentForCHANGELOG({
  aSemVerString: process.argv[2],
  anISODateString: getISODateStringFrom(new Date())
}));

writeFileSync(CHANGELOG_PATH, changelog);
