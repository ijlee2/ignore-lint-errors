import { assert, test } from '@codemod-utils/tests';

import { getMessage } from '../../../../../src/utils/linters/shared/index.js';

test('utils | linters | shared | get-message > rules is empty', function () {
  const rules: string[] = [];

  assert.strictEqual(getMessage(rules), '');
});
