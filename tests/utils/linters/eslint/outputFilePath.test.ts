import { assert, test } from '@codemod-utils/tests';

import { outputFilePath } from '../../../../src/utils/linters/eslint.js';

test('utils | linters | eslint > outputFilePath', function () {
  assert.strictEqual(outputFilePath, '.ignore-lint-errors/eslint.txt');
});
