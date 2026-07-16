import { assert, test } from '@codemod-utils/tests';

import { getRelativePath } from '../../../../../src/utils/linters/shared/index.js';

test('utils | linters | shared | getRelativePath > base case', function () {
  const projectRoot = 'tmp/eslint';
  const absoluteFilePath = 'tmp/eslint/app/components/example-1.gts';

  const filePath = getRelativePath(absoluteFilePath, projectRoot);

  assert.strictEqual(filePath, 'app/components/example-1.gts');
});
