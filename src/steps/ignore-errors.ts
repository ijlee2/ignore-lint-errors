import type { Options } from '../types/index.js';
import { ignoreErrorsFromEslint } from './ignore-errors/index.js';

export function ignoreErrors(options: Options): void {
  const { dependencies, linter } = options;

  switch (linter) {
    case 'eslint': {
      if (dependencies.eslint) {
        ignoreErrorsFromEslint(options);
      }

      break;
    }
  }
}
