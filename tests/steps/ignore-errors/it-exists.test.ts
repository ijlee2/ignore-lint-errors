import { assert, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../src/steps/index.js';

test('steps | ignore-errors > it exists', function () {
  assert.ok(ignoreErrors);
});
