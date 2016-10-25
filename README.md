# Scratch ESLint config
#### eslint-config-scratch defines the eslint rules used for Scratch Javascript projects

## Installation
Install the config along with its peer dependencies, eslint and babel-eslint.
```bash
npm install -D eslint-config-scratch eslint@3 babel-eslint@7
```

If you're using the React config, also install the dependency for that
```bash
npm install -D eslint-plugin-react@6
```

## Usage
The configuration is split up into several modules:
* `scratch`: The base configuration. Always extend this.
* `scratch/node`: Rules for node, e.g., server-side code, tests, and scripts
* `scratch/es6`: Rules for ES6, for use when you're transpiling with webpack
* `scratch/react`: Rules for React projects

Usually web projects have a mix of node and web environment files. To lint both
with the appropriate rules, set up a base `.eslintrc.js` with the rules for node
and then override the node configuration in `src` (where web code usually lives).
E.g., with a file structure like this:
```
scratch-project
- .eslintrc.js
- package.json
- src
  - .eslintrc.js
  - index.js
```
Your config files should be set up like
```javascript
// scratch-project/.eslintrc.js
module.exports = {
    extends: ['scratch', 'scratch/node'],
    env: {
        node: true
    }
};

// scratch-project/src/.eslintrc.js
module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6', 'scratch/react'],
    env: {
        browser: true
    }
};
```
This will set up all the files in the project for linting as Node.js by default,
except for those in `src/`, which will be linted as ES6 and React files.

If you're linting React, also make sure your lint script lints `.jsx` files:
```json
"scripts": {
    "lint": "eslint . --ext .js,.jsx"
}
```

## Committing
This project uses [semantic release](https://github.com/semantic-release/semantic-release)
to ensure version bumps follow semver so that projects using the config don't
break unexpectedly.

In order to automatically determine the type of version bump necessary, semantic
release expects commit messages to be formatted following
[conventional-changelog](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md).

Use the [commitizen CLI](https://github.com/commitizen/cz-cli) to make commits
formatted in this way:

```bash
npm install -g commitizen
npm install
```

Now you're ready to make commits using `git cz`.

## Breaking changes
If you're committing a change that makes the linter more strict, or will
otherwise require changes to existing code, ensure your commit specifies a
breaking change.  In your commit body, prefix the changes with "BREAKING CHANGE: "
This will cause a major version bump so downstream projects must choose to upgrade
the config and will not break the build unexpectedly.
