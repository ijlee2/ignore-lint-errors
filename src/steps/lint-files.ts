import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import type { Options } from '../types/index.js';
import { runEslint } from './lint-files/index.js';

export function lintFiles(options: Options): void {
  const { linter, projectRoot } = options;
  const tempDir = '.ignore-lint-errors';

  if (!existsSync(join(projectRoot, tempDir))) {
    mkdirSync(join(projectRoot, tempDir));
  }

  switch (linter) {
    case 'eslint': {
      runEslint(options);
      break;
    }
  }
}
