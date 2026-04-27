import { join, sep } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { parseOutputFile } from '../../../../../src/utils/linters/stylelint.js';

test('utils | linters | stylelint | parseOutputFile > file has no errors', function () {
  const projectRoot = join(process.cwd(), 'tmp/stylelint').replaceAll(sep, '/');

  const outputFile = '[]';

  const filesWithErrors = parseOutputFile(outputFile, projectRoot);

  assert.deepStrictEqual(filesWithErrors, []);
});
