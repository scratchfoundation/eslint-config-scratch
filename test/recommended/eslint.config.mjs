import { eslintConfigScratch } from '../../lib/index.mjs'

const config = eslintConfigScratch.config(eslintConfigScratch.recommended, {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
      project: ['./tsconfig.json'],
    },
  },
})

export default config
