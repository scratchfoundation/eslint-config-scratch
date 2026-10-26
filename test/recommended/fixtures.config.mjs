import { eslintConfigScratch } from '../../lib/index.mjs'

const config = eslintConfigScratch.defineConfig(eslintConfigScratch.recommended, {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
})

export default config
