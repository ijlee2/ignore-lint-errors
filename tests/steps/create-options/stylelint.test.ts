import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/stylelint/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/stylelint.js';

test('steps | create-options > stylelint', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
