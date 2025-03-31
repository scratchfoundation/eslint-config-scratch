import { makeEslintConfig } from './lib/index.mjs'

/** @type {import('typescript-eslint').ConfigArray} */
export default makeEslintConfig({ globals: 'node' })
