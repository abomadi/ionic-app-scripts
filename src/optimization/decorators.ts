import { MagicString } from '../util/interfaces';

export function purgeDecorators(filePath: string, originalFileContent: string, ionicAngularDir: string, angularDir: string, srcDir: string, magicString: MagicString) {
  if (filePath.indexOf(angularDir) >= 0 || filePath.indexOf(ionicAngularDir) >= 0 || filePath.indexOf(srcDir) >= 0) {
    return purgeDecoratorsImpl(filePath, originalFileContent, magicString);
  }
  return magicString;
}

export function purgeDecoratorsImpl(filePath: string, originalFileContent: string, magicString: MagicString) {
  const DECORATORS_REGEX = getDecoratorRegex();
  const IMMOVEABLE_REGEX = getImmovableDecoratorRegex();
  const immovableRegexResults = IMMOVEABLE_REGEX.exec(originalFileContent);
  console.log('immovableRegexResults: ', immovableRegexResults);
  if (immovableRegexResults && immovableRegexResults.length > 0) {
    return magicString;
  }
  // sweet, it's not the one we cannot purge, so purge that bizzle
  const results = DECORATORS_REGEX.exec(originalFileContent);
  console.log('results: ', results);
  if (results && results.length > 0) {
    magicString.overwrite(results.index, results.index + results[0].length, '');
  }

  return magicString;
}

export function getImmovableDecoratorRegex() {
  return /.*?.decorators[\s\S\n]*?Injectable[\s\S\n]*?;/gm;
}

export function getDecoratorRegex() {
  return /.*?.decorators.=[\s\S\n]*?\[[\s\S\n]*?];/gm;
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
