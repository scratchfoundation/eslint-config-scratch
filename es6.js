module.exports = {
    rules: {
        'arrow-body-style': [2, 'as-needed'],
        'arrow-parens': [2, 'as-needed'],
        'arrow-spacing': [2, {
            before: true,
            after: true
        }],
        'no-confusing-arrow': [2],
        'no-duplicate-imports': [2],
        'no-return-await': [2],
        'no-template-curly-in-string': [2],
        'no-useless-computed-key': [2],
        'no-useless-constructor': [2],
        'no-useless-rename': [2],
        'no-var': [2],
        'prefer-arrow-callback': [2],
        'prefer-const': [2, {destructuring: 'all'}],
        'prefer-promise-reject-errors': [2],
        'prefer-rest-params': [2],
        'prefer-spread': [2],
        'prefer-template': [2],
        'require-atomic-updates': [2],
        'require-await': [2],
        'rest-spread-spacing': [2, 'never'],
        'symbol-description': [2],
        'template-curly-spacing': [2, 'never']
    },
    env: {
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2018
    }
};
