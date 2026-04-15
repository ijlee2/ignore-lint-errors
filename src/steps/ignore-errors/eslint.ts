import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { outputFilePath, parseOutputFile } from '../../utils/linters/eslint.js';

export function ignoreErrorsFromEslint(options: Options): void {
  const { projectRoot } = options;

  if (!existsSync(join(projectRoot, outputFilePath))) {
    return;
  }

  const outputFile = readFileSync(join(projectRoot, outputFilePath), 'utf8');
  const filesWithErrors = parseOutputFile(outputFile);

  filesWithErrors.forEach(({ absoluteFilePath, lintErrors }) => {
    const file = readFileSync(absoluteFilePath, 'utf8');
    const lines = file.split('\n');

    lintErrors.forEach(({ line, message }) => {
      const ignoreDirective = `// @ts-expect-error: ${message}`;

      lines.splice(line - 1, 0, ignoreDirective);
    });

    writeFileSync(absoluteFilePath, lines.join('\n'), 'utf8');
  });

  removeFiles([outputFilePath], { projectRoot });
}
