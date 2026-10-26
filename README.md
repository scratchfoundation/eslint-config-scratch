# Scratch ESLint config

`eslint-config-scratch` defines `eslint` and `prettier` rules for Scratch Javascript and TypeScript projects.
Generally speaking, this configuration uses `prettier` for code style and formatting and `eslint` to flag potential
mistakes and encourage code that's easier to read and understand.

## Quick Start

Install the config along with its peer dependency, `eslint`. The config brings its own `prettier`; install `prettier`
directly as well if you want to run the `prettier` CLI from your project's scripts:

```bash
npm install -D eslint-config-scratch eslint@^10 prettier@^3
```

This package requires Node.js `^22.22.2 || >=24.15.0`.

npm prints `ERESOLVE overriding peer dependency` warnings for `eslint-plugin-react` and `eslint-plugin-jsx-a11y`,
whose published peer ranges stop at ESLint 9. This config wraps both with `@eslint/compat`, so they work with ESLint 10
despite the warning.

Add `eslint.config.mjs` to your project root.

For a TypeScript project, `recommended` already enables type-aware rules for TypeScript files, using
[typescript-eslint's project service](https://typescript-eslint.io/packages/parser/#projectservice). Tell it where to
find your `tsconfig.json` with `tsconfigRootDir`. For example, if you also want to ignore `dist/` and `node_modules/`,
your configuration might look like this:

```js
// myProjectRoot/eslint.config.mjs
import { eslintConfigScratch } from 'eslint-config-scratch'
import { globalIgnores } from 'eslint/config'

export default eslintConfigScratch.defineConfig(
  eslintConfigScratch.recommended,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  globalIgnores(['dist/**', 'node_modules/**']),
)
```

Every TypeScript file you lint must be covered by your `tsconfig.json`. Setting `projectService` yourself isn't necessary,
and setting it for non-TypeScript files (for example, with `files: ['src/**']`) makes ESLint type-check JavaScript files
and Markdown code blocks that TypeScript can't find.

For a JavaScript project, it might look like this:

```js
// myProjectRoot/eslint.config.mjs
import { eslintConfigScratch } from 'eslint-config-scratch'

export default eslintConfigScratch.recommended
```

The function `eslintConfigScratch.defineConfig` is a re-export of the `defineConfig` function from `eslint/config`,
and helps with merging and extending configurations.

Add `prettier.config.mjs` to your project root as well:

```js
// myProjectRoot/prettier.config.mjs
import { prettierConfigScratch } from 'eslint-config-scratch'

export default prettierConfigScratch.recommended
```

Finally, add scripts like these to your `package.json`:

```json
"scripts": {
  "format": "eslint --fix && prettier --write .",
  "lint": "eslint && prettier --check ."
}
```

## Basic Configuration

The function `eslintConfigScratch.defineConfig` is a re-export of the `defineConfig` function from `eslint/config`,
and helps with merging and extending configurations. Full documentation is available here:
<https://eslint.org/blog/2025/03/flat-config-extends-define-config-global-ignores/#introducing-defineconfig()-for-eslint>.

Use `defineConfig` to add or override rules, plugins, and other configuration options. For example:

```js
// myProjectRoot/eslint.config.mjs
import { eslintConfigScratch } from 'eslint-config-scratch'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'

export default eslintConfigScratch.defineConfig(
  eslintConfigScratch.recommended,
  {
    files: ['src/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        MY_CUSTOM_GLOBAL: 'readonly',
      },
    },
  },
  // Ignore all files in the dist and node_modules directories
  globalIgnores(['dist/**', 'node_modules/**']),
)
```

This configuration doesn't declare environment globals, so code that uses `console`, `window`, or `process` needs
`languageOptions.globals` like the example above. If you import the [`globals`](https://www.npmjs.com/package/globals)
package for that, install it in your own project:

```bash
npm install -D globals
```

`eslint-config-scratch` depends on `globals` internally, so an import may resolve without installing it. Don't rely on
that: it isn't part of this package's API, and it breaks with stricter package managers or a future release of this
package.

## Granular Configuration

The `eslintConfigScratch` object contains granular configurations as well:

- `recommendedTypeFree`: A configuration suitable for contexts without type information, such as a JavaScript project.
- `recommendedTypeChecked`: A configuration for TypeScript files with type information. It applies only to TypeScript
  files. You must provide extra configuration to `parserOptions` to enable type checking. See here:
  <https://typescript-eslint.io/getting-started/typed-linting/>

The `recommended` configuration is a combination of the two, and should be suitable for most projects. Features
requiring type information are enabled for TypeScript files, and features that don't require type information are
enabled for all files.

Type-aware rules apply only to TypeScript files. JavaScript files are parsed as JavaScript, so TypeScript syntax such
as `const x: number = 1` in a `.js` file is an error. To type-check JSDoc types in JavaScript, use TypeScript itself:
enable `allowJs` and `checkJs` in a `jsconfig.json` or `tsconfig.json` and run `tsc --noEmit`.

## Legacy Styles

Scratch used very different styling rules in `eslint-config-scratch@^9` and below. If you need to use those rules, you
can use these legacy configurations:

- `eslintConfigScratch.legacy.base`: Legacy base configuration, not configured for any particular environment
- `eslintConfigScratch.legacy.es6`: Legacy rules for targeting Scratch's supported web browsers
- `eslintConfigScratch.legacy.node`: Legacy rules for targeting Node.js
- `eslintConfigScratch.legacy.react`: Legacy rules for targeting Scratch's supported web browsers with React
- `eslintConfigScratch.legacy.typescript`: Legacy rules for TypeScript, swapping core rules for their type-aware
  `typescript-eslint` equivalents (requires type information)

New projects should not use these rule sets. They may disappear in the future. Scratch did not use Prettier at this
time, so there is no legacy Prettier configuration.

Legacy Scratch projects usually `extend` more than one of these at a time, and potentially a different set per
subdirectory. To do that in this new flat configuration format:

```js
// scratch-gui/eslint.config.mjs
import { eslintConfigScratch } from 'eslint-config-scratch'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'

export default eslintConfigScratch.defineConfig(
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
  globalIgnores(['dist/**', 'node_modules/**']),
)
```

## Upgrading to v15 (ESLint 10)

Upgrade `eslint` and `eslint-config-scratch` together. Then:

- Make sure only one ESLint is installed: `npm ls eslint` should show a single 10.x version. In an npm workspaces
  monorepo, install `eslint` at the root; an ESLint 9 left at the root next to ESLint 10 in a workspace can crash
  linting. If npm refuses to install ESLint 10 because of a direct dependency on `eslint-plugin-react` or
  `eslint-plugin-jsx-a11y`, remove that dependency unless your own config imports the plugin. This package already
  provides both.
- Remove `/* eslint-env */` comments. ESLint 10 reports them as errors; declare globals with `languageOptions.globals`
  instead.
- If your config imports `globals`, make sure it's in your own `devDependencies` (see
  [Basic Configuration](#basic-configuration)).
- Fix reports from the rules ESLint 10 added to `eslint:recommended`: `no-unassigned-vars`, `no-useless-assignment`,
  and `preserve-caught-error`. They apply to both the `recommended` and `legacy` configurations. Also,
  `no-shadow-restricted-names` now reports variables named `globalThis`.
- Check any `eslint.config.*` files below your project root. ESLint 10 uses the config file nearest to each linted
  file, so a nested config now replaces the root config for files under it.
- Import only from `eslint-config-scratch` itself. The package now has an `exports` map, so paths inside it, such as
  `eslint-config-scratch/lib/eslint.mjs`, can't be imported. The package also ships TypeScript types, so editors and
  `eslint.config.ts` files can type-check your configuration.

See the [ESLint v10 migration guide](https://eslint.org/docs/latest/use/migrate-to-10.0.0) for the full list.

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

After `npm install`, a Husky `commit-msg` hook runs [commitlint](https://commitlint.js.org/) to check each commit
message against this format. CI runs the same check.

## Breaking changes

If you're committing a change that makes the linter more strict, or will
otherwise require changes to existing code, ensure your commit specifies a
breaking change. In your commit body, prefix the changes with "BREAKING CHANGE: "
This will cause a major version bump so downstream projects must choose to upgrade
the config and will not break the build unexpectedly.
