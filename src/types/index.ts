type CodemodOptions = {
  linter: Linter;
  projectRoot: string;
};

type Linter = 'eslint' | 'typescript';

type Options = {
  linter: Linter;
  projectRoot: string;
};

export type { CodemodOptions, Linter, Options };
