import { assert, test } from '@codemod-utils/tests';

import { getCommandOxlint } from '../../../../src/steps/lint-files/index.js';
import { options } from '../../../helpers/shared-test-setups/oxlint.js';

test('steps | lint-files | get-command > oxlint', function () {
  assert.strictEqual(
    getCommandOxlint(options),
    './node_modules/.bin/oxlint  --format json --quiet > .ignore-lint-errors/oxlint.txt',
  );
});
