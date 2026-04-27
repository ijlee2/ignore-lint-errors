#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
rm -r "tests/fixtures/eslint/output"
cp -r "tests/fixtures/eslint/input" "tests/fixtures/eslint/output"

./dist/bin/ignore-lint-errors.js \
  --linter eslint \
  --root "tests/fixtures/eslint/output"

rm -r "tests/fixtures/stylelint/output"
cp -r "tests/fixtures/stylelint/input" "tests/fixtures/stylelint/output"

./dist/bin/ignore-lint-errors.js \
  --linter stylelint \
  --root "tests/fixtures/stylelint/output"

rm -r "tests/fixtures/typescript/output"
cp -r "tests/fixtures/typescript/input" "tests/fixtures/typescript/output"

./dist/bin/ignore-lint-errors.js \
  --linter typescript \
  --root "tests/fixtures/typescript/output"
