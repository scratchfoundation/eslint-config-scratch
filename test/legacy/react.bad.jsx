import {ESLint} from 'eslint';
import React from 'react';

// @typescript-eslint/no-unused-vars
const foo = () => {
    const eslint = new ESLint({
        overrideConfigFile: true
    });
    return eslint;
};

export const myElement = <div>{'hello'}</div>;

// foo2 isn't defined
export const bar = foo2();
