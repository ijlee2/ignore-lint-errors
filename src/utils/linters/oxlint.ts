import type { FilePathToData, FileWithErrors } from '../../types/index.js';
import { getFilesWithErrors, getMessage } from './shared/index.js';

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

type RawError = {
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
  const { diagnostics: results } = JSON.parse(file) as OxlintResult;

  const filePathToRawErrors = new Map<string, RawError[]>();

  results.forEach((result) => {
    const { code, filename: filePath, labels } = result;

    if (code === undefined) {
      return;
    }

    const line = labels[0].span.line;
    const ruleId = extractRuleId(code);

    const rawError = {
      line,
      ruleId,
    };

    if (filePathToRawErrors.has(filePath)) {
      filePathToRawErrors.get(filePath)!.push(rawError);
    } else {
      filePathToRawErrors.set(filePath, [rawError]);
    }
  });

  filePathToRawErrors.forEach((rawErrors, filePath) => {
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

export function parseOutputFile(file: string): FileWithErrors[] {
  const filePathToData = normalize(file);

  return getFilesWithErrors(filePathToData);
}
