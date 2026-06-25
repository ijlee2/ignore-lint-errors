import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  linter: 'oxlint',
  projectRoot: 'tmp/oxlint',
  src: undefined,
};

const options: Options = {
  dependencies: {
    eslint: false,
    glint: false,
    oxlint: true,
    stylelint: false,
    typescript: false,
  },
  linter: 'oxlint',
  projectRoot: 'tmp/oxlint',
  src: undefined,
};

export { codemodOptions, options };
