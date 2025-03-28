// Do not rename, migrate, or convert this file without checking the `wagoid/commitlint-github-action` documentation!
// `commitlint.config.mjs` is the only supported config file name as of `wagoid/commitlint-github-action@v6`

/**
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  extends: ['@commitlint/config-conventional'],
  ignores: [message => message.startsWith('chore(release):')],
}
