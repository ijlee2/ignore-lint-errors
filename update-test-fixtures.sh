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
rm -r "tests/fixtures/my-v2-app/output"
cp -r "tests/fixtures/my-v2-app/input" "tests/fixtures/my-v2-app/output"

./dist/bin/ignore-lint-errors.js \
  --root "tests/fixtures/my-v2-app/output"
