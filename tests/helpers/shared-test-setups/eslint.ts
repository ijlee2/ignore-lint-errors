import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  linter: 'eslint',
  projectRoot: 'tmp/eslint',
};

const options: Options = {
  dependencies: {
    eslint: true,
    glint: false,
    stylelint: false,
    typescript: false,
  },
  linter: 'eslint',
  projectRoot: 'tmp/eslint',
};

export { codemodOptions, options };
