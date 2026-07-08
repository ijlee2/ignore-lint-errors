import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { areTemplateTagsValid } from '../../utils/ignore-errors/shared/index.js';
import {
  ignoreErrors,
  ignoreErrorsFallback,
} from '../../utils/ignore-errors/typescript.js';
import {
  outputFilePath,
  parseOutputFile,
} from '../../utils/linters/typescript.js';

export function ignoreErrorsFromTypescript(options: Options): void {
  const { dependencies, projectRoot } = options;

  if (!dependencies.typescript) {
    return;
  }

  const outputFile = readFileSync(join(projectRoot, outputFilePath), 'utf8');
  const filesWithErrors = parseOutputFile(outputFile);

  filesWithErrors.forEach(({ filePath, lintErrors }) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');
    let newFile = ignoreErrors(file, lintErrors);

    if (!areTemplateTagsValid(newFile)) {
      newFile = ignoreErrorsFallback(file, lintErrors);
    }

    writeFileSync(join(projectRoot, filePath), newFile, 'utf8');
  });

  removeFiles([outputFilePath], { projectRoot });
}
