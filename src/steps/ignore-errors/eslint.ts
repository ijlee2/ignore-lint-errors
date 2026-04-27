import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { ignoreErrors } from '../../utils/ignore-errors/eslint.js';
import { outputFilePath, parseOutputFile } from '../../utils/linters/eslint.js';

export function ignoreErrorsFromEslint(options: Options): void {
  const { projectRoot } = options;

  const outputFile = readFileSync(join(projectRoot, outputFilePath), 'utf8');
  const filesWithErrors = parseOutputFile(outputFile, projectRoot);

  filesWithErrors.forEach(({ filePath, lintErrors }) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');
    const newFile = ignoreErrors(file, lintErrors);

    writeFileSync(join(projectRoot, filePath), newFile, 'utf8');
  });

  removeFiles([outputFilePath], { projectRoot });
}
