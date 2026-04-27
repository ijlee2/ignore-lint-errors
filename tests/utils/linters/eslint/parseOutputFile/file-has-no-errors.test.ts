import { join, sep } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { parseOutputFile } from '../../../../../src/utils/linters/eslint.js';

test('utils | linters | eslint | parseOutputFile > file has no errors', function () {
  const projectRoot = join(process.cwd(), 'tmp/eslint').replaceAll(sep, '/');

  const outputFile = '[]';

  const filesWithErrors = parseOutputFile(outputFile, projectRoot);

  assert.deepStrictEqual(filesWithErrors, []);
});
