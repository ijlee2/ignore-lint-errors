import { createOptions, ignoreErrors, lintFiles } from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  lintFiles(options);
  ignoreErrors(options);
}
