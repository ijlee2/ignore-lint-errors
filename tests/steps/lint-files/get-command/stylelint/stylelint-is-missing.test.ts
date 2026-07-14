import { assert, test } from '@codemod-utils/tests';

import { getCommandStylelint } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/stylelint.js';

test('steps | lint-files | get-command > stylelint (stylelint is missing)', function () {
  assert.strictEqual(
    getCommandStylelint({
      ...options,
      dependencies: {
        ...options.dependencies,
        stylelint: false,
      },
    }),
    undefined,
  );
});
