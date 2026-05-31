import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    oxc: false,
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        swc.vite({
            module: { type: 'es6' },
        }),
    ],
    test: {
        globals: true,
        root: './',
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    include: ['test/**/*.test.ts'],
                },
            },
            {
                extends: true,
                test: {
                    name: 'e2e',
                    include: ['test/**/*.test.e2e.ts'],
                },
            },
        ],
    },
});
