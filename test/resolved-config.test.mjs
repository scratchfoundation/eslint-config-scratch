import { ESLint } from 'eslint'
import { describe, expect, test } from 'vitest'
import { eslintConfigScratch } from '../lib/index.mjs'

/**
 * @import { Linter } from 'eslint'
 */

// Snapshot the resolved configuration for each exported config and a representative file of each type.
// Upstream presets (`@eslint/js`, typescript-eslint, eslint-plugin-jsdoc, ...) can add or change rules in any release,
// so these snapshots show exactly what a dependency update changes for consumers.

const scriptFiles = ['x.js', 'x.mjs', 'x.cjs', 'x.jsx', 'x.ts', 'x.tsx']

/** @type {Record<string, { config: Linter.Config[], files: string[] }>} */
const cases = {
  recommended: {
    config: eslintConfigScratch.recommended,
    files: [...scriptFiles, 'x.md', 'x.md/0.js', 'x.md/0.ts', 'x.html'],
  },
  recommendedTypeFree: { config: eslintConfigScratch.recommendedTypeFree, files: scriptFiles },
  recommendedTypeChecked: { config: eslintConfigScratch.recommendedTypeChecked, files: scriptFiles },
  'legacy.base': { config: eslintConfigScratch.legacy.base, files: ['x.js', 'x.jsx'] },
  'legacy.es6': { config: eslintConfigScratch.legacy.es6, files: ['x.js'] },
  'legacy.node': { config: eslintConfigScratch.legacy.node, files: ['x.js'] },
  'legacy.react': { config: eslintConfigScratch.legacy.react, files: ['x.jsx'] },
  'legacy.typescript': { config: eslintConfigScratch.legacy.typescript, files: ['x.ts'] },
}

const severityNames = ['off', 'warn', 'error']

/**
 * Describe the parts of a resolved config that change lint results.
 * @param {Linter.Config | undefined} config - the config ESLint calculated for one file
 * @returns {string} one line per setting or enabled rule
 */
const describeConfig = (config) => {
  if (!config) return 'ignored\n'
  const lines = [
    `processor: ${config.processor?.meta?.name ?? '-'}`,
    `parser: ${config.languageOptions?.parser?.meta?.name ?? '-'}`,
    `sourceType: ${config.languageOptions?.sourceType ?? '-'}`,
    `projectService: ${config.languageOptions?.parserOptions?.projectService ?? '-'}`,
  ]
  const rules = Object.entries(config.rules ?? {})
    .map(([name, [severity, ...options]]) => [name, severityNames[severity] ?? severity, options])
    .filter(([, severity]) => severity !== 'off')
    .sort(([a], [b]) => (a < b ? -1 : 1))
  for (const [name, severity, options] of rules) {
    lines.push(options.length ? `${name}: ${severity} ${JSON.stringify(options)}` : `${name}: ${severity}`)
  }
  return `${lines.join('\n')}\n`
}

describe.concurrent.for(Object.entries(cases))('%s', ([configName, { config, files }]) => {
  test.for(files)('%s', async (file, { expect }) => {
    const eslint = new ESLint({
      cwd: import.meta.dirname,
      overrideConfigFile: true,
      // ESLint only lints .js, .mjs, and .cjs by default. Consumers add the other extensions themselves.
      overrideConfig: [{ files: ['**/*.{jsx,ts,tsx}'] }, ...config],
    })
    const resolved = await eslint.calculateConfigForFile(file)
    await expect(describeConfig(resolved)).toMatchFileSnapshot(
      `__snapshots__/resolved-config/${configName}/${file.replaceAll('/', '_')}.txt`,
    )
  })
})

test('every exported config is covered', () => {
  const exported = [
    ...Object.keys(eslintConfigScratch).filter((k) => !['defineConfig', 'legacy', 'miscFileRules'].includes(k)),
    ...Object.keys(eslintConfigScratch.legacy).map((k) => `legacy.${k}`),
  ]
  expect(Object.keys(cases).sort()).toEqual(exported.sort())
})
