import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/eslint/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/eslint.js';

test('steps | create-options > eslint', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
