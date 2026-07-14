import { assert, test } from '@codemod-utils/tests';

import { getCommandOxlint } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/oxlint.js';

test('steps | lint-files | get-command > oxlint (option src)', function () {
  assert.strictEqual(
    getCommandOxlint({
      ...options,
      src: ['app', 'tests'],
    }),
    './node_modules/.bin/oxlint "app" "tests" --format json --quiet > .ignore-lint-errors/oxlint.txt',
  );
});
