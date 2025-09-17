import {ESLint} from 'eslint';
import React from 'react';

const foo = () => {
    const eslint = new ESLint({
        overrideConfigFile: true
    });
    return eslint;
};

export const myElement = <div>{'hello'}</div>;

export const bar = foo();
