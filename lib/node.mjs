import globals from 'globals'

import { makeConfig } from './shared/makeConfig.mjs'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...makeConfig(),
  {
    languageOptions: {
      globals: globals.node,
    },
  },
]
