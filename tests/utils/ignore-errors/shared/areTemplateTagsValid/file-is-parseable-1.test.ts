import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { areTemplateTagsValid } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | areTemplateTagsValid > file is parseable (1)', function () {
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

  assert.strictEqual(areTemplateTagsValid(file), true);
});
