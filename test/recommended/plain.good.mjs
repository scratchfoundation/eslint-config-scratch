import { ESLint } from 'eslint'

function foo() {
  const eslint = new ESLint({
    overrideConfigFile: true,
  })
  return eslint
}

export const bar = foo()
