import { ESLint } from 'eslint'
import path from 'path'
import util from 'util'
import { beforeAll, describe, expect, test } from 'vitest'

/**
 * @typedef {object} EslintTestInfo
 * @property {string} name - the title/message for this test
 * @property {string} filePath - the path to the file to lint
 * @property {number} warningCount - the number of warnings to expect
 * @property {number} errorCount - the number of errors to expect
 */

// TSX is omitted because TypeScript insists on fully knowing the React types,
// and I would rather not add React as a dependency of eslint-config-scratch.
/** @type {Record<string, EslintTestInfo[]>} */
const testInfo = {
  recommended: [
    {
      name: 'Plain JS (good)',
      filePath: 'plain.good.mjs',
      warningCount: 0,
      errorCount: 0,
    },
    {
      name: 'React JSX (good)',
      filePath: 'react.good.jsx',
      warningCount: 0,
      errorCount: 0,
    },
    {
      name: 'Plain JS (bad)',
      filePath: 'plain.bad.mjs',
      warningCount: 0,
      errorCount: 3,
    },
    {
      name: 'React JSX (bad)',
      filePath: 'react.bad.jsx',
      warningCount: 0,
      errorCount: 2,
    },
    {
      name: 'Plain TS (good)',
      filePath: 'plain.good.ts',
      warningCount: 0,
      errorCount: 0,
    },
    {
      name: 'Plain TS (bad)',
      filePath: 'plain.bad.ts',
      warningCount: 0,
      errorCount: 5,
    },
  ],
  legacy: [
    {
      name: 'Plain JS (good)',
      filePath: 'plain.good.mjs',
      warningCount: 0,
      errorCount: 0,
    },
    {
      name: 'React JSX (good)',
      filePath: 'react.good.jsx',
      warningCount: 0,
      errorCount: 0,
    },
    {
      name: 'Plain JS (bad)',
      filePath: 'plain.bad.mjs',
      warningCount: 0,
      errorCount: 4,
    },
    {
      name: 'React JSX (bad)',
      filePath: 'react.bad.jsx',
      warningCount: 0,
      errorCount: 2,
    },
    {
      name: 'Plain TS (good)',
      filePath: 'plain.good.ts',
      warningCount: 0,
      errorCount: 0,
    },
    {
      name: 'Plain TS (bad)',
      filePath: 'plain.bad.ts',
      warningCount: 0,
      errorCount: 5,
    },
  ],
}

/**
 * Create a snapshot of a lint message.
 * Excludes properties that may change without affecting correctness, such as human-readable text.
 * @param {ESLint.LintMessage} result - the lint message to filter
 * @returns {object} a filtered snapshot of the lint message
 */
const messageSnapshot = result =>
  Object.fromEntries(
    Object.entries(result).filter(([k]) =>
      ['line', 'column', 'endLine', 'endColumn', 'messageId', 'nodeType', 'ruleId'].includes(k),
    ),
  )

test('make sure eslint works at all', async () => {
  const source = 'foo(42)'
  const eslint = new ESLint({
    overrideConfigFile: true,
  })
  const results = await eslint.lintText(source)
  expect(results).toBeDefined()
  expect(results.length).toBe(1)
  expect(results[0].warningCount).toEqual(0)
  expect(results[0].errorCount).toEqual(0)
})

describe.concurrent.for(Object.entries(testInfo))('$0', ([subdir, testList]) => {
  /**
   * @type {ESLint.LintResult[]}
   */
  let results

  // Linting one file at a time takes much longer
  beforeAll(async () => {
    const eslint = new ESLint({
      overrideConfigFile: path.resolve(import.meta.dirname, subdir, 'eslint.config.mjs'),
    })
    results = await eslint.lintFiles(testList.map(info => path.resolve(import.meta.dirname, subdir, info.filePath)))
  })

  test('Results container', () => {
    expect(results).toBeDefined()
    expect(results.length).toBe(testList.length)
  })

  testList.forEach(({ name, filePath, warningCount, errorCount }, i) => {
    test(name, () => {
      expect(path.resolve(results[i].filePath)).toBe(path.resolve(import.meta.dirname, subdir, filePath))
      expect(results[i].warningCount, util.inspect(results[i])).toBe(warningCount)
      expect(results[i].errorCount, util.inspect(results[i])).toBe(errorCount)
      expect(results[i].messages.map(messageSnapshot), util.inspect(results[i].messages)).toMatchSnapshot()
    })
  })
})
