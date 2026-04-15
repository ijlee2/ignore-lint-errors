type CodemodOptions = {
  linter: Linter;
  projectRoot: string;
};

type Linter = 'eslint';

type Options = {
  linter: Linter;
  projectRoot: string;
};

export type { CodemodOptions, Linter, Options };
