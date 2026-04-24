import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  linter: 'eslint',
  projectRoot: 'tmp/my-v2-app',
};

const options: Options = {
  dependencies: {
    eslint: false,
    glint: false,
    stylelint: false,
    typescript: false,
  },
  linter: 'eslint',
  projectRoot: 'tmp/my-v2-app',
};

export { codemodOptions, options };
