import { AST } from '@codemod-utils/ast-template';
import { findTemplateTags } from '@codemod-utils/ast-template-tag';

export function areTemplateTagsValid(file: string): boolean {
  let isValid = true;

  try {
    const templateTags = findTemplateTags(file);

    templateTags.forEach(({ contents }) => {
      AST.traverse(contents);
    });
  } catch {
    isValid = false;
  }

  return isValid;
}
