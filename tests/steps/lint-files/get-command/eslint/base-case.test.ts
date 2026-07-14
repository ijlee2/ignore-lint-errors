import { assert, test } from '@codemod-utils/tests';

import { getCommandEslint } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/eslint.js';

test('steps | lint-files | get-command > eslint (base case)', function () {
  assert.strictEqual(
    getCommandEslint(options),
    './node_modules/.bin/eslint .  --format json --output-file .ignore-lint-errors/eslint.txt --quiet',
  );
});
