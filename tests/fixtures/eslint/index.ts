import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('eslint/input');
const outputProject = convertFixtureToJson('eslint/output');

export { inputProject, outputProject };
