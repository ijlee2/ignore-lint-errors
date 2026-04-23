import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { isParseable } from '../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript > isParseable', function () {
  let file = '';

  assert.strictEqual(isParseable(file), true);

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

  assert.strictEqual(isParseable(file), true);

  file = normalizeFile([
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

  assert.strictEqual(isParseable(file), true);

  file = normalizeFile([
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

  assert.strictEqual(isParseable(file), false);
});
