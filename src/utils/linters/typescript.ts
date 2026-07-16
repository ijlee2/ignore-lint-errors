import { EOL } from 'node:os';

import type { FilePathToData, FileWithErrors } from '../../types/index.js';
import { getFilesWithErrors } from './shared/index.js';

export const outputFilePath = '.ignore-lint-errors/typescript.txt';

function normalize(file: string): FilePathToData {
  const filePathToData: FilePathToData = new Map();
  const results = file.split(EOL);

  results.forEach((result) => {
    const matches = result.match(/^(.+)\((\d+),\d+\): error TS\d+: (.+)\.$/) as
      [ignore: unknown, filePath: string, line: string, message: string] | null;

    if (matches === null) {
      return;
    }

    const filePath = matches[1];
    const line = Number.parseInt(matches[2]);
    const message = 'Incorrect type';

    if (filePathToData.has(filePath)) {
      filePathToData.get(filePath)!.set(line, message);
    } else {
      filePathToData.set(filePath, new Map([[line, message]]));
    }
  });

  return filePathToData;
}

export function parseOutputFile(file: string): FileWithErrors[] {
  const filePathToData = normalize(file);

  return getFilesWithErrors(filePathToData);
}
