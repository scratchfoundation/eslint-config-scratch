# Scratch ESLint config

`eslint-config-scratch` defines `eslint` and `prettier` rules for Scratch Javascript and TypeScript projects.
Generally speaking, this configuration uses `prettier` for code style and formatting and `eslint` to flag potential
mistakes and encourage code that's easier to read and understand.

## Quick Start

Install the config along with its peer dependencies, `eslint` and `prettier`:

```bash
npm install -D eslint-config-scratch eslint@^9 prettier@^3
```

Add `eslint.config.mjs` to your project root.

For a TypeScript project, you can add `languageOptions` to enable type checking:

```js
// myProjectRoot/eslint.config.mjs
import { eslintConfigScratch } from 'eslint-config-scratch'

export default eslintConfigScratch.config(eslintConfigScratch.recommended, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

For a JavaScript project, it might look like this:

```js
// myProjectRoot/eslint.config.mjs
import { eslintConfigScratch } from 'eslint-config-scratch'

export default eslintConfigScratch.recommended
```

The function `eslintConfigScratch.config` is a re-export of the `config` function from `typescript-eslint`, and helps
with merging and extending configurations.

Add `prettier.config.mjs` to your project root as well:

```js
// myProjectRoot/prettier.config.mjs
import { prettierConfigScratch } from 'eslint-config-scratch'

export default prettierConfigScratch.recommended
```

Finally, add scripts like these to your `package.json`:

```json
"scripts": {
  "format": "prettier --write . && eslint --fix",
  "lint": "eslint && prettier --check .",
}
```

## Basic Configuration

The `eslintConfigScratch.config` is a re-export of the `config` function from `typescript-eslint`. Full documentation
is available here: <https://typescript-eslint.io/packages/typescript-eslint#config>.

The `config` function can be used to add or override rules, plugins, and other configuration options. For example:

```js
// myProjectRoot/eslint.config.mjs
import { eslintConfigScratch } from 'eslint-config-scratch'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'

export default eslintConfigScratch.config(
  eslintConfigScratch.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        MY_CUSTOM_GLOBAL: 'readonly',
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Ignore all files in the dist directory
  globalIgnores(['dist/**/*']),
)
```

## Granular Configuration

The `eslintConfigScratch` object contains granular configurations as well:

- `recommendedTypeFree`: A configuration suitable for contexts without type information, such as a JavaScript project.
- `recommendedTypeChecked`: A configuration suitable for contexts with type information, such as a TypeScript project.
  You must provide extra configuration to `parserOptions` to enable type checking. See here:
  <https://typescript-eslint.io/getting-started/typed-linting/>

The `recommended` configuration is a combination of the two, and should be suitable for most projects. Features
requiring type information are enabled for TypeScript files, and features that don't require type information are
enabled for all files.

## Legacy Styles

Scratch used very different styling rules in `eslint-config-scratch@^9` and below. If you need to use those rules, you
can use these legacy configurations:

- `eslintConfigScratch.legacy.base`: Legacy base configuration, not configured for any particular environment
- `eslintConfigScratch.legacy.es6`: Legacy rules for targeting Scratch's supported web browsers
- `eslintConfigScratch.legacy.node`: Legacy rules for targeting Node.js
- `eslintConfigScratch.legacy.react`: Legacy rules for targeting Scratch's supported web browsers with React

New projects should not use these rule sets. They may disappear in the future. Scratch did not use Prettier at this
time, so there is no legacy Prettier configuration.

Legacy Scratch projects usually `extend` more than one of these at a time, and potentially a different set per
subdirectory. To do that in this new flat configuration format:

```js
// scratch-gui/eslint.config.mjs
import { eslintConfigScratch } from 'eslint-config-scratch'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'

export default eslintConfigScratch.config(
  eslintConfigScratch.legacy.base,
  eslintConfigScratch.legacy.es6,
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    extends: [eslintConfigScratch.legacy.react],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // ...customized rules for `src/`...
    },
    // ...other settings for `src/`...
  },
  // ...settings for `test/`, etc...
  globalIgnores(['dist/**/*']),
)
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
