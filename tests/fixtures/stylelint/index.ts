import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('stylelint/input');
const outputProject = convertFixtureToJson('stylelint/output');

export { inputProject, outputProject };
