import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import type { Options } from '../types/index.js';
import { runEslint, runTypescript } from './lint-files/index.js';

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

    case 'typescript': {
      if (dependencies.typescript) {
        runTypescript(options);
      }

      break;
    }
  }
}
