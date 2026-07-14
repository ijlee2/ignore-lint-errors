import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findTemplateTags } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | findTemplateTags > file is parseable (1)', function () {
  const file = normalizeFile([
    `import { concat } from '@ember/helper';`,
    ``,
    `const ListItem = <template>`,
    `  <li>{{concat "Item " @index}}</li>`,
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
      end: 5,
      start: 3,
    },
    {
      end: 13,
      start: 7,
    },
  ]);
});
