import { ESLint } from 'eslint'

// @typescript-eslint/no-inferrable-types
// @typescript-eslint/no-unused-vars
const forty: number = 40

// @typescript-eslint/no-unused-vars
function foo(): ESLint {
  const eslint = new ESLint({
    overrideConfigFile: true,
  })
  return eslint
}

// @typescript-eslint/no-unsafe-call (`foo2` is an error-typed value)
// @typescript-eslint/no-unsafe-assignment (`foo2()` is an error-typed value)
export const bar = foo2()
