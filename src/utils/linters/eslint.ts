export const outputFilePath = '.ignore-lint-errors/eslint.txt';

export const command = [
  './node_modules/.bin/eslint',
  '--format json',
  `--output-file ${outputFilePath}`,
  '--quiet',
].join(' ');
