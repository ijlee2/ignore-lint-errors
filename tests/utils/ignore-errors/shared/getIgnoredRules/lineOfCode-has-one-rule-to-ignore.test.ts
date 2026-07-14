import { assert, test } from '@codemod-utils/tests';

import { getIgnoredRules } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | getIgnoredRules > lineOfCode has one rule to ignore', function () {
  const file = '// eslint-disable-next-line rule-1';

  const ignoredRules = getIgnoredRules(file, {
    ignoreDirective: 'eslint-disable-next-line',
  });

  assert.deepStrictEqual(ignoredRules, ['rule-1']);
});
