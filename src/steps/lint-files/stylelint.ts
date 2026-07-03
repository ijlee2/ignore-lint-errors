import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/stylelint.js';

function getSrc(options: Options): string {
  const { src } = options;

  if (src === undefined) {
    return '"**/*.{css,scss}"';
  }

  return src.map((token) => `"${token}"`).join(' ');
}

export function getCommandStylelint(options: Options): string | undefined {
  const { dependencies } = options;

  if (!dependencies.stylelint) {
    return undefined;
  }

  return [
    './node_modules/.bin/stylelint',
    getSrc(options),
    '--formatter json',
    `--output-file ${outputFilePath}`,
    '--quiet',
    '2>/dev/null', // Suppress output to process.stderr
  ].join(' ');
}
