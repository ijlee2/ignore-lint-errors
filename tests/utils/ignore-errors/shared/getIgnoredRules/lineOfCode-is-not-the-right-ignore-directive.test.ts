import { assert, test } from '@codemod-utils/tests';

import { getIgnoredRules } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | getIgnoredRules > lineOfCode is not the right ignore directive', function () {
  const file = '/* eslint-disable rule-2, rule-1, rule-3 */';

  const ignoredRules = getIgnoredRules(file, {
    ignoreDirective: 'eslint-disable-next-line',
  });

  assert.deepStrictEqual(ignoredRules, []);
});
