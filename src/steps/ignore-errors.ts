import type { Options } from '../types/index.js';
import {
  ignoreErrorsFromEslint,
  ignoreErrorsFromStylelint,
  ignoreErrorsFromTypescript,
} from './ignore-errors/index.js';

export function ignoreErrors(options: Options): void {
  const { dependencies, linter } = options;

  switch (linter) {
    case 'eslint': {
      if (dependencies.eslint) {
        ignoreErrorsFromEslint(options);
      }

      break;
    }

    case 'stylelint': {
      if (dependencies.stylelint) {
        ignoreErrorsFromStylelint(options);
      }

      break;
    }

    case 'typescript': {
      if (dependencies.typescript) {
        ignoreErrorsFromTypescript(options);
      }

      break;
    }
  }
}
