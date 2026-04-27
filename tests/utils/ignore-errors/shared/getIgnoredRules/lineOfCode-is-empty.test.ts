import { assert, test } from '@codemod-utils/tests';

import { getIgnoredRules } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | getIgnoredRules > lineOfCode is empty', function () {
  const file = '';

  const ignoredRules = getIgnoredRules(file, {
    ignoreDirective: 'eslint-disable-next-line',
  });

  assert.deepStrictEqual(ignoredRules, []);
});
