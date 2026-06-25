import { assert, test } from '@codemod-utils/tests';

import { parseOutputFile } from '../../../../../src/utils/linters/oxlint.js';

test('utils | linters | oxlint | parseOutputFile > file has no errors', function () {
  const outputFile = JSON.stringify({
    diagnostics: [],
  });

  const filesWithErrors = parseOutputFile(outputFile);

  assert.deepStrictEqual(filesWithErrors, []);
});
