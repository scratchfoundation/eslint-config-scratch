module.exports = {
    parser: 'babel-eslint',
    rules: {
        // Errors
        'valid-jsdoc': [2],

        // Best practices
        'array-callback-return': [1],
        'block-scoped-var': [1],
        'curly': [2, 'multi-line'],
        'dot-location': [2, 'property'],
        'dot-notation': [2],
        'eqeqeq': [2],
        'no-alert': [2],
        'no-div-regex': [2],
        'no-else-return': [1],
        'no-empty-function': [2, {
            allow: ['arrowFunctions']
        }],
        'no-eq-null': [2],
        'no-eval': [2],
        'no-extend-native': [2],
        'no-extra-bind': [1],
        'no-global-assign': [2],
        'no-implied-eval': [2],
        'no-invalid-this': [2],
        'no-iterator': [2],
        'no-lone-blocks': [2],
        'no-loop-func': [2],
        'no-multi-spaces': [2],
        'no-multi-str': [2],
        'no-new': [1],
        'no-proto': [2],
        'no-restricted-properties': [1, {
            object: 'lodash',
            property: 'defaults',
            message: 'Please use Object.assign'
        }],
        'no-return-assign': [2],
        'no-script-url': [2],
        'no-self-compare': [2],
        'no-sequences': [1],
        'no-throw-literal': [2],
        'no-unmodified-loop-condition': [1],
        'no-unused-expressions': [2],
        'no-useless-call': [2],
        'no-useless-concat': [1],
        'no-useless-escape': [2],
        'no-warning-comments': [1],
        'no-with': [2],
        'radix': [2],
        'wrap-iife': [2],
        'yoda': [2],

        // Variables
        'no-unused-vars': [2, {args: 'after-used', varsIgnorePattern: '^_'}],
        'no-catch-shadow': [2],
        'no-shadow': [2],
        'no-undefined': [2],
        'no-use-before-define': [2],
        
        // Strict
        'strict': [2, 'never'],

        // Style
        'brace-style': [2],
        'camelcase': [2],
        'func-style': [2, 'expression'],
        'indent': [2, 4],
        'jsx-quotes': [2, 'prefer-double'],
        'key-spacing': [2, {
            beforeColon: false,
            afterColon: true,
            mode: 'strict'
        }],
        'keyword-spacing': [2, {
            before: true,
            after: true
        }],
        'linebreak-style': [2, 'unix'],
        'lines-around-comment': [2, {
            allowArrayStart: true,
            allowBlockStart: true,
            allowObjectStart: true,
            beforeBlockComment: true,
            beforeLineComment: true
        }],
        'max-len': [2, 120, 4],
        'new-parens': [2],
        'newline-per-chained-call': [2],
        'no-lonely-if': [1],
        'no-mixed-operators': [1],
        'no-multiple-empty-lines': [2, {
            max: 2,
            maxBOF: 0,
            maxEOF: 0
        }],
        'no-negated-condition': [2],
        'no-plusplus': [2, {
            allowForLoopAfterthoughts: true
        }],
        'no-tabs': [2],
        'no-trailing-spaces': [2, { skipBlankLines: true }],
        'no-unneeded-ternary': [2],
        'object-property-newline': [2, {
            allowMultiplePropertiesPerLine: true
        }],
        'one-var': [2, 'never'],
        'operator-linebreak': [2, 'after'],
        'quotes': [2, 'single', {
            'allowTemplateLiterals': true,
            'avoidEscape': true
        }],
        'require-jsdoc': [1],
        'semi': [2, 'always'],
        'space-before-function-paren': [2, 'always'],

        // Node/CommonJS
        'global-require': [2],
        'handle-callback-err': [1],
        'no-mixed-requires': [2],
        'no-new-require': [2],
        'no-path-concat': [2],
    },
    env: {
        browser: true,
        node: true
    },
    extends: ['eslint:recommended']
};
