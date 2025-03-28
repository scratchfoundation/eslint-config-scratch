import globals from 'globals'

import { makeConfig } from './shared/makeConfig.mjs'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...makeConfig({ enableReact: true }),
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
]
