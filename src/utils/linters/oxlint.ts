import type { FilePathToData, FileWithErrors } from '../../types/index.js';
import { getFilesWithErrors } from './shared/index.js';

export const outputFilePath = '.ignore-lint-errors/oxlint.txt';

type Label = {
  span: {
    column: number;
    length: number;
    line: number;
    offset: number;
  };
};

type Diagnostic = {
  causes: string[];
  code?: string;
  filename: string;
  labels: [Label];
  message: string;
  related: string[];
  severity: 'error' | 'warning';
  url: string;
};

type Message = {
  line: number;
  ruleId: string;
};

// https://github.com/oxc-project/oxc/blob/oxlint_v1.71.0/apps/oxlint/src/output_formatter/json.rs#L79-L92
type OxlintResult = {
  diagnostics: Diagnostic[];
  number_of_files: number;
  number_of_rules: number;
  start_time: number;
  threads_count: number;
};

function extractRuleId(code: string): string {
  const matches = code.match(/^.+\((.+)\)$/);

  if (matches === null) {
    throw new Error(`Unable to extract rule ID (code: ${code})`);
  }

  return matches[1]!;
}

function normalize(file: string): FilePathToData {
  const filePathToData: FilePathToData = new Map();
  const { diagnostics } = JSON.parse(file) as OxlintResult;

  const filePathToMessages = new Map<string, Message[]>();

  diagnostics.forEach((diagnostic) => {
    const { code, filename: filePath, labels } = diagnostic;

    if (code === undefined) {
      return;
    }

    const line = labels[0].span.line;
    const ruleId = extractRuleId(code);

    const message = {
      line,
      ruleId,
    };

    if (filePathToMessages.has(filePath)) {
      filePathToMessages.get(filePath)!.push(message);
    } else {
      filePathToMessages.set(filePath, [message]);
    }
  });

  filePathToMessages.forEach((messages, filePath) => {
    const data = new Map<number, string>();
    const lineToRules = new Map<number, string[]>();

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

export function parseOutputFile(file: string): FileWithErrors[] {
  const filePathToData = normalize(file);

  return getFilesWithErrors(filePathToData);
}
