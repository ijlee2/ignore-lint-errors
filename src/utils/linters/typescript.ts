import { EOL } from 'node:os';

import type { FilesWithErrors, LintError } from '../../types/index.js';

export const outputFilePath = '.ignore-lint-errors/typescript.txt';

export function parseOutputFile(file: string): FilesWithErrors[] {
  const filePathToData = new Map<string, Map<number, string[]>>();

  file.split(EOL).forEach((str) => {
    const matches = str.match(/^(.+)\((\d+),\d+\): error TS\d+: (.+)\.$/) as
      | [ignore: unknown, filePath: string, line: string, message: string]
      | null;

    if (matches === null) {
      return;
    }

    const filePath = matches[1];
    const line = Number.parseInt(matches[2]);
    const message = matches[3];

    if (filePathToData.has(filePath)) {
      if (filePathToData.get(filePath)!.has(line)) {
        filePathToData.get(filePath)!.get(line)!.push(message);
      } else {
        filePathToData.get(filePath)!.set(line, [message]);
      }
    } else {
      filePathToData.set(filePath, new Map([[line, [message]]]));
    }
  });

  const filesWithErrors: FilesWithErrors[] = [];

  filePathToData.forEach((data, filePath) => {
    const lintErrors: LintError[] = [];

    data.forEach((_allMessages, line) => {
      lintErrors.push({
        line,
        message: 'Incorrect type',
      });
    });

    if (lintErrors.length === 0) {
      return;
    }

    lintErrors.sort((a, b) => {
      if (a.line < b.line) {
        return 1;
      }

      if (b.line < a.line) {
        return -1;
      }

      return 0;
    });

    filesWithErrors.push({
      filePath,
      lintErrors,
    });
  });

  return filesWithErrors;
}
