import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  linter: 'typescript',
  projectRoot: 'tmp/typescript',
};

const options: Options = {
  dependencies: {
    eslint: false,
    glint: true,
    stylelint: false,
    typescript: true,
  },
  linter: 'typescript',
  projectRoot: 'tmp/typescript',
};

export { codemodOptions, options };
