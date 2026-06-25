import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/oxlint/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/oxlint.js';

test('steps | create-options > oxlint', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
