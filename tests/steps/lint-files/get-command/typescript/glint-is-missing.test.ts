import { assert, test } from '@codemod-utils/tests';

import { getCommandTypescript } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/typescript.js';

test('steps | lint-files | get-command > typescript (glint is missing)', function () {
  assert.strictEqual(
    getCommandTypescript({
      ...options,
      dependencies: {
        ...options.dependencies,
        glint: false,
      },
    }),
    './node_modules/.bin/tsc > .ignore-lint-errors/typescript.txt',
  );
});
