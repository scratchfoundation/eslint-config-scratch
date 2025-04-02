import eslintConfigPrettier from 'eslint-config-prettier/flat'
import formatjs from 'eslint-plugin-formatjs'
import html from 'eslint-plugin-html'
import htmlSettings from 'eslint-plugin-html/src/settings.js'
import importPlugin from 'eslint-plugin-import'
import jsdoc from 'eslint-plugin-jsdoc'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import markdown from 'eslint-plugin-markdown'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import eslint from '@eslint/js'
import legacyES6 from './legacy/es6.mjs'
import legacyBase from './legacy/index.mjs'
import legacyNode from './legacy/node.mjs'
import legacyReact from './legacy/react.mjs'

const legacy = {
  base: legacyBase,
  es6: legacyES6,
  node: legacyNode,
  react: legacyReact,
}

// See https://www.npmjs.com/package/eslint-plugin-html#user-content-settings
const htmlExtensions = htmlSettings.getSettings({}).htmlExtensions

// '.html' => '**/*.html'
const htmlGlobs = htmlExtensions.map(ext => `**/*${ext}`)

const typeScriptExtensions = ['.ts', '.tsx', '.mts', '.cts']

/**
 * Base rules recommended when type information is not available.
 * These rules are also safe to use when type information is available.
 */
const typeFreeRules = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,

  // eslint-plugin-formatjs
  {
    plugins: {
      formatjs,
    },
    rules: {
      'formatjs/no-offset': ['error'],
    },
  },
  // eslint-plugin-html
  {
    files: htmlGlobs,
    plugins: { html },
    settings: {
      'html/html-extensions': htmlExtensions,
    },
  },
  // eslint-plugin-import
  {
    plugins: importPlugin.flatConfigs.recommended.plugins,
    rules: {
      'import/no-duplicates': 'error', // Forbid duplicate imports
    },
  },
  // eslint-plugin-jsdoc
  jsdoc.configs['flat/recommended-error'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    extends: [jsdoc.configs['flat/recommended-typescript-error']],
  },
  {
    rules: {
      // If JSDoc comments are present, they must be informative (non-trivial).
      // For example, the description "The foo." on a variable called "foo" is not informative.
      // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/informative-docs.md
      'jsdoc/informative-docs': ['error'],

      // Don't require JSDoc comments. Library authors should consider turning this on for external interfaces.
      // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md
      'jsdoc/require-jsdoc': ['off'],
    },
  },
  // eslint-plugin-jsx-a11y
  jsxA11y.flatConfigs.recommended,
  // eslint-plugin-markdown
  markdown.configs.recommended,
  // eslint-plugin-react
  {
    plugins: {
      react,
    },
    rules: {
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md
      'react/no-danger': ['error'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
      'react/self-closing-comp': ['error'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
      'react/jsx-boolean-value': ['error', 'never'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
      'react/jsx-curly-spacing': ['error'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
      'react/jsx-equals-spacing': ['error'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
      'react/jsx-first-prop-new-line': ['error', 'multiline'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
      'react/jsx-handler-names': ['error', { checkLocalVariables: true, eventHandlerPrefix: false }],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
      'react/jsx-indent': ['error'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
      'react/jsx-no-bind': ['error', { ignoreRefs: true, allowArrowFunctions: true }],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
      'react/jsx-pascal-case': ['error'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
      'react/jsx-tag-spacing': ['error'],

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
      'react/jsx-wrap-multilines': ['error'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // eslint-plugin-react-hooks
  {
    extends: [reactHooks.configs['recommended-latest']],
    rules: {
      // https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md#advanced-configuration
      'react-hooks/exhaustive-deps': ['error', { additionalHooks: '^useAsync$' }],
    },
  },
  // typescript-eslint
  {
    rules: {
      // https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing/
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],

      // https://typescript-eslint.io/rules/no-useless-constructor/
      '@typescript-eslint/no-useless-constructor': ['error'],

      // https://typescript-eslint.io/rules/no-non-null-assertion
      '@typescript-eslint/no-non-null-assertion': ['error'],
    },
  },
  // @eslint-community/eslint-plugin-eslint-comments
  {
    extends: [
      // @ts-expect-error This plugin's recommended rules don't quite match the type `tseslint.config` expects.
      eslintComments.recommended,
    ],
    rules: {
      // require a description for eslint control comments other than `eslint-enable`
      '@eslint-community/eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],
    },
  },
  // @eslint/js
  {
    rules: {
      // https://eslint.org/docs/latest/rules/arrow-body-style
      'arrow-body-style': ['error', 'as-needed'],

      // https://eslint.org/docs/latest/rules/no-duplicate-imports
      'no-duplicate-imports': ['error'],

      // https://eslint.org/docs/latest/rules/no-template-curly-in-string
      'no-template-curly-in-string': ['error'],

      // https://eslint.org/docs/latest/rules/no-useless-computed-key
      'no-useless-computed-key': ['error'],

      // https://eslint.org/docs/latest/rules/no-useless-rename
      'no-useless-rename': ['error'],

      // https://eslint.org/docs/latest/rules/prefer-arrow-callback
      'prefer-arrow-callback': ['error'],

      // https://eslint.org/docs/latest/rules/prefer-const#destructuring
      'prefer-const': ['error'],

      // https://eslint.org/docs/latest/rules/prefer-spread
      'prefer-spread': ['error'],

      // https://eslint.org/docs/latest/rules/require-atomic-updates
      'require-atomic-updates': ['error'],

      // https://eslint.org/docs/latest/rules/symbol-description
      'symbol-description': ['error'],
    },
  },
)

/**
 * Additional rules recommended when information is available.
 * These rules require additional configuration.
 * @see https://typescript-eslint.io/getting-started/typed-linting/
 */
const typeCheckedRules = tseslint.config(
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      // https://typescript-eslint.io/rules/no-unnecessary-condition/
      '@typescript-eslint/no-unnecessary-condition': ['error'],

      // https://typescript-eslint.io/rules/require-await/
      '@typescript-eslint/require-await': ['error'],
    },
  },
)

/**
 * Scratch's recommended configuration when type information is not available.
 */
const recommendedTypeFree = tseslint.config(typeFreeRules, eslintConfigPrettier)

/**
 * Scratch's recommended configuration when type information is available.
 * These rules require additional configuration.
 * @see https://typescript-eslint.io/getting-started/typed-linting/
 */
const recommendedTypeChecked = tseslint.config(typeFreeRules, typeCheckedRules, eslintConfigPrettier)

/**
 * Scratch's recommended configuration for general use.
 * Type-checked rules are enabled for files with known TypeScript extensions.
 * If your project includes such files, you must include additional configuration.
 * @see https://typescript-eslint.io/getting-started/typed-linting/
 */
const recommended = tseslint.config(
  typeFreeRules,
  {
    files: typeScriptExtensions,
    extends: [typeCheckedRules],
  },
  eslintConfigPrettier,
)

// Helper to get type hints while conveniently merging and extending configurations
export { config } from 'typescript-eslint'

// Our exported configurations
export { recommended, recommendedTypeChecked, recommendedTypeFree, legacy }
