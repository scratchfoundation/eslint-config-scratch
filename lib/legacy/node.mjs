import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  tseslint.configs.base,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      'global-require': [2],
      'handle-callback-err': [2],
      'no-mixed-requires': [2],
      'no-new-require': [2],
      'no-path-concat': [2],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
]
