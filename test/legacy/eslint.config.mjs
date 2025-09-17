import {eslintConfigScratch} from '../../lib/index.mjs';

const config = eslintConfigScratch.defineConfig(
    {
        files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
        extends: [
            eslintConfigScratch.legacy.base,
            eslintConfigScratch.legacy.react
        ]
    }
);

export default config;
