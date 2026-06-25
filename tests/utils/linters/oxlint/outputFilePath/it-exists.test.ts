import { assert, test } from '@codemod-utils/tests';

import { outputFilePath } from '../../../../../src/utils/linters/oxlint.js';

test('utils | linters | oxlint | outputFilePath > it exists', function () {
  assert.strictEqual(outputFilePath, '.ignore-lint-errors/oxlint.txt');
});
