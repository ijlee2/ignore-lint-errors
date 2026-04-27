import { assert, test } from '@codemod-utils/tests';

import { getIgnoredRules } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | getIgnoredRules > lineOfCode is not an ignore directive', function () {
  const file = '// Some comment';

  const ignoredRules = getIgnoredRules(file, {
    ignoreDirective: 'eslint-disable-next-line',
  });

  assert.deepStrictEqual(ignoredRules, []);
});
