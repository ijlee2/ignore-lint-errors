import { assert, test } from '@codemod-utils/tests';

import { getMessage } from '../../../../../src/utils/linters/shared/index.js';

test('utils | linters | shared | getMessage > rules is not empty', function () {
  const rules = ['rule-2', 'rule-3', 'rule-1'];

  assert.strictEqual(getMessage(rules), 'rule-1, rule-2, rule-3');
});
