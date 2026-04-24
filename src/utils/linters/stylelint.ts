import { relative, sep } from 'node:path';

import type { FilesWithErrors, LintError } from '../../types/index.js';

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

export function parseOutputFile(
  file: string,
  projectRoot: string,
): FilesWithErrors[] {
  const filePathToData = new Map<string, Map<number, string[]>>();
  const records = JSON.parse(file) as StylelintResult[];

  records.forEach((record) => {
    const { errored, source: absoluteFilePath, warnings } = record;

    if (!errored) {
      return;
    }

    const data = new Map<number, string[]>();

    warnings.forEach(({ line, rule }) => {
      if (data.has(line)) {
        data.get(line)!.push(rule);
      } else {
        data.set(line, [rule]);
      }
    });

    const filePath = relative(projectRoot, absoluteFilePath).replaceAll(
      sep,
      '/',
    );

    filePathToData.set(filePath, data);
  });

  const filesWithErrors: FilesWithErrors[] = [];

  filePathToData.forEach((data, filePath) => {
    const lintErrors: LintError[] = [];

    data.forEach((allMessages, line) => {
      const ruleIds = Array.from(new Set(allMessages.sort()));

      lintErrors.push({
        line,
        message: ruleIds.join(', '),
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
