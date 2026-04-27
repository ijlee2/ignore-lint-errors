import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  linter: 'stylelint',
  projectRoot: 'tmp/stylelint',
};

const options: Options = {
  dependencies: {
    eslint: false,
    glint: false,
    stylelint: true,
    typescript: false,
  },
  linter: 'stylelint',
  projectRoot: 'tmp/stylelint',
};

export { codemodOptions, options };
