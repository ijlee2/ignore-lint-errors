import { relative, sep } from 'node:path';

import type { FilePathToData, FileWithErrors } from '../../types/index.js';
import { getFilesWithErrors } from './shared/index.js';

export const outputFilePath = '.ignore-lint-errors/stylelint.txt';

// https://github.com/stylelint/stylelint/blob/17.9.0/types/stylelint/index.d.ts#L1255-L1281
type StylelintWarning = {
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
type StylelintResult = {
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
  warnings: StylelintWarning[];
};

function normalize(file: string, projectRoot: string): FilePathToData {
  const filePathToData: FilePathToData = new Map();
  const records = JSON.parse(file) as StylelintResult[];

  records.forEach((record) => {
    const { errored, source: absoluteFilePath, warnings } = record;

    if (!errored) {
      return;
    }

    const filePath = relative(projectRoot, absoluteFilePath).replaceAll(
      sep,
      '/',
    );

    const lineToRules = new Map<number, string[]>();
    const data = new Map<number, string>();

    warnings.forEach(({ line, rule }) => {
      if (lineToRules.has(line)) {
        lineToRules.get(line)!.push(rule);
      } else {
        lineToRules.set(line, [rule]);
      }
    });

    lineToRules.forEach((rules, line) => {
      const message = Array.from(new Set(rules.sort())).join(', ');

      data.set(line, message);
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
