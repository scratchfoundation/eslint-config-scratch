import { ESLint } from 'eslint'

function foo(): ESLint {
  const eslint = new ESLint({
    overrideConfigFile: true,
  })
  return eslint
}

export const bar = foo()

// @typescript-eslint/no-empty-function is 'off'
export function noop(): void {}

// @typescript-eslint/no-unused-vars: argsIgnorePattern '^_'
export function greet(_name: string): string {
  return 'hello'
}

// @typescript-eslint/no-unused-vars: varsIgnorePattern '^_' (array destructuring)
export function firstOf<T>(arr: T[]): T | undefined {
  const [_head, ...tail] = arr
  return tail[0]
}

// @typescript-eslint/no-unused-vars: varsIgnorePattern '^_' (object rest sibling)
export function withoutFoo(obj: { foo: string; bar: number }): { bar: number } {
  const { foo: _foo, ...rest } = obj
  return rest
}
