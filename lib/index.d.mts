import type { Linter } from 'eslint'
import type { defineConfig } from 'eslint/config'
import type { Config as PrettierConfig } from 'prettier'

/**
 * Scratch's shareable ESLint configurations.
 */
export declare const eslintConfigScratch: {
  /** Scratch's recommended configuration for general use. */
  readonly recommended: Linter.Config[]
  /** Scratch's recommended configuration when type information is not available. */
  readonly recommendedTypeFree: Linter.Config[]
  /** Scratch's recommended configuration when type information is available. Doesn't set `files`. */
  readonly recommendedTypeChecked: Linter.Config[]
  /** Rules for HTML, XML, and Markdown files. Included in `recommended`. */
  readonly miscFileRules: Linter.Config[]
  /** Re-export of `defineConfig` from `eslint/config`. */
  readonly defineConfig: typeof defineConfig
  /** Scratch's styling rules from `eslint-config-scratch@^9` and below. New projects should not use these. */
  readonly legacy: {
    readonly base: Linter.Config[]
    readonly es6: Linter.Config[]
    readonly node: Linter.Config[]
    readonly react: Linter.Config[]
    readonly typescript: Linter.Config[]
  }
}

/**
 * Scratch's shareable Prettier configuration.
 */
export declare const prettierConfigScratch: {
  readonly recommended: PrettierConfig
}
