import { assert, test } from '@codemod-utils/tests';

import { getCommandEslint } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/eslint.js';

test('steps | lint-files | get-command > eslint (eslint is missing)', function () {
  assert.strictEqual(
    getCommandEslint({
      ...options,
      dependencies: {
        ...options.dependencies,
        eslint: false,
      },
    }),
    undefined,
  );
});
