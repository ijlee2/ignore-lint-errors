import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findLinesWithTemplate } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | findLinesWithTemplate > file has template tags', function () {
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

  assert.deepStrictEqual(findLinesWithTemplate(file), [
    [3, 5],
    [7, 13],
  ]);
});
