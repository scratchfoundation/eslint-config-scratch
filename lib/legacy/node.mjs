import { defineConfig } from 'eslint/config'
import globals from 'globals'

// The Node.js-specific rules that were here (global-require, handle-callback-err, no-mixed-requires,
// no-new-require, no-path-concat) have been deprecated with no core ESLint replacements.
// For broader Node.js linting, consider adding eslint-plugin-n rules directly.
// Note: n/prefer-node-protocol is already included in the modern recommended config.
// See: https://github.com/eslint-community/eslint-plugin-n
export default defineConfig({
  languageOptions: {
    globals: globals.node,
  },
})
