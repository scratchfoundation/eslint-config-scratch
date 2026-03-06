import sortImports from '@trivago/prettier-plugin-sort-imports'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const recommended = {
  // #region Prettier
  arrowParens: 'always',
  plugins: [sortImports],
  printWidth: 118,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  // #endregion Prettier

  // #region @trivago/prettier-plugin-sort-imports
  importOrder: ['^node:', '^[^./]', '^[./]'],
  // #endregion @trivago/prettier-plugin-sort-imports
}

export { recommended }
