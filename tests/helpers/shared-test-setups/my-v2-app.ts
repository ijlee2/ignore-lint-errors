import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  linter: 'eslint',
  projectRoot: 'tmp/my-v2-app',
};

const options: Options = {
  linter: 'eslint',
  projectRoot: 'tmp/my-v2-app',
};

export { codemodOptions, options };
