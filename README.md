# Scratch ESLint config

`eslint-config-scratch` defines `eslint` and `prettier` rules for Scratch Javascript and TypeScript projects.
Generally speaking, this configuration uses `prettier` for code style and formatting and `eslint` to flag potential
mistakes and encourage code that's easier to read and understand.

## Quick Start

Install the config along with its peer dependencies, `eslint` and `prettier`:

```bash
npm install -D eslint-config-scratch eslint@^9 prettier@^3
```

Add `eslint.config.mjs` to your project root (pick the `export` line appropriate for your project):

```js
// myProjectRoot/eslint.config.mjs
import { makeEslintConfig } from 'eslint-config-scratch'

// for a TypeScript project:
export default makeEslintConfig({ globals: 'browser', tsconfigRootDir: import.meta.dirname })

// for plain JavaScript:
export default makeEslintConfig({ globals: 'browser' })
```

Add `prettier.config.mjs` to your project root as well:

```js
// myProjectRoot/prettier.config.mjs
import { makePrettierConfig } from 'eslint-config-scratch'

export default makePrettierConfig()
```

Finally, add scripts like these to your `package.json`:

```json
"scripts": {
  "format": "prettier --write . && eslint --fix",
  "lint": "eslint && prettier --check .",
}
```

## Basic Configuration

The `makeEslintConfig` function takes options to adjust the ESLint configuration object for your project. Most
projects should start with something like this:

```mjs
// myProjectRoot/eslint.config.mjs
import { makeEslintConfig } from 'eslint-config-scratch'

export default makeEslintConfig({
  // Optional: specify global variables available in your environment
  globals: 'browser',

  // Optional: enables rules that use type info, some of which work in JS too
  tsconfigRootDir: import.meta.dirname,
})
```

If you have no `tsconfig.json` (or `jsconfig.json`) in your project, you can skip the `tsconfigRootDir` option. Rules
that require type information will be disabled or replaced with less strict alternatives that work without type info.

### Globals

The `globals` property is optional. If present, it can take several forms:

- a string, interpreted as a key in the `globals` object exported by the `globals` package.
  - Examples: `'browser'`, `'node'`, `'es2021'`, `'jest'`, etc.
- an object, set up as described in the "Specifying Globals" section of the [ESLint documentation](https://eslint.org/docs/latest/use/configure/language-options#using-configuration-files)
  - Example: `{ myGlobal: 'readonly', anotherGlobal: 'writable' }`
- an array of zero or more of any mixture of the above

```mjs
// myProjectRoot/eslint.config.mjs
import { makeEslintConfig } from 'eslint-config-scratch'

export default makeEslintConfig({
  // Optional: enables rules that use type info, some of which work in JS too
  tsconfigRootDir: import.meta.dirname,

  // Optional: specify global variables available in your environment
  // Warning: this is a very silly configuration
  globals: [
    'shared-node-browser',
    {
      fun: 'readonly',
      thing: false,
    },
    'es2021',
    {
      whyNot: 'writable',
    },
  ],
})
```

### Further Customization

The return value of the `makeEslintConfig` function is a standard ESLint configuration array. This means you can
customize your configuration further like this:

```mjs
// myProjectRoot/eslint.config.mjs
import { makeEslintConfig } from 'eslint-config-scratch'

export default [
  ...makeEslintConfig({
    // Optional: enables rules that use type info, some of which work in JS too
    tsconfigRootDir: import.meta.dirname,

    // Optional: specify global variables available in your environment
    globals: 'browser',
  }),
  // Add custom rules or overrides here
  {
    files: ['*.test.js'],
    rules: {
      'no-console': 'off', // Allow console logs in test files
    },
  },
]
```

All ESLint configuration options are available this way. You can use this to handle globals yourself if the simplified
`globals` configuration from above doesn't meet your needs:

```mjs
// myProjectRoot/eslint.config.mjs
import { makeEslintConfig } from 'eslint-config-scratch'
import globals from 'globals'

export default [
  ...makeEslintConfig({
    // Optional: enables rules that use type info, some of which work in JS too
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    files: ['src/main/**.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['src/renderer/**.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        MY_CUSTOM_GLOBAL: 'readonly',
      },
    },
  },
]
```

Of course, another option would be to place a different `eslint.config.mjs` file in each subdirectory. If you have
multiple `tsconfig.json` or `jsconfig.json` files in your project, it likely makes sense to have an
`eslint.config.mjs` file beside each one.

## Legacy Styles

Scratch used very different styling rules in `eslint-config-scratch@^9` and below. If you need to use those rules, you
can use the rule sets under `legacy/`:

- `eslint-config-scratch/legacy`: Legacy base configuration, not configured for any particular environment
- `eslint-config-scratch/legacy/es6`: Legacy rules for targeting Scratch's supported web browsers
- `eslint-config-scratch/legacy/node`: Legacy rules for targeting Node.js
- `eslint-config-scratch/legacy/react`: Legacy rules for targeting Scratch's supported web browsers with React

New projects should not use these rule sets. They may disappear in the future. Scratch did not use Prettier at this
time, so there is no legacy Prettier configuration.

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

- `fix`: A bug fix **Causes a patch release (0.0.x)**
- `feat`: A new feature **Causes a minor release (0.x.0)**
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance **May or may not cause a minor release. It's not clear.**
- `test`: Adding missing tests or correcting existing tests
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

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
breaking change. In your commit body, prefix the changes with "BREAKING CHANGE: "
This will cause a major version bump so downstream projects must choose to upgrade
the config and will not break the build unexpectedly.
