import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findTemplateTags } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | findTemplateTags > file is parseable (2)', function () {
  const file = normalizeFile([
    `import { concat } from '@ember/helper';`,
    ``,
    `const ListItem = <template>`,
    `  <li>`,
    `    {{concat`,
    `      "Item "`,
    `      @index`,
    `    }}`,
    `  </li>`,
    `</template>;`,
    ``,
    `const List = <template>`,
    `  <ul>`,
    `    <ListItem {{! @glint-expect-error: Incorrect type }} @index={{1}} />`,
    `{{! @glint-expect-error: Incorrect type }}`,
    `    <ListItem @index={{true}} />`,
    `    <ListItem @index={{3}} />`,
    `  </ul>`,
    `</template>;`,
    ``,
    `export default List;`,
  ]);

  const lineRanges = findTemplateTags(file).map(({ lineRange }) => lineRange);

  assert.deepStrictEqual(lineRanges, [
    {
      end: 10,
      start: 3,
    },
    {
      end: 19,
      start: 12,
    },
  ]);
});
