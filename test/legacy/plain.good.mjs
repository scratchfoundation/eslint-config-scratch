import ESLint from 'eslint';

const foo = () => {
    const eslint = new ESLint({
        overrideConfigFile: true
    });
    return eslint;
};

export const bar = foo();
