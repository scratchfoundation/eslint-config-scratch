// Type-checked by `npm run test:types`. Uses the package the way a consumer would, through its `exports` map.
import type { Linter } from 'eslint'
import { eslintConfigScratch, prettierConfigScratch } from 'eslint-config-scratch'
import type { Config as PrettierConfig } from 'prettier'

export const eslintConfig: Linter.Config[] = eslintConfigScratch.defineConfig(
  eslintConfigScratch.recommended,
  eslintConfigScratch.legacy.react,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: '/path/to/project',
      },
    },
  },
)

// Every exported config, so that a missing declaration fails the type check. `test/api.test.mjs` checks the same
// names at runtime.
export const allConfigs: Linter.Config[][] = [
  eslintConfigScratch.recommended,
  eslintConfigScratch.recommendedTypeFree,
  eslintConfigScratch.recommendedTypeChecked,
  eslintConfigScratch.miscFileRules,
  eslintConfigScratch.legacy.base,
  eslintConfigScratch.legacy.es6,
  eslintConfigScratch.legacy.node,
  eslintConfigScratch.legacy.react,
  eslintConfigScratch.legacy.typescript,
]

export const prettierConfig: PrettierConfig = prettierConfigScratch.recommended

// @ts-expect-error Only the exported configs are part of the API.
export const missing: unknown = eslintConfigScratch.notAConfig
