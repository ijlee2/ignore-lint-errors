import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findTemplateTags } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | findTemplateTags > file is not parseable (1)', function () {
  const file = normalizeFile([
    `const ListItem = <template>`,
    `  <li>`,
    `    {{concat`,
    `      "Item "`,
    `{{! @glint-expect-error: Incorrect type }}`,
    `      @index`,
    `    }}`,
    `  </li>`,
    `</template>;`,
    ``,
    `const List = <template>`,
    `  <ul>`,
    `    <ListItem @index={{1}} />`,
    `    <ListItem @index={{2}} />`,
    `    <ListItem @index={{3}} />`,
    `  </ul>`,
    `</template>;`,
    ``,
    `export default List;`,
  ]);

  const lineRanges = findTemplateTags(file).map(({ lineRange }) => lineRange);

  assert.deepStrictEqual(lineRanges, [
    {
      end: 9,
      start: 1,
    },
    {
      end: 17,
      start: 11,
    },
  ]);
});
