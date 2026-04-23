type CodemodOptions = {
  linter: Linter;
  projectRoot: string;
};

type Dependencies = {
  eslint: boolean;
  glint: boolean;
  typescript: boolean;
};

type FilesWithErrors = {
  filePath: string;
  lintErrors: LintError[];
};

type Linter = 'eslint' | 'typescript';

type LintError = {
  line: number;
  message: string;
};

type Options = {
  dependencies: Dependencies;
  linter: Linter;
  projectRoot: string;
};

export type {
  CodemodOptions,
  Dependencies,
  FilesWithErrors,
  Linter,
  LintError,
  Options,
};
