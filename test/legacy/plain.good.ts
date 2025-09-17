import {ESLint} from 'eslint';

const foo = (): ESLint => {
    const eslint = new ESLint({
        overrideConfigFile: true
    });
    return eslint;
};

export const bar = foo();
