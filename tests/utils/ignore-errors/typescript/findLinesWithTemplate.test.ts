import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findLinesWithTemplate } from '../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript > findLinesWithTemplate', function () {
  let file = '';

  assert.deepStrictEqual(findLinesWithTemplate(file), []);

  file = normalizeFile([
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
