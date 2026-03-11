import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import jsdoc from 'eslint-plugin-jsdoc'
import react from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig(...compat.extends('eslint:recommended'), jsdoc.configs['flat/recommended'], {
  languageOptions: {
    globals: {
      ...globals.commonjs,
    },

    parserOptions: {
      requireConfigFile: false,
    },
  },

  linterOptions: {
    reportUnusedDisableDirectives: 'warn',
  },

  plugins: {
    react,
    '@stylistic': stylistic,
  },

  rules: {
    // Logic / correctness rules (core ESLint)
    'array-callback-return': [2],
    'block-scoped-var': [2],
    curly: [2, 'multi-line'],
    'dot-notation': [2],
    eqeqeq: [2],
    'func-style': [2, 'expression'],
    'no-alert': [2],
    'no-div-regex': [2],
    'no-else-return': [2],
    'no-eq-null': [2],
    'no-eval': [2],
    'no-extend-native': [2],
    'no-extra-bind': [2],
    'no-global-assign': [2],
    'no-implied-eval': [2],
    'no-invalid-this': [2],
    'no-iterator': [2],
    'no-lone-blocks': [2],
    'no-loop-func': [2],
    'no-lonely-if': [2],
    'no-multi-str': [2],
    'no-negated-condition': [2],
    'no-new': [2],
    'no-proto': [2],
    'no-return-assign': [2],
    'no-script-url': [2],
    'no-self-compare': [2],
    'no-sequences': [2],
    'no-shadow': [2],
    'no-throw-literal': [2],
    'no-undefined': [2],
    'no-unmodified-loop-condition': [2],
    'no-unneeded-ternary': [2],
    'no-unused-expressions': [2],
    'no-use-before-define': [2],
    'no-useless-call': [2],
    'no-useless-concat': [2],
    'no-useless-escape': [2],
    'no-with': [2],
    'one-var': [2, 'never'],
    radix: [2],
    strict: [2, 'never'],
    yoda: [2],

    'no-unused-vars': [
      2,
      {
        args: 'after-used',
        varsIgnorePattern: '^_',
      },
    ],

    camelcase: [
      2,
      {
        properties: 'never',
      },
    ],

    // Formatting / stylistic rules (@stylistic/eslint-plugin)
    '@stylistic/array-bracket-spacing': [2, 'never'],
    '@stylistic/block-spacing': [2, 'always'],
    '@stylistic/brace-style': [2],
    '@stylistic/comma-dangle': [2, 'never'],
    '@stylistic/comma-spacing': [2],
    '@stylistic/comma-style': [2],
    '@stylistic/dot-location': [2, 'property'],
    '@stylistic/eol-last': [2, 'always'],
    '@stylistic/function-call-spacing': [2, 'never'],
    '@stylistic/indent': [2, 4, { SwitchCase: 0 }],
    '@stylistic/jsx-quotes': [2, 'prefer-double'],

    '@stylistic/key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],

    '@stylistic/keyword-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],

    '@stylistic/linebreak-style': [2, 'unix'],

    '@stylistic/max-len': [
      2,
      {
        code: 120,
        tabWidth: 4,
        ignoreUrls: true,
      },
    ],

    '@stylistic/new-parens': [2],
    '@stylistic/newline-per-chained-call': [2],
    '@stylistic/no-mixed-operators': [2],
    '@stylistic/no-multi-spaces': [2],

    '@stylistic/no-multiple-empty-lines': [
      2,
      {
        max: 2,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],

    '@stylistic/no-tabs': [2],

    '@stylistic/no-trailing-spaces': [
      2,
      {
        skipBlankLines: true,
      },
    ],

    '@stylistic/object-curly-spacing': [2],

    '@stylistic/object-property-newline': [
      2,
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],

    '@stylistic/operator-linebreak': [2, 'after'],
    '@stylistic/quote-props': [2, 'consistent-as-needed'],

    '@stylistic/quotes': [
      2,
      'single',
      {
        allowTemplateLiterals: 'always',
        avoidEscape: true,
      },
    ],

    '@stylistic/semi': [2, 'always'],
    '@stylistic/semi-spacing': [2],
    '@stylistic/space-before-function-paren': [2, 'always'],
    '@stylistic/space-in-parens': [2],
    '@stylistic/space-infix-ops': [2],
    '@stylistic/space-unary-ops': [2],
    '@stylistic/spaced-comment': [2],
    '@stylistic/wrap-iife': [2],

    'react/jsx-filename-extension': [
      'error',
      {
        allow: 'always', // TODO: use 'as-needed' for non-legacy code
        extensions: ['.jsx', '.tsx'],
      },
    ],
  },
})
