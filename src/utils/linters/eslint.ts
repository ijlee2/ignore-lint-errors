import { relative, sep } from 'node:path';

import type { FilePathToData, FileWithErrors } from '../../types/index.js';
import { getFilesWithErrors } from './shared/index.js';

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

function normalize(file: string, projectRoot: string): FilePathToData {
  const filePathToData: FilePathToData = new Map();
  const records = JSON.parse(file) as EslintLintResult[];

  records.forEach((record) => {
    const { filePath: absoluteFilePath, messages } = record;

    const filePath = relative(projectRoot, absoluteFilePath).replaceAll(
      sep,
      '/',
    );

    const lineToRules = new Map<number, string[]>();
    const data = new Map<number, string>();

    messages.forEach(({ line, ruleId }) => {
      if (lineToRules.has(line)) {
        lineToRules.get(line)!.push(ruleId);
      } else {
        lineToRules.set(line, [ruleId]);
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
