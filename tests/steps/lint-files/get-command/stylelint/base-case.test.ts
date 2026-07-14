import { assert, test } from '@codemod-utils/tests';

import { getCommandStylelint } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/stylelint.js';

test('steps | lint-files | get-command > stylelint (base case)', function () {
  assert.strictEqual(
    getCommandStylelint(options),
    './node_modules/.bin/stylelint "**/*.{css,scss}" --formatter json --output-file .ignore-lint-errors/stylelint.txt --quiet 2>/dev/null',
  );
});
