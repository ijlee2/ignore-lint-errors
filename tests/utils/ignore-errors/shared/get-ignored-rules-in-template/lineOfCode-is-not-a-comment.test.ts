import { assert, test } from '@codemod-utils/tests';

import { getIgnoredRulesInTemplate } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | get-ignored-rules-in-template > lineOfCode is not a comment', function () {
  const lineOfCode = '  <div class="message">Hello Vite!</div>';

  const ignoredRules = getIgnoredRulesInTemplate(lineOfCode, {
    ignoreDirective: 'eslint-disable-next-line',
  });

  assert.deepStrictEqual(ignoredRules, []);
});
