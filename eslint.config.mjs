import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import { eslintConfigScratch } from './lib/index.mjs'

export default eslintConfigScratch.defineConfig(
  eslintConfigScratch.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  globalIgnores(['test/**/*.bad.*']),
)
