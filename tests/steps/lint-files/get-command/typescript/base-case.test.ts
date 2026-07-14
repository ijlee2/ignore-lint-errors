import { assert, test } from '@codemod-utils/tests';

import { getCommandTypescript } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/typescript.js';

test('steps | lint-files | get-command > typescript (base case)', function () {
  assert.strictEqual(
    getCommandTypescript(options),
    './node_modules/.bin/ember-tsc > .ignore-lint-errors/typescript.txt',
  );
});
