// Type-checked by `npm run test:types`. The `exports` map makes files inside the package private.
// @ts-expect-error Deep imports aren't part of the API.
import * as eslintConfig from 'eslint-config-scratch/lib/eslint.mjs'

export { eslintConfig }
