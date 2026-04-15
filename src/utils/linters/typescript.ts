import { EOL } from 'node:os';

export const outputFilePath = '.ignore-lint-errors/typescript.txt';

type LintError = {
  line: number;
  message: string;
};

type FilesWithErrors = {
  filePath: string;
  lintErrors: LintError[];
};

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
