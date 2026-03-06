import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig({
  languageOptions: {
    globals: globals.browser,
  },
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // Logic / correctness rules (core ESLint)
    'arrow-body-style': [2, 'as-needed'],
    'no-console': ['error'],
    'no-duplicate-imports': [2],
    'no-prototype-builtins': [2],
    'no-template-curly-in-string': [2],
    'no-useless-computed-key': [2],
    'no-useless-constructor': [2],
    'no-useless-rename': [2],
    'no-var': [2],
    'prefer-arrow-callback': [2],

    'prefer-const': [
      2,
      {
        destructuring: 'all',
      },
    ],

    'prefer-promise-reject-errors': [2],
    'prefer-rest-params': [2],
    'prefer-spread': [2],
    'prefer-template': [2],
    'require-atomic-updates': [2],
    'require-await': [2],
    'symbol-description': [2],

    // Formatting / stylistic rules (@stylistic/eslint-plugin)
    '@stylistic/arrow-parens': [2, 'as-needed'],

    '@stylistic/arrow-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],

    '@stylistic/no-confusing-arrow': [2],
    '@stylistic/rest-spread-spacing': [2, 'never'],
    '@stylistic/template-curly-spacing': [2, 'never'],
  },
})
