import eslintConfigPrettier from 'eslint-config-prettier/flat'
import formatjs from 'eslint-plugin-formatjs'
import html from 'eslint-plugin-html'
import htmlSettings from 'eslint-plugin-html/src/settings.js'
import importPlugin from 'eslint-plugin-import'
import jsdoc from 'eslint-plugin-jsdoc'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import eslint from '@eslint/js'
import markdown from '@eslint/markdown'
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

// WARNING: eslint rules from `typescript-eslint`, even the "untyped" rules, assume that your code will be run through
// `tsc` or equivalent for type checking. Using any rule set from `typescript-eslint` will, for example, turn off the
// `no-undef` rule. That makes sense if you'll use TypeScript to catch undefined globals, but it could be dangerous
// for plain JavaScript.
// More information here: https://github.com/typescript-eslint/typescript-eslint/issues/8825#issuecomment-2033315610

/**
 * Convert an array of file extensions to an array of globs
 * @param {string[]} extArray - an array of file extensions, like `.foo`
 * @returns {string[]} an array of globs, like `** /*.foo` (without the space)
 */
const extArrayToGlobArray = extArray => extArray.map(ext => `**/*${ext}`)

// See https://www.npmjs.com/package/eslint-plugin-html#user-content-settings
const htmlSettingsDefault = htmlSettings.getSettings({})

const fileExtensions = (x => {
  x.allScript = [...x.javaScript, ...x.typeScript]
  return x
})({
  html: /** @type {string[]} */ (htmlSettingsDefault.htmlExtensions),
  javaScript: ['.js', '.jsx', '.mjs', '.cjs'],
  markdown: ['.md'],
  typeScript: ['.ts', '.tsx', '.mts', '.cts'],
  react: ['.jsx', '.tsx'],
  xml: /** @type {string[]} */ (htmlSettingsDefault.xmlExtensions),
})

// This explicitly lists each entry so that we can get unused warnings
const fileGlobs = {
  allScript: extArrayToGlobArray(fileExtensions.allScript),
  html: extArrayToGlobArray(fileExtensions.html),
  javaScript: extArrayToGlobArray(fileExtensions.javaScript),
  markdown: extArrayToGlobArray(fileExtensions.markdown),
  react: extArrayToGlobArray(fileExtensions.react),
  typeScript: extArrayToGlobArray(fileExtensions.typeScript),
  xml: extArrayToGlobArray(fileExtensions.xml),
}

/**
 * Rules for specific file types outside of the core JS/TS rule sets.
 */
const miscFileRules = defineConfig([
  // eslint-plugin-html
  {
    name: 'scratch/miscFileRules[eslint-plugin-html]',
    files: [...fileGlobs.html, ...fileGlobs.xml],
    plugins: { html },
    settings: {
      'html/html-extensions': fileExtensions.html,
      'xml/xml-extensions': fileExtensions.xml,
    },
  },
  // eslint-plugin-markdown
  {
    name: 'scratch/miscFileRules[eslint-plugin-markdown]',
    files: fileGlobs.markdown,
    extends: [markdown.configs.recommended],
    language: 'markdown/gfm', // Github Flavored Markdown
  },
  markdown.configs.processor, // Process script blocks inside Markdown files
])

/**
 * Rules recommended for all script files, whether or not type information is available or checked.
 */
