# Agent Guide: eslint-config-scratch

## AI-assisted development policy

See [CONTRIBUTING.AI.md](https://github.com/scratchfoundation/.github/blob/main/CONTRIBUTING.AI.md) for Scratch's
org-wide policy on AI-assisted contributions. The short version: human developers remain responsible for all code
they submit. Do not submit code you cannot explain and defend in a review.

## Agent defaults

Use these defaults unless the user asks otherwise:

1. Keep changes minimal and scoped to the user request. Do not refactor surrounding code, add features, or clean up
   style in areas you weren't asked to touch.
2. Do not preserve backward compatibility when it isn't required. When all callers are internal, rename or
   restructure freely. This package is published to npm and widely consumed, so treat its public exports as a
   contract and preserve compatibility unless explicitly told otherwise. The `legacy/` configs in particular exist
   solely for backward compatibility — do not remove them without a major version bump.
3. Write comments that explain the current code, not its history. Do not reference prior implementations,
   intermediate states, or what the code "used to do." If an approach seems counterintuitive, explain why it is
   correct now — not why it changed.
4. Prefer fixing root causes over adding surface-level workarounds or assertions.
5. When fixing a bug or adding a rule, add or update fixture files and tests to cover the change. Iterate until
   all tests pass.
6. When adding runtime guards for states that should never happen, log actionable context rather than failing
   silently.
7. Preserve failure semantics when refactoring. An implicit crash should become an explicit `throw` with a useful
   message — not silent failure. Code that previously wouldn't crash still shouldn't, but consider whether a
   warning is warranted.
8. Do not add error handling, fallbacks, or validation for scenarios that cannot happen. Trust internal code and
   framework guarantees. Only validate at system boundaries (user input, external APIs).

## What this repository is

`eslint-config-scratch` is a shareable ESLint and Prettier configuration package for Scratch JavaScript and
TypeScript projects. It is published to npm and consumed as a `devDependency` by other Scratch packages.

There is no build step — `lib/` contains ES module source files (`.mjs`) that are published directly.

## Build and lint

```sh
npm test            # Lint + Vitest tests
npm run test:lint   # ESLint + Prettier check only
npm run test:vitest # Vitest tests only
npm run format      # Auto-fix formatting and lint issues
```

## Repository layout

```text
lib/
├── index.mjs          Entry point; exports eslintConfigScratch and prettierConfigScratch
├── eslint.mjs         ESLint configuration logic
├── prettier.mjs       Prettier configuration
└── legacy/            Backward-compatible named configs for older consumers
    ├── index.mjs      (base)
    ├── es6.mjs
    ├── node.mjs
    ├── react.mjs
    └── typescript.mjs
test/
├── eslint.test.mjs    Vitest test suite — lints fixture files and asserts error counts
└── recommended/       Fixture files (good/bad) for JS, TypeScript, and React
```

## Exported API

The main export (`lib/index.mjs`) provides:

- `eslintConfigScratch.recommended` — primary config; combines type-free and type-checked rules
- `eslintConfigScratch.recommendedTypeFree` — for JavaScript without type information
- `eslintConfigScratch.recommendedTypeChecked` — for TypeScript with full type checking
- `eslintConfigScratch.defineConfig` — re-export of ESLint's `defineConfig` helper
- `eslintConfigScratch.legacy.*` — named legacy configs (`base`, `es6`, `node`, `react`) for older consumers
- `prettierConfigScratch.recommended` — Prettier configuration

All of the above are part of the public API. A rule change that causes previously-passing code to fail lint is
a breaking change and warrants a semver major bump. A change that permits previously-forbidden patterns is
non-breaking (`feat` or `fix`).

## Testing approach

Tests in `test/eslint.test.mjs` use the ESLint Node API to lint fixture files in `test/recommended/` and assert
exact error and warning counts. When adding or changing a rule:

1. Add or update a fixture file (`*.good.*` should produce zero errors; `*.bad.*` should produce the expected
   count).
2. Update the corresponding assertion in `eslint.test.mjs`.
3. Run `npm run test:vitest` to confirm.

Do not change expected error counts without also verifying the fixture file reflects the intended behavior.

## npm workflow

Use `npm ci` to install dependencies from `package-lock.json`.

When adding or updating a dependency, run `npm install some-package@version` to update both `package.json` and
`package-lock.json` together.

Keep each section of `package.json` (`dependencies`, `devDependencies`, `peerDependencies`, `scripts`) in
alphabetical order.

**Do not publish manually.** Publishing is handled by the CI release pipeline via `semantic-release`.

**Commit messages are enforced.** Husky + commitlint validate every commit against
[Conventional Commits](https://www.conventionalcommits.org/) format.

## Before submitting changes

Review all changes and confirm:

- **Scope**: Changes are confined to the user request; nothing extra was added or modified.
- **Correctness**: Logic is sound and edge cases were considered.
- **Comments**: Comments are necessary, short, and clear; self-explanatory code has none.
- **Simplicity**: Implementation is as simple as possible; no speculative abstractions remain.
- **Documentation**: Update `AGENTS.md` and any other documentation files whose content is affected by the
  change (commands, repo structure, exported API, etc.).
- **Fixtures updated**: Any rule change has corresponding fixture and assertion updates.
- **Tests pass**: `npm test` completes with no failures.
- **No lint errors**: `npm run test:lint` passes.
