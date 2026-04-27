import { assert, test } from '@codemod-utils/tests';

import { parseOutputFile } from '../../../../../src/utils/linters/typescript.js';

test('utils | linters | typescript | parseOutputFile > file has no errors', function () {
  const outputFile = '';

  const filesWithErrors = parseOutputFile(outputFile);

  assert.deepStrictEqual(filesWithErrors, []);
});
