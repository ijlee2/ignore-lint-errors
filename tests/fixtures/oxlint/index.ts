import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('oxlint/input');
const outputProject = convertFixtureToJson('oxlint/output');

export { inputProject, outputProject };
