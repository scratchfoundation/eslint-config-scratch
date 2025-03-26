# Scratch ESLint config

`eslint-config-scratch` defines the eslint rules used for Scratch Javascript projects.

## Installation

Install the config along with its peer dependencies, eslint and babel-eslint.

```bash
npm install -DE eslint-config-scratch eslint@^9 @babel/eslint-parser@^7
```

If you're using the React config, also install the dependency for that

```bash
npm install -DE eslint-plugin-react@^7
```

## Usage

The configuration is split up into several modules:

* `eslint-config-scratch`: The base configuration, not configured for any particular environment
* `eslint-config-scratch/node`: Rules for targeting Node.js with ESM
* `eslint-config-scratch/web`: Rules for targeting Scratch's supported web browsers
* `eslint-config-scratch/react`: Rules for targeting Scratch's supported web browsers with React

These configurations are set up for the flat config format required as of `eslint@^9`.

Usually web projects contain some files targeting Node.js, for example configuration files, and some targeting web
browsers. To lint both with the appropriate rules, set up a base `eslint.config.mjs` with the rules for Node.js and
then override that configuration in `src` (or wherever your web code lives).

Your file structure might look like this:

```raw
scratch-project
- eslint.config.mjs
- package.json
- src
  - eslint.config.mjs
  - index.js
```

Your config files should be set up like

```javascript
// scratch-project/eslint.config.mjs
import nodeConfig from 'eslint-config-scratch/node';
export default nodeConfig;
```

```javascript
// scratch-project/src/eslint.config.mjs
import webConfig from 'eslint-config-scratch/web';

export default [
    webConfig,
    // If you need to add or override settings:
    {
        rules: {
            // ...
        }
    }
];
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

```raw
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

`subject` and `body` are your familiar commit subject and body. `footer` is
where you would include `BREAKING CHANGE` and `ISSUES FIXED` sections if
applicable.

`type` is one of:

* `fix`: A bug fix **Causes a patch release (0.0.x)**
* `feat`: A new feature **Causes a minor release (0.x.0)**
* `docs`: Documentation only changes
* `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `refactor`: A code change that neither fixes a bug nor adds a feature
* `perf`: A code change that improves performance **May or may not cause a minor release. It's not clear.**
* `test`: Adding missing tests or correcting existing tests
* `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* `chore`: Other changes that don't modify src or test files
* `revert`: Reverts a previous commit

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