const allScriptRules = defineConfig([
  tseslint.configs.base,
  // eslint-plugin-formatjs
  {
    name: 'scratch/allScriptRules[eslint-plugin-formatjs]',
    plugins: {
      formatjs,
    },
    rules: {
      'formatjs/no-offset': ['error'],
    },
  },
  // eslint-plugin-import
  {
    name: 'scratch/allScriptRules[eslint-plugin-import]',
    plugins: importPlugin.flatConfigs.recommended.plugins,
    rules: {
      'import/no-duplicates': 'error', // Forbid duplicate imports
    },
  },
  // eslint-plugin-jsx-a11y
  {
    name: 'scratch/allScriptRules[eslint-plugin-jsx-a11y]',
    files: fileGlobs.react,
    // @ts-expect-error This plugin's recommended rules don't quite match the type `defineConfig` expects.
    extends: [jsxA11y.flatConfigs.recommended],
  },
  // eslint-plugin-react
  {
    files: fileGlobs.allScript,
    plugins: {
      react,
    },
    rules: {
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
      'react/jsx-filename-extension': ['error', { allow: 'as-needed', extensions: ['.jsx', '.tsx'] }],
    },
  },
  {
    name: 'scratch/allScriptRules[eslint-plugin-react]',
    files: fileGlobs.react,
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
    name: 'scratch/allScriptRules[eslint-plugin-react-hooks]',
    files: fileGlobs.react,
    extends: [reactHooks.configs['recommended-latest']],
    rules: {
      // https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md#advanced-configuration
      'react-hooks/exhaustive-deps': ['error', { additionalHooks: '^useAsync$' }],
    },
  },
  // @eslint-community/eslint-plugin-eslint-comments
  {
    name: 'scratch/allScriptRules[eslint-plugin-eslint-comments]',
    extends: [
      // @ts-expect-error This plugin's recommended rules don't quite match the type `defineConfig` expects.
      eslintComments.recommended,
    ],
    rules: {
      // require a description for eslint control comments other than `eslint-enable`
      '@eslint-community/eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],
    },
  },
  // @eslint/js
  {
    name: 'scratch/allScriptRules[@eslint/js]',
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
])

/**
 * Additional rules recommended when type information is not available or checked.
 */
const typeFreeRules = defineConfig([
  {
    name: 'scratch/typeFreeRules[base]',
    extends: [eslint.configs.recommended],
  },
  ...allScriptRules,
  {
    name: 'scratch/typeFreeRules[eslint-plugin-jsdoc]',
    extends: [jsdoc.configs['flat/recommended-error']],
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
])

/**
 * Rules recommended when type information is available and checked. This configuration turns off some rules with the
 * assumption that other software, such as TypeScript, will flag those problems. For example, the `no-undef` rule is
 * disabled in this configuration. These rules include `allScriptRules`.
 * These rules require additional configuration.
 * @see https://typescript-eslint.io/getting-started/typed-linting/
 */
const typeCheckedRules = defineConfig([
  {
    name: 'scratch/typeCheckedRules[base]',
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      // https://typescript-eslint.io/rules/no-unnecessary-condition/
      '@typescript-eslint/no-unnecessary-condition': ['error'],

      // https://typescript-eslint.io/rules/require-await/
      '@typescript-eslint/require-await': ['error'],
    },
  },
  ...allScriptRules,
  {
    name: 'scratch/typeCheckedRules[eslint-plugin-jsdoc][1]',
    extends: [jsdoc.configs['flat/recommended-error']],
  },
  {
    name: 'scratch/typeCheckedRules[eslint-plugin-jsdoc][2]',
    extends: [jsdoc.configs['flat/recommended-typescript-error']],
  },
  {
    name: 'scratch/typeCheckedRules[eslint-plugin-jsdoc][3]',
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
  // typescript-eslint
  {
    name: 'scratch/typeCheckedRules[typescript-eslint]',
    rules: {
      // https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing/
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],

      // https://typescript-eslint.io/rules/no-useless-constructor/
      '@typescript-eslint/no-useless-constructor': ['error'],

      // https://typescript-eslint.io/rules/no-non-null-assertion
      '@typescript-eslint/no-non-null-assertion': ['error'],
    },
  },
])

/**
 * Scratch's recommended configuration when type information is not available.
 */
const recommendedTypeFree = defineConfig(typeFreeRules, eslintConfigPrettier)

/**
 * Scratch's recommended configuration when type information is available.
 * These rules require additional configuration.
 * WARNING: These rules do not specify the `files` property.
 * @see https://typescript-eslint.io/getting-started/typed-linting/
 */
const recommendedTypeChecked = defineConfig(typeCheckedRules, eslintConfigPrettier)

/**
 * Scratch's recommended configuration for general use.
 * Type-checked rules are enabled for files with known TypeScript extensions.
 * If your project includes such files, you must include additional configuration.
 * @see https://typescript-eslint.io/getting-started/typed-linting/
 */
const recommended = defineConfig(
  {
    name: 'scratch/recommended',
  },
  {
    files: fileGlobs.allScript,
    extends: [typeFreeRules],
  },
  {
    files: fileGlobs.typeScript,
    extends: [typeCheckedRules],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  miscFileRules,
  eslintConfigPrettier,
)

// Helper to get type hints while conveniently merging and extending configurations
export { defineConfig } from 'eslint/config'

// Our exported configurations
export { recommended, recommendedTypeChecked, recommendedTypeFree, miscFileRules, legacy }
