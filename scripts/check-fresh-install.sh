#!/usr/bin/env bash
# Install the packed package into an empty project, without this repo's lockfile, and lint with it.
# This catches a dependency release that breaks the published package even though the versions pinned in
# package-lock.json still work.
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT

cd "$repo_root"
tarball="$(npm pack --silent --ignore-scripts --pack-destination "$work_dir")"
eslint_range="$(node -p "require('./package.json').peerDependencies.eslint")"

consumer="$work_dir/consumer"
mkdir "$consumer"
cp test/recommended/plain.good.mjs test/recommended/plain.good.ts test/recommended/react.good.jsx \
  test/recommended/tsconfig.json "$consumer/"

cat >"$consumer/package.json" <<'EOF'
{ "name": "fresh-install-check", "private": true, "type": "module" }
EOF

cat >"$consumer/eslint.config.mjs" <<'EOF'
import { eslintConfigScratch } from 'eslint-config-scratch'

export default eslintConfigScratch.defineConfig(eslintConfigScratch.recommended, {
  files: ['**/*.ts'],
  languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
})
EOF

cat >"$consumer/prettier.config.mjs" <<'EOF'
import { prettierConfigScratch } from 'eslint-config-scratch'

export default prettierConfigScratch.recommended
EOF

cd "$consumer"
npm install --no-audit --no-fund --no-package-lock "$work_dir/$tarball" "eslint@$eslint_range" typescript

# The fixtures are known-good, so any error here means the installed package is broken.
npx --no -- eslint .

# Formatting a snippet loads the Prettier config and its plugins.
echo "import b from 'b'" | npx --no -- prettier --stdin-filepath check.mjs >/dev/null

echo "Fresh install of $tarball loads and lints."
