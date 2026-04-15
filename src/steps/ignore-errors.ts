import type { Options } from '../types/index.js';
import { ignoreErrorsFromEslint } from './ignore-errors/index.js';

export function ignoreErrors(options: Options): void {
  const { linter } = options;

  switch (linter) {
    case 'eslint': {
      ignoreErrorsFromEslint(options);
      break;
    }
  }
}
