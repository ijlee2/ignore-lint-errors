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

// https://github.com/stylelint/stylelint/blob/17.9.0/types/stylelint/index.d.ts#L1286-L1307
export type StylelintResult = {
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
  source?: string;
  warnings: StylelintWarning[];
};
