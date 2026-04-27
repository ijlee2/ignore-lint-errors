import { assert, test } from '@codemod-utils/tests';

import { lintFiles } from '../../../src/steps/index.js';

test('steps | lint-files > it exists', function () {
  assert.ok(lintFiles);
});
