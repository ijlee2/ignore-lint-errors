import type { FilePathToData, FileWithErrors } from '../../types/index.js';
import {
  getFilesWithErrors,
  getMessage,
  getRelativePath,
} from './shared/index.js';

export const outputFilePath = '.ignore-lint-errors/eslint.txt';

// https://github.com/eslint/eslint/blob/v9.39.4/lib/types/index.d.ts
type ResultMessageFix = {
  range: [number, number];
  text: string;
};

type ResultMessage = {
  column: number;
  endColumn?: number | undefined;
  endLine?: number | undefined;
  fatal?: true | undefined;
  fix?: ResultMessageFix | undefined;
  line: number;
  message: string;
  messageId?: string | undefined;
  nodeType?: string | undefined;
  ruleId: string;
  severity: 1 | 2;
  suggestions?:
    | {
        desc: string;
        fix: ResultMessageFix;
        messageId?: string | undefined;
      }[]
    | undefined;
};

type Result = {
  errorCount: number;
  fatalErrorCount: number;
  filePath: string;
  fixableErrorCount: number;
  fixableWarningCount: number;
  messages: ResultMessage[];
  output?: string | undefined;
  source?: string | undefined;
  stats: unknown;
  suppressedMessages: (ResultMessage & {
    suppressions: {
      justification: string;
      kind: string;
    }[];
  })[];
  usedDeprecatedRules: unknown[];
  warningCount: number;
};

type FileOutput = Result[];

function normalize(file: string, projectRoot: string): FilePathToData {
  const filePathToData: FilePathToData = new Map();
  const results = JSON.parse(file) as FileOutput;

  results.forEach((result) => {
    const { filePath: absoluteFilePath, messages: rawErrors } = result;
    const filePath = getRelativePath(absoluteFilePath, projectRoot);

    const lineToRules = new Map<number, string[]>();
    const data = new Map<number, string>();

    rawErrors.forEach(({ line, ruleId }) => {
      if (lineToRules.has(line)) {
        lineToRules.get(line)!.push(ruleId);
      } else {
        lineToRules.set(line, [ruleId]);
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
