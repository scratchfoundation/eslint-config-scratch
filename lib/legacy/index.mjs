import jsdoc from 'eslint-plugin-jsdoc'
import react from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig(
  ...compat.extends('eslint:recommended'),
  jsdoc.configs['flat/recommended'],
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  {
    languageOptions: {
      globals: {
        ...globals.commonjs,
      },

      ecmaVersion: 6,
      sourceType: 'script',

      parserOptions: {
        requireConfigFile: false,
      },
    },

    plugins: {
      react,
    },

    rules: {
      'array-callback-return': [2],
      'block-scoped-var': [2],
      curly: [2, 'multi-line'],
      'dot-location': [2, 'property'],
      'dot-notation': [2],
      eqeqeq: [2],
      'no-alert': [2],
      'no-div-regex': [2],
      'no-else-return': [2],
      'no-eq-null': [2],
      'no-eval': [2],
      'no-extend-native': [2],
      'no-extra-bind': [2],
      'no-global-assign': [2],
      'no-implied-eval': [2],

      'no-invalid-this': ['off'], // use the TS version instead
      '@typescript-eslint/no-invalid-this': ['error'],

      'no-iterator': [2],
      'no-lone-blocks': [2],

      'no-loop-func': ['off'], // use the TS version instead
      '@typescript-eslint/no-loop-func': ['error'],

      'no-multi-spaces': [2],
      'no-multi-str': [2],
      'no-new': [2],
      'no-proto': [2],
      'no-return-assign': [2],
      'no-script-url': [2],
      'no-self-compare': [2],
      'no-sequences': [2],
      'no-throw-literal': [2],
      'no-unmodified-loop-condition': [2],

      'no-unused-expressions': ['off'], // use the TS version instead
      '@typescript-eslint/no-unused-expressions': ['error'],

      'no-useless-call': [2],
      'no-useless-concat': [2],
      'no-useless-escape': [2],
      'no-warning-comments': [0],
      'no-with': [2],
      radix: [2],
      'wrap-iife': [2],
      yoda: [2],

      'no-unused-vars': ['off'], // use the TS version instead
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          args: 'after-used',
          varsIgnorePattern: '^_',
        },
      ],

      'no-catch-shadow': [2],

      'no-shadow': ['off'], // use the TS version instead
      '@typescript-eslint/no-shadow': ['error'],

      'no-undefined': [2],

      'no-use-before-define': ['off'], // use the TS version instead
      '@typescript-eslint/no-use-before-define': ['error'],

      strict: [2, 'never'],
      'array-bracket-spacing': [2, 'never'],
      'block-spacing': [2, 'always'],
      'brace-style': [2],

      camelcase: [
        2,
        {
          properties: 'never',
        },
      ],

      'comma-dangle': [2, 'never'],
      'comma-spacing': [2],
      'comma-style': [2],
      'eol-last': [2, 'always'],
      'func-call-spacing': [2, 'never'],
      'func-style': [2, 'expression'],
      indent: [2, 4],
      'jsx-quotes': [2, 'prefer-double'],

      'key-spacing': [
        2,
        {
          beforeColon: false,
          afterColon: true,
          mode: 'strict',
        },
      ],

      'keyword-spacing': [
        2,
        {
          before: true,
          after: true,
        },
      ],

      'linebreak-style': [2, 'unix'],

      'max-len': [
        2,
        {
          code: 120,
          tabWidth: 4,
          ignoreUrls: true,
        },
      ],

      'new-parens': [2],
      'newline-per-chained-call': [2],
      'no-lonely-if': [2],
      'no-mixed-operators': [2],

      'no-multiple-empty-lines': [
        2,
        {
          max: 2,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],

      'no-negated-condition': [2],
      'no-tabs': [2],

      'no-trailing-spaces': [
        2,
        {
          skipBlankLines: true,
        },
      ],

      'no-unneeded-ternary': [2],
      'object-curly-spacing': [2],

      'object-property-newline': [
        2,
        {
          allowMultiplePropertiesPerLine: true,
        },
      ],

      'one-var': [2, 'never'],
      'operator-linebreak': [2, 'after'],
      'quote-props': [2, 'consistent-as-needed'],

      quotes: [
        2,
        'single',
        {
          allowTemplateLiterals: true,
          avoidEscape: true,
        },
      ],

      semi: [2, 'always'],
      'semi-spacing': [2],
      'space-before-function-paren': [2, 'always'],
      'space-in-parens': [2],
      'space-infix-ops': [2],
      'space-unary-ops': [2],
      'spaced-comment': [2],

      'react/jsx-filename-extension': [
        'error',
        {
          allow: 'as-needed',
          extensions: ['.jsx', '.tsx'],
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'dot-notation': ['off'], // use the TS version instead
      '@typescript-eslint/dot-notation': ['error'],

      'no-implied-eval': ['off'], // use the TS version instead
      '@typescript-eslint/no-implied-eval': ['error'],
    },
  },
)
