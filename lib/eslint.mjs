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
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import eslint from '@eslint/js'

// See https://www.npmjs.com/package/eslint-plugin-html#user-content-settings
const htmlExtensions = htmlSettings.getSettings({}).htmlExtensions

// '.html' => '**/*.html'
const htmlGlobs = htmlExtensions.map(ext => `**/*${ext}`)

/**
 * @typedef {import('eslint').Linter.Globals} Globals
 * @typedef {keyof globals} GlobalsKey
 * @typedef {Globals | GlobalsKey} GlobalsObjOrKey
 */

/**
 * Flatten the globals passed to `makeScratchConfig` into an object suitable for ESLint's `globals` option.
 * @param {GlobalsObjOrKey | GlobalsObjOrKey[]} [globalsIn] The globals to flatten.
 * @returns {Globals|undefined} Flattened globals object for ESLint.
 */
const flattenGlobals = globalsIn => {
  if (!globalsIn) return

  /**
   *
   * @param {Globals} globalsAcc Globals accumulator.
   * @param {GlobalsObjOrKey} objOrKey A globals object or key to add to the accumulator.
   * @returns {Globals} The accumulator after adding the current globals object or key.
   */
  const globalsReducer = (globalsAcc, objOrKey) => {
    if (typeof objOrKey === 'string') {
      const globalsForKey = globals[objOrKey]
      if (!globalsForKey) {
        throw new Error(`Invalid globals name. Not a key from the globals package: ${objOrKey}`)
      }
      Object.assign(globalsAcc, globalsForKey)
    } else {
      Object.assign(globalsAcc, objOrKey)
    }

    return globalsAcc
  }

  if (Array.isArray(globalsIn)) {
    return globalsIn.reduce(globalsReducer, {})
  }

  return globalsReducer({}, globalsIn)
}

/**
 * Create an ESLint configuration for Scratch style.
 * Supports JavaScript, TypeScript, and React (JSX/TSX) files.
 * Setting `tsconfigRootDir` enables type-aware rules, some of which apply even in JavaScript files.
 * @param {object} options Configuration options
 * @param {string} [options.tsconfigRootDir] Enable type checking by setting the root TypeScript config directory.
 * @param {GlobalsObjOrKey | GlobalsObjOrKey[]} [options.globals] Globals to provide to ESLint.
 * This can be expressed as:
 * - a single string, such as `'browser'`, corresponding to a key in the `globals` package.
 * - a single object as described in the "Specifying Globals" section of the ESLint documentation:
 *   https://eslint.org/docs/latest/use/configure/language-options#using-configuration-files
 * - an array of zero or more elements, each of which can be either of the above
 * @example
 * // eslint.config.mjs
 * export default makeScratchConfig({tsconfigRootDir: import.meta.dirname, globals: 'node'})
 * @example
 * // eslint.config.mjs
 * export default [
 *   ...makeScratchConfig({tsconfigRootDir: import.meta.dirname, globals: 'browser'}),
 *   {
 *     // customization
 *   }
 * ]
 * @returns {import('typescript-eslint').ConfigArray} An ESLint configuration array.
 */
const makeEslintConfig = ({ tsconfigRootDir, globals: globalsIn } = {}) => {
  const flattenedGlobals = flattenGlobals(globalsIn)

  return tseslint.config(
    // Start with recommended rules from ESLint and TypeScript ESLint.
    {
      extends: [
        eslint.configs.recommended,
        tsconfigRootDir ? tseslint.configs.recommendedTypeChecked : tseslint.configs.recommended,
        tsconfigRootDir ? tseslint.configs.stylisticTypeChecked : tseslint.configs.stylistic,
      ],
      languageOptions: {
        parserOptions: {
          ...(tsconfigRootDir
            ? {
                projectService: true,
                tsconfigRootDir,
              }
            : {}),
        },
        ...(globalsIn ? { globals: flattenedGlobals } : {}),
      },
    },
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

        // Require JSDoc comments on public / exported items.
        // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md
        'jsdoc/require-jsdoc': [
          'error',
          {
            publicOnly: true,
          },
        ],
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

        // Rules that require type information
        ...(tsconfigRootDir
          ? {
              // https://typescript-eslint.io/rules/no-unnecessary-condition/
              '@typescript-eslint/no-unnecessary-condition': ['error'],

              // https://typescript-eslint.io/rules/require-await/
              '@typescript-eslint/require-await': ['error'],
            }
          : {}),
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
    // Keep `eslintConfigPrettier` last to turn off rules that conflict with Prettier
    eslintConfigPrettier,
  )
}

export { makeEslintConfig }
