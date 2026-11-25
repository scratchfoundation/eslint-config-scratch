import * as prettier from 'prettier'
import { expect, test } from 'vitest'
// Import the Prettier config directly: `lib/index.mjs` also loads the ESLint plugins, and eslint-plugin-html warns when
// it's loaded without ESLint.
import * as prettierConfigScratch from '../lib/prettier.mjs'

/**
 * Format JavaScript source with the recommended Prettier configuration.
 * @param {string} source - the code to format
 * @returns {Promise<string>} the formatted code
 */
const format = (source) =>
  prettier.format(source, {
    ...prettierConfigScratch.recommended,
    filepath: 'x.mjs',
  })

test("wraps at Prettier's default width", async () => {
  const source =
    "export const greeting = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta']\n"
  expect(source.length).toBeGreaterThan(80)
  expect(await format(source)).toBe(
    "export const greeting = [\n  'alpha',\n  'beta',\n  'gamma',\n  'delta',\n  'epsilon',\n  'zeta',\n  'eta',\n  'theta',\n]\n",
  )
})

test('sorts imports: node built-ins, then packages, then relative paths', async () => {
  const source =
    "import b from './b.mjs'\nimport a from 'alpha'\nimport path from 'node:path'\n\nexport { a, b, path }\n"
  expect(await format(source)).toBe(
    "import path from 'node:path'\nimport a from 'alpha'\nimport b from './b.mjs'\n\nexport { a, b, path }\n",
  )
})

test('leaves side-effect imports where they are', async () => {
  const source =
    "import z from 'zeta'\nimport './reset.css'\nimport b from 'beta'\nimport a from 'alpha'\n\nexport { a, b, z }\n"
  expect(await format(source)).toBe(
    "import z from 'zeta'\nimport './reset.css'\nimport a from 'alpha'\nimport b from 'beta'\n\nexport { a, b, z }\n",
  )
})
