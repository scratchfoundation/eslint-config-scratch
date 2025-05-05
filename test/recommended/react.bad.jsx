import ESLint from 'eslint'

// foo isn't used
function foo() {
  const eslint = new ESLint({
    overrideConfigFile: true,
  })
  return eslint
}

export const myElement = <div>{'hello'}</div>

// foo2 isn't defined
export const bar = foo2()
