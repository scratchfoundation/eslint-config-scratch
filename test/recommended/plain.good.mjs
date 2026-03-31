import { ESLint } from 'eslint'

function foo() {
  const eslint = new ESLint({
    overrideConfigFile: true,
  })
  return eslint
}

export const bar = foo()

// no-unused-vars: argsIgnorePattern '^_'
export function greet(_name) {
  return 'hello'
}

// no-unused-vars: varsIgnorePattern '^_' (array destructuring)
export function firstOf(arr) {
  const [_head, ...tail] = arr
  return tail[0]
}

// no-unused-vars: varsIgnorePattern '^_' (object rest sibling)
export function withoutFoo(obj) {
  const { foo: _foo, ...rest } = obj
  return rest
}
