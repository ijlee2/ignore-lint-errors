import { assert, test } from '@codemod-utils/tests';

import { outputFilePath } from '../../../../src/utils/linters/typescript.js';

test('utils | linters | typescript > outputFilePath', function () {
  assert.strictEqual(outputFilePath, '.ignore-lint-errors/typescript.txt');
});
