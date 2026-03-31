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

// @typescript-eslint/no-unused-vars: array destructuring requires _ prefix
export function badArray(arr: number[]) {
  const [first, second] = arr
  return second
}

// @typescript-eslint/no-unused-vars: object rest sibling requires _ prefix
export function badRest(obj: { prop: string; bar: number }) {
  const { prop, ...rest } = obj
  return rest
}
