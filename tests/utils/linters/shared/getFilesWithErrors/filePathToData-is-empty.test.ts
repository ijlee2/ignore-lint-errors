import { assert, test } from '@codemod-utils/tests';

import type { FilePathToData } from '../../../../../src/types/index.js';
import { getFilesWithErrors } from '../../../../../src/utils/linters/shared/index.js';

test('utils | linters | shared | getFilesWithErrors > filePathToData is empty', function () {
  const filePathToData: FilePathToData = new Map();

  const filesWithErrors = getFilesWithErrors(filePathToData);

  assert.deepStrictEqual(filesWithErrors, []);
});
