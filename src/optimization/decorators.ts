import { MagicString } from '../util/interfaces';

export function purgeStaticFieldDecorators(filePath: string, originalFileContent: string, ionicAngularDir: string, angularDir: string, srcDir: string, magicString: MagicString) {
  if (filePath.indexOf(angularDir) >= 0 || filePath.indexOf(ionicAngularDir) >= 0 || filePath.indexOf(srcDir) >= 0) {
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, COMPONENT);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, CONTENT_CHILD_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, CONTENT_CHILDREN_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, DIRECTIVE_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, HOST_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, HOST_BINDING_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, HOST_LISTENER_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, INPUT_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, OUTPUT_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, PIPE_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, VIEW_CHILD_DECORATOR);
    magicString = purgeDecoratorsImpl(originalFileContent, magicString, VIEW_CHILDREN_DECORATOR);
  }
  return magicString;
}

export function purgeDecoratorsImpl(originalFileContent: string, magicString: MagicString, type: string) {
  const DECORATORS_REGEX = getDecoratorRegex(type);
  let results: RegExpMatchArray = null;
  while ((results = DECORATORS_REGEX.exec(originalFileContent)) && results.length) {
    magicString.overwrite(results.index, results.index + results[0].length, '');
  }
  return magicString;
}

export function getDecoratorRegex(decoratorType: string) {
  const regexString = `.*?.decorators[\\s\\S\\n]*?type[\\s\\S\\n]*?${decoratorType}[\\s\\S\\n]*?\\[[\\s\\S\\n]*?]`;
  return new RegExp(regexString, 'igm');
}

export function removeTSickleClosureDeclarations(filePath: string, fileContent: string, ionicAngularDir: string, srcDir: string) {
  if (filePath.indexOf(ionicAngularDir) >= 0 || filePath.indexOf(srcDir) >= 0) {
    const tSickleClosureDeclarationRegex = getTSickleclosureDeclarationRegex();
    const matches = tSickleClosureDeclarationRegex.exec(fileContent);
    if (matches && matches.length) {
      return fileContent.replace(matches[0], `/*${matches[0]}*/`);
    }

  }
  return fileContent;
}

export function getTSickleclosureDeclarationRegex() {
  return /function.*?_tsickle_Closure_declarations[\S\s]*?[\s]}/gm;
}

export const COMPONENT = 'component';
export const CONTENT_CHILD_DECORATOR = 'ContentChild';
export const CONTENT_CHILDREN_DECORATOR = 'ContentChildren';
export const DIRECTIVE_DECORATOR = 'Directive';
export const HOST_DECORATOR = 'Host';
export const HOST_BINDING_DECORATOR = 'HostBinding';
export const HOST_LISTENER_DECORATOR = 'HostListener';
export const INPUT_DECORATOR = 'Input';
export const OUTPUT_DECORATOR = 'Output';
export const PIPE_DECORATOR = 'Pipe';
export const VIEW_CHILD_DECORATOR = 'ViewChild';
export const VIEW_CHILDREN_DECORATOR = 'ViewChildren';
