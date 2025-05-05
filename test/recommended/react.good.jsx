import ESLint from 'eslint'

function foo() {
  const eslint = new ESLint({
    overrideConfigFile: true,
  })
  return eslint
}

export const myElement = <div>{'hello'}</div>

export const bar = foo()
