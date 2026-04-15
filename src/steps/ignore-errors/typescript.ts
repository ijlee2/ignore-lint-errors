import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import { findTemplateTags } from '@codemod-utils/ast-template-tag';
import { removeFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import {
  outputFilePath,
  parseOutputFile,
} from '../../utils/linters/typescript.js';

function findLinesWithTemplate(file: string): [number, number][] {
  function getLOC(file: string): number {
    const matches = file.match(/\r?\n/g);

    return (matches ?? []).length;
  }

  const templateTags = findTemplateTags(file);
  const linesWithTemplate: [number, number][] = [];

  templateTags.forEach((templateTag) => {
    const { range } = templateTag;

    const lineStart = getLOC(file.substring(0, range.startChar)) + 1;
    const lineEnd = getLOC(file.substring(0, range.endChar)) + 1;

    linesWithTemplate.push([lineStart, lineEnd]);
  });

  return linesWithTemplate;
}

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
