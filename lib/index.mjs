import eslintConfigPrettier from 'eslint-config-prettier/flat'

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfigScratch = [
  eslintConfigPrettier, // keep this last to turn off rules that conflict with Prettier
]

export default eslintConfigScratch
