import type { Options } from '../types/index.js';
import {
  ignoreErrorsFromEslint,
  ignoreErrorsFromOxlint,
  ignoreErrorsFromStylelint,
  ignoreErrorsFromTypescript,
} from './ignore-errors/index.js';

export function ignoreErrors(options: Options): void {
  const { linter } = options;

  switch (linter) {
    case 'eslint': {
      ignoreErrorsFromEslint(options);
      break;
    }

    case 'oxlint': {
      ignoreErrorsFromOxlint(options);
      break;
    }

    case 'stylelint': {
      ignoreErrorsFromStylelint(options);
      break;
    }

    case 'typescript': {
      ignoreErrorsFromTypescript(options);
      break;
    }
  }
}
