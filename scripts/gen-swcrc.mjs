import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsconfig = JSON.parse(readFileSync(join(root, 'tsconfig.json'), 'utf8'));
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

writeFileSync(join(root, '.swcrc'), `${JSON.stringify(swcrc, null, 4)}\n`);
