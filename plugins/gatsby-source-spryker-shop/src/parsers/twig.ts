import { readFileSync } from 'fs';

const allowedDefinitions = [
    'data',
    'attributes'
];

const defineNameRegex = new RegExp(`(?<=\\{%\\s+define\\s+)(${allowedDefinitions.join('|')})`, 'i');
const defineBodyRegex = /(\{|\}|\.|\n|\w|:|\s|t|,|\[|\]|\||\(|\)|(('|"|\{#).*('|"|#\}))|)+/;
const defineOpeningTagRegex = new RegExp(`\\{%\\s+define\\s+(${allowedDefinitions.join('|')})\\s+=\\s+\\{`);
const defineClosingTagRegex = /\}\s*%\}/;
const defineDeclarationRegex = new RegExp(`${defineOpeningTagRegex.source}${defineBodyRegex.source}${defineClosingTagRegex.source}`, 'gmi');
const defineContractRegex = new RegExp(`(?<=${defineOpeningTagRegex.source})${defineBodyRegex.source}(?=${defineClosingTagRegex.source})`, 'gmi');
const blockNameRegex = /(?<=\{%\s+block\s+)\w+(?=\s+%\})/gmi;

function createDefine(declaration) {
    return {
        name: declaration.match(defineNameRegex)[0],
        contract: declaration.match(defineContractRegex)[0],
        declaration
    }
}

function createBlock(name) {
    return {
        name
    }
}

export function parse(file: string): any {
    const content = readFileSync(file, 'utf8');
    const declarations = content.match(defineDeclarationRegex) || [];
    const defines = declarations.map(createDefine);
    const blockNames = content.match(blockNameRegex) || [];
    const blocks = blockNames.map(createBlock);

    return {
        defines,
        blocks
    }
}
