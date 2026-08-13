import { assert, test } from '@codemod-utils/tests';

import { getIgnoredRulesInTemplate } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | get-ignored-rules-in-template > lineOfCode is an ignore directive (1)', function () {
  const lineOfCode =
    '  {{!--  eslint-disable-next-line  rule-2, rule-1,  rule-3  --}}';

  const ignoredRules = getIgnoredRulesInTemplate(lineOfCode, {
    ignoreDirective: 'eslint-disable-next-line',
  });

  assert.deepStrictEqual(ignoredRules, ['rule-2', 'rule-1', 'rule-3']);
});
