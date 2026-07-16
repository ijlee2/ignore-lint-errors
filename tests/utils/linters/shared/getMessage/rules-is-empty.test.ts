import { assert, test } from '@codemod-utils/tests';

import { getMessage } from '../../../../../src/utils/linters/shared/index.js';

test('utils | linters | shared | getMessage > rules is empty', function () {
  const rules: string[] = [];

  assert.strictEqual(getMessage(rules), '');
});
