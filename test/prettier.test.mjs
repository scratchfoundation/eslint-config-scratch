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
const format = (source) => prettier.format(source, { ...prettierConfigScratch.recommended, filepath: 'x.mjs' })

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
