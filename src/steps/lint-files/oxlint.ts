import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/oxlint.js';

function getSrc(options: Options): string {
  const { src } = options;

  if (src === undefined) {
    return '';
  }

  return src.map((token) => `"${token}"`).join(' ');
}

export function getCommandOxlint(options: Options): string | undefined {
  const { dependencies } = options;

  if (!dependencies.oxlint) {
    return undefined;
  }

  return [
    './node_modules/.bin/oxlint',
    getSrc(options),
    '--format json',
    '--quiet',
    `> ${outputFilePath}`,
  ].join(' ');
}
