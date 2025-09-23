import {ESLint} from 'eslint';

// foo isn't used
const foo = () => {
    const eslint = new ESLint({
        overrideConfigFile: true
    });
    return eslint;
};

// React isn't allowed in plain JS
// React must be in scope when using JSX
export const myElement = <div>{'hello'}</div>;

// foo2 isn't defined
export const bar = foo2();
