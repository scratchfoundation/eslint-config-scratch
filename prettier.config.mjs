import sortImports from '@trivago/prettier-plugin-sort-imports';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
    // #region Prettier
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: true,
    plugins: [
        sortImports
    ],
    printWidth: 118,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    // #endregion Prettier

    // #region @trivago/prettier-plugin-sort-imports
    importOrder: ['^@', '^[./]']
    // #endregion @trivago/prettier-plugin-sort-imports
};

export default prettierConfig;
