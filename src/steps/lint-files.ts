import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import type { Options } from '../types/index.js';
import {
  runEslint,
  runOxlint,
  runStylelint,
  runTypescript,
} from './lint-files/index.js';

export function lintFiles(options: Options): void {
  const { dependencies, linter, projectRoot } = options;

  if (!existsSync(join(projectRoot, '.ignore-lint-errors'))) {
    mkdirSync(join(projectRoot, '.ignore-lint-errors'));
  }

  switch (linter) {
    case 'eslint': {
      if (dependencies.eslint) {
        runEslint(options);
      }

      break;
    }

    case 'oxlint': {
      if (dependencies.oxlint) {
        runOxlint(options);
      }

      break;
    }

    case 'stylelint': {
      if (dependencies.stylelint) {
        runStylelint(options);
      }

      break;
    }

    case 'typescript': {
      if (dependencies.typescript) {
        runTypescript(options);
      }

      break;
    }
  }
}
