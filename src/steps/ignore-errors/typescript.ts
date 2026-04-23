import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import { updateTemplates } from '@codemod-utils/ast-template-tag';
import { removeFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import {
  findLinesWithTemplate,
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
    const linesWithTemplate = findLinesWithTemplate(file);

    let lines = file.split(EOL);

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

    let newFile = lines.join(EOL);

    if (isParseable(newFile)) {
      writeFileSync(join(projectRoot, filePath), newFile, 'utf8');
      return;
    }

    // Ignore type checks in templates
    lines = file.split(EOL);
    let hasErrorInTemplate = false;

    lintErrors.forEach(({ line, message }) => {
      const erroredInTemplate = linesWithTemplate.some(
        ([lineStart, lineEnd]) => {
          return lineStart <= line && line <= lineEnd;
        },
      );

      if (erroredInTemplate) {
        hasErrorInTemplate = true;
        return;
      }

      const ignoreDirective = `// @ts-expect-error: ${message}`;

      lines.splice(line - 1, 0, ignoreDirective);
    });

    newFile = lines.join(EOL);

    if (hasErrorInTemplate) {
      newFile = updateTemplates(newFile, (code) => {
        const ignoreDirective = '{{! @glint-nocheck }}';

        return [ignoreDirective, code].join(EOL);
      });
    }

    writeFileSync(join(projectRoot, filePath), newFile, 'utf8');
  });

  removeFiles([outputFilePath], { projectRoot });
}
