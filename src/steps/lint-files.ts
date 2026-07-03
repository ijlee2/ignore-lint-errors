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
  const { linter, projectRoot } = options;

  if (!existsSync(join(projectRoot, '.ignore-lint-errors'))) {
    mkdirSync(join(projectRoot, '.ignore-lint-errors'));
  }

  switch (linter) {
    case 'eslint': {
      runEslint(options);
      break;
    }

    case 'oxlint': {
      runOxlint(options);
      break;
    }

    case 'stylelint': {
      runStylelint(options);
      break;
    }

    case 'typescript': {
      runTypescript(options);
      break;
    }
  }
}
