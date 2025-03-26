import jsdoc from 'eslint-plugin-jsdoc';
import stylistic from '@stylistic/eslint-plugin';

/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 */

/**
 * @param {Object} options
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
    {
        plugins: {
            jsdoc
        },
        rules: {
            '@stylistic/max-len': ['error', 118], // above 118 doesn't display well in GitHub's 120-column diff views
        }
    }
];

export {makeConfig};
