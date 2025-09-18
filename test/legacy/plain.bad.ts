import {ESLint} from 'eslint';

// @typescript-eslint/no-inferrable-types
// @typescript-eslint/no-unused-vars
const forty: number = 40;

// @typescript-eslint/no-unused-vars
const foo = (): ESLint => {
    const eslint = new ESLint({
        overrideConfigFile: true
    });
    return eslint;
};

// no-undef ('foo2' is not defined)
export const bar = foo2();
