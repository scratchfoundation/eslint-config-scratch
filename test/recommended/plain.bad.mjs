import { ESLint } from 'eslint'

// foo isn't used
function foo() {
  const eslint = new ESLint({
    overrideConfigFile: true,
  })
  return eslint
}

// React isn't allowed in plain JS
export const myElement = <div>{'hello'}</div>

// foo2 isn't defined
export const bar = foo2()

// no-unused-vars: array destructuring requires _ prefix
export function badArray(arr) {
  const [first, second] = arr
  return second
}

// no-unused-vars: object rest sibling requires _ prefix
export function badRest(obj) {
  const { prop, ...rest } = obj
  return rest
}
