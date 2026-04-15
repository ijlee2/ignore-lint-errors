import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { outputFilePath, parseOutputFile } from '../../utils/linters/eslint.js';

export function ignoreErrorsFromEslint(options: Options): void {
  const { projectRoot } = options;

  const outputFile = readFileSync(join(projectRoot, outputFilePath), 'utf8');
  const filesWithErrors = parseOutputFile(outputFile);

  filesWithErrors.forEach(({ absoluteFilePath, lintErrors }) => {
    const file = readFileSync(absoluteFilePath, 'utf8');
    const lines = file.split(EOL);

    lintErrors.forEach(({ line, message }) => {
      const ignoreDirective = `// @ts-expect-error: ${message}`;

      lines.splice(line - 1, 0, ignoreDirective);
    });

    writeFileSync(absoluteFilePath, lines.join(EOL), 'utf8');
  });

  removeFiles([outputFilePath], { projectRoot });
}
