import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  tseslint.configs.base,
  {
    languageOptions: {
      globals: {},
      ecmaVersion: 2018,
      sourceType: 'script',
    },

    rules: {
      'arrow-body-style': [2, 'as-needed'],
      'arrow-parens': [2, 'as-needed'],

      'arrow-spacing': [
        2,
        {
          before: true,
          after: true,
        },
      ],

      'no-prototype-builtins': [2],
      'no-confusing-arrow': [2],
      'no-duplicate-imports': [2],
      'no-return-await': [2],
      'no-template-curly-in-string': [2],
      'no-useless-computed-key': [2],

      'no-useless-constructor': ['off'], // use the TS version instead
      '@typescript-eslint/no-useless-constructor': ['error'],

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
      'rest-spread-spacing': [2, 'never'],
      'symbol-description': [2],
      'template-curly-spacing': [2, 'never'],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'prefer-promise-reject-errors': ['off'], // use the TS version instead
      '@typescript-eslint/prefer-promise-reject-errors': ['error'],

      'require-await': ['off'], // use the TS version instead
      '@typescript-eslint/require-await': ['error'],

      'no-return-await': ['off'], // use the TS version instead
      '@typescript-eslint/return-await': ['error'],
    },
  },
)
