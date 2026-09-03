import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

interface Tsconfig {
  compilerOptions?: {
    paths?: Record<string, string[]>;
    target?: string;
  };
}

const isTsconfig = (value: unknown): value is Tsconfig =>
  typeof value === 'object' && value !== null;

const root = join(import.meta.dirname, '..');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');

const scriptRel = rel(import.meta.filename);
const tsconfigPath = join(root, 'tsconfig.json');
const tsconfigRel = rel(tsconfigPath);
const swcrcPath = join(root, '.swcrc');
const swcrcRel = rel(swcrcPath);

const parsed: unknown = JSON.parse(readFileSync(tsconfigPath, 'utf8'));

if (!isTsconfig(parsed)) throw new Error(`Unexpected ${tsconfigRel} shape.`);

const paths = parsed.compilerOptions?.paths ?? {};
const target = parsed.compilerOptions?.target?.toLowerCase();

const swcPaths = Object.fromEntries(
  Object.entries(paths).map(([key, targets]) => [
    key,
    targets.map((entry) => entry.replace(/^\.\//u, '')),
  ]),
);

const swcrc = {
  $schema: 'https://swc.rs/schema.json',
  jsc: {
    target,
    baseUrl: './',
    ...(Object.keys(swcPaths).length > 0 && { paths: swcPaths }),
  },
};

writeFileSync(swcrcPath, `${JSON.stringify(swcrc, null, 2)}\n`);

console.log(
  `> Wrote ${swcrcRel} (generated).
> To change the SWC config, edit ${tsconfigRel} or ${scriptRel}.
> Run the \`prepare\` package script again to regenerate this file.`,
);
