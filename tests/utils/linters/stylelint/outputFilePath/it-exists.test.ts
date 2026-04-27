import { assert, test } from '@codemod-utils/tests';

import { outputFilePath } from '../../../../../src/utils/linters/stylelint.js';

test('utils | linters | stylelint | outputFilePath > it exists', function () {
  assert.strictEqual(outputFilePath, '.ignore-lint-errors/stylelint.txt');
});
