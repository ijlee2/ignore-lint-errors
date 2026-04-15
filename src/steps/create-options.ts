import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { linter, projectRoot } = codemodOptions;

  return {
    linter,
    projectRoot,
  };
}
