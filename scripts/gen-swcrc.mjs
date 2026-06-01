import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rel = (path) => relative(root, path).replace(/\\/g, '/');

const scriptRel = rel(fileURLToPath(import.meta.url));
const tsconfigPath = join(root, 'tsconfig.json');
const tsconfigRel = rel(tsconfigPath);
const swcrcPath = join(root, '.swcrc');
const swcrcRel = rel(swcrcPath);

const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
const paths = tsconfig.compilerOptions?.paths ?? {};
const target = tsconfig.compilerOptions?.target?.toLowerCase();

const swcPaths = Object.fromEntries(
    Object.entries(paths).map(([key, targets]) => [
        key,
        targets.map((entry) => entry.replace(/^\.\//, '')),
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

writeFileSync(swcrcPath, `${JSON.stringify(swcrc, null, 4)}\n`);

console.log(
    `> Wrote ${swcrcRel} (generated).
> To change the SWC config, edit ${tsconfigRel} or ${scriptRel}.
> Run the \`prepare\` package script again to regenerate this file.`,
);
