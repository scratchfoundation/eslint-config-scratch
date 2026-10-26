import { expect, test } from 'vitest'
import * as api from '../lib/index.mjs'

// The public API, as declared in `lib/index.d.mts`. Changing it is a breaking change; update both together.

test('top-level exports', () => {
  expect(Object.keys(api).sort()).toEqual(['eslintConfigScratch', 'prettierConfigScratch'])
})

test('eslintConfigScratch', () => {
  expect(Object.keys(api.eslintConfigScratch).sort()).toEqual([
    'defineConfig',
    'legacy',
    'miscFileRules',
    'recommended',
    'recommendedTypeChecked',
    'recommendedTypeFree',
  ])
  expect(Object.keys(api.eslintConfigScratch.legacy).sort()).toEqual(['base', 'es6', 'node', 'react', 'typescript'])
})

test('prettierConfigScratch', () => {
  expect(Object.keys(api.prettierConfigScratch).sort()).toEqual(['recommended'])
})
