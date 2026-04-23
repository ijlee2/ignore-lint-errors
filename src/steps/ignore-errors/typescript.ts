import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import { removeFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { findLinesWithTemplate } from '../../utils/ignore-errors/typescript.js';
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
    const lines = file.split(EOL);
    const linesWithTemplate = findLinesWithTemplate(file);

    lintErrors.forEach(({ line, message }) => {
      const erroredInTemplate = linesWithTemplate.some(
        ([lineStart, lineEnd]) => {
          return lineStart <= line && line <= lineEnd;
        },
      );

      const ignoreDirective = erroredInTemplate
        ? `{{! @glint-expect-error: ${message} }}`
        : `// @ts-expect-error: ${message}`;

      lines.splice(line - 1, 0, ignoreDirective);
    });

    writeFileSync(join(projectRoot, filePath), lines.join(EOL), 'utf8');
  });

  removeFiles([outputFilePath], { projectRoot });
}
