import { assert, test } from '@codemod-utils/tests';

import { getIgnoredRulesInTemplate } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | get-ignored-rules-in-template > lineOfCode is not the right ignore directive (1)', function () {
  const lineOfCode = '{{!-- eslint-disable rule-2, rule-1, rule-3 --}}';

  const ignoredRules = getIgnoredRulesInTemplate(lineOfCode, {
    ignoreDirective: 'eslint-disable-next-line',
  });

  assert.deepStrictEqual(ignoredRules, []);
});
