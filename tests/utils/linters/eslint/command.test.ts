import { assert, test } from '@codemod-utils/tests';

import { command } from '../../../../src/utils/linters/eslint.js';

test('utils | lint-files | eslint > command', function () {
  assert.strictEqual(
    command,
    './node_modules/.bin/eslint --format json --output-file .ignore-lint-errors/eslint.txt --quiet',
  );
});
