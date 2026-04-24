import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import {
  ignoreErrors,
  ignoreErrorsFallback,
  isParseable,
} from '../../utils/ignore-errors/typescript.js';
import {
  outputFilePath,
  parseOutputFile,
} from '../../utils/linters/typescript.js';

export function ignoreErrorsFromTypescript(options: Options): void {
  const { projectRoot } = options;

  const outputFile = readFileSync(join(projectRoot, outputFilePath), 'utf8');
  const filesWithErrors = parseOutputFile(outputFile);

  filesWithErrors.forEach(({ filePath, lintErrors }) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');
    let newFile = ignoreErrors(file, lintErrors);

    if (!isParseable(newFile)) {
      newFile = ignoreErrorsFallback(file, lintErrors);
    }

    writeFileSync(join(projectRoot, filePath), newFile, 'utf8');
  });

  removeFiles([outputFilePath], { projectRoot });
}
