import { assert, test } from '@codemod-utils/tests';

import { getCommandOxlint } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/oxlint.js';

test('steps | lint-files | get-command > oxlint (oxlint is missing)', function () {
  assert.strictEqual(
    getCommandOxlint({
      ...options,
      dependencies: {
        ...options.dependencies,
        oxlint: false,
      },
    }),
    undefined,
  );
});
