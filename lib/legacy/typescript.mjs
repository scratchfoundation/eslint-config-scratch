import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(tseslint.configs.base, {
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': ['error'],

    // Replace core rules with TS equivalents
    'dot-notation': ['off'],
    '@typescript-eslint/dot-notation': ['error'],

    'no-implied-eval': ['off'],
    '@typescript-eslint/no-implied-eval': ['error'],

    'no-invalid-this': ['off'],
    '@typescript-eslint/no-invalid-this': ['error'],

    'no-loop-func': ['off'],
    '@typescript-eslint/no-loop-func': ['error'],

    'no-redeclare': ['off'],
    '@typescript-eslint/no-redeclare': ['error'],

    'no-return-await': ['off'],
    '@typescript-eslint/return-await': ['error'],

    'no-shadow': ['off'],
    '@typescript-eslint/no-shadow': ['error'],

    'no-unused-expressions': ['off'],
    '@typescript-eslint/no-unused-expressions': ['error'],

    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        args: 'after-used',
        varsIgnorePattern: '^_',
      },
    ],

    'no-use-before-define': ['off'],
    '@typescript-eslint/no-use-before-define': ['error'],

    'no-useless-constructor': ['off'],
    '@typescript-eslint/no-useless-constructor': ['error'],

    'prefer-promise-reject-errors': ['off'],
    '@typescript-eslint/prefer-promise-reject-errors': ['error'],

    'require-await': ['off'],
    '@typescript-eslint/require-await': ['error'],
  },
})
