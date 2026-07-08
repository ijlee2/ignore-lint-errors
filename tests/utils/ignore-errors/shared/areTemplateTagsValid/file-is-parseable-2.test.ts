import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { areTemplateTagsValid } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | areTemplateTagsValid > file is parseable (2)', function () {
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

  assert.strictEqual(areTemplateTagsValid(file), true);
});
