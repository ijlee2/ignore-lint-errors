import type { FilePathToData, FileWithErrors } from '../../types/index.js';
import {
  getFilesWithErrors,
  getMessage,
  getRelativePath,
} from './shared/index.js';

export const outputFilePath = '.ignore-lint-errors/stylelint.txt';

// https://github.com/stylelint/stylelint/blob/17.9.0/types/stylelint/index.d.ts#L1255-L1281
type ResultWarning = {
  column: number;
  endColumn?: number;
  endLine?: number;
  fix?: unknown;
  line: number;
  rule: string;
  severity: 'error' | 'warning';
  stylelintType?: unknown;
  text: string;
  url?: string;
};

// https://github.com/stylelint/stylelint/blob/17.9.0/types/såtylelint/index.d.ts#L1286-L1307
type Result = {
  deprecations: {
    reference?: string;
    text: string;
  }[];
  errored?: boolean;
  ignored?: boolean;
  invalidOptionWarnings: {
    text: string;
  }[];
  parseErrors: unknown[];
  source: string;
  warnings: ResultWarning[];
};

type FileOutput = Result[];

function normalize(file: string, projectRoot: string): FilePathToData {
  const filePathToData: FilePathToData = new Map();
  const results = JSON.parse(file) as FileOutput;

  results.forEach((result) => {
    const { errored, source: absoluteFilePath, warnings: rawErrors } = result;
    const filePath = getRelativePath(absoluteFilePath, projectRoot);

    if (!errored) {
      return;
    }

    const lineToRules = new Map<number, string[]>();
    const data = new Map<number, string>();

    rawErrors.forEach(({ line, rule }) => {
      if (lineToRules.has(line)) {
        lineToRules.get(line)!.push(rule);
      } else {
        lineToRules.set(line, [rule]);
      }
    });

    lineToRules.forEach((rules, line) => {
      data.set(line, getMessage(rules));
    });

    filePathToData.set(filePath, data);
  });

  return filePathToData;
}

export function parseOutputFile(
  file: string,
  projectRoot: string,
): FileWithErrors[] {
  const filePathToData = normalize(file, projectRoot);

  return getFilesWithErrors(filePathToData);
}
