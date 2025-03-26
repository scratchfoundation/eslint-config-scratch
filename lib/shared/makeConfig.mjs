import html from 'eslint-plugin-html'
import jsdoc from 'eslint-plugin-jsdoc'
import markdown from 'eslint-plugin-markdown'
import stylistic from '@stylistic/eslint-plugin'

import htmlSettings from 'eslint-plugin-html/src/settings.js'

// See https://www.npmjs.com/package/eslint-plugin-html#user-content-settings
const htmlExtensions = htmlSettings.getSettings({}).htmlExtensions

// '.html' => '**/*.html'
const htmlGlobs = htmlExtensions.map(ext => `**/*${ext}`)

/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 */

/**
 * @param {object} options Configuration options.
 * @param {boolean} [options.enableReact] Enable React JSX rules.
 * @returns {ESLintConfig[]} ESLint configurations.
 */
const makeConfig = ({
  enableReact,
} = {}) => [
  stylistic.configs.customize({
    jsx: enableReact,
  }),
  jsdoc.configs['flat/recommended'],
  ...markdown.configs.recommended,
  {
    plugins: {
      jsdoc,
    },
    rules: {
      '@stylistic/max-len': ['error', 118], // above 118 doesn't display well in GitHub's 120-column diff views
    },
  },
  {
    files: htmlGlobs,
    plugins: { html },
    settings: {
      'html/html-extensions': htmlExtensions,
    },
  },
]

export { makeConfig }
