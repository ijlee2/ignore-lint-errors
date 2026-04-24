import { relative, sep } from 'node:path';

import type { FilesWithErrors, LintError } from '../../types/index.js';

export const outputFilePath = '.ignore-lint-errors/eslint.txt';

// https://github.com/eslint/eslint/blob/v9.39.4/lib/types/index.d.ts
type EslintFix = {
  range: [number, number];
  text: string;
};

type EslintLintMessage = {
  column: number;
  endColumn?: number | undefined;
  endLine?: number | undefined;
  fatal?: true | undefined;
  fix?: EslintFix | undefined;
  line: number;
  message: string;
  messageId?: string | undefined;
  nodeType?: string | undefined;
  ruleId: string;
  severity: 1 | 2;
  suggestions?:
    | {
        desc: string;
        fix: EslintFix;
        messageId?: string | undefined;
      }[]
    | undefined;
};

type EslintLintResult = {
  errorCount: number;
  fatalErrorCount: number;
  filePath: string;
  fixableErrorCount: number;
  fixableWarningCount: number;
  messages: EslintLintMessage[];
  output?: string | undefined;
  source?: string | undefined;
  stats: unknown;
  suppressedMessages: (EslintLintMessage & {
    suppressions: {
      justification: string;
      kind: string;
    }[];
  })[];
  usedDeprecatedRules: unknown[];
  warningCount: number;
};

export function parseOutputFile(
  file: string,
  projectRoot: string,
): FilesWithErrors[] {
  const filePathToData = new Map<string, Map<number, string[]>>();
  const records = JSON.parse(file) as EslintLintResult[];

  records.forEach((record) => {
    const { filePath: absoluteFilePath, messages } = record;
    const data = new Map<number, string[]>();

    messages.forEach(({ line, ruleId }) => {
      if (data.has(line)) {
        data.get(line)!.push(ruleId);
      } else {
        data.set(line, [ruleId]);
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
