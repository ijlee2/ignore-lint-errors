import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { isParseable } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | isParseable > file is not parseable (2)', function () {
  const file = normalizeFile([
    `{{! @glint-expect-error: Incorrect type }}`,
    `const ListItem = <template><li>{{concat "Item " @index}}</li></template>;`,
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

  assert.strictEqual(isParseable(file), false);
});
