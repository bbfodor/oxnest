import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
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
