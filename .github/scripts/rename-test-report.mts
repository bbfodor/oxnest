import { readFileSync, writeFileSync } from 'node:fs';

const HEADING = '## Vitest Test Report';

const title = process.argv[2];
const path = process.env.GITHUB_STEP_SUMMARY ?? '';

if (!title || !path) process.exit(0);

const content = readFileSync(path, 'utf8');
const at = content.lastIndexOf(HEADING);

if (at === -1) process.exit(0);

writeFileSync(path, `${content.slice(0, at)}## ${title}${content.slice(at + HEADING.length)}`);
