import { assert, test } from '@codemod-utils/tests';

import { getCommandEslint } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/eslint.js';

test('steps | lint-files | get-command > eslint (option src)', function () {
  assert.strictEqual(
    getCommandEslint({
      ...options,
      src: ['app', 'tests'],
    }),
    './node_modules/.bin/eslint "app" "tests"  --format json --output-file .ignore-lint-errors/eslint.txt --quiet',
  );
});
