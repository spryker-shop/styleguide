import { yellow, dim } from 'colors';
import { EOL } from 'os';
import { basename } from 'path';
import * as ts from 'typescript';
import { concat, forEachObjIndexed } from 'ramda';

export interface TagApi {
    name: string
    description: string
}

export interface ParameterApi {
    name: string
    description: string
    type: string
    isOptional: boolean
}

export interface MethodApi {
    name: string,
    description: string
    tags: TagApi[]
    visibility: string
    parameters: ParameterApi[]
    returnType: string
    isAsync: boolean
}

export interface ClassApi {
    name: string,
    description: string
    tags: TagApi[]
    methods: MethodApi[]
}

export interface Api {
    classes: ClassApi[]
}

interface MessageRegistry {
    [key: string]: string[]
}

export const VisibilityMap = {
    [ts.SyntaxKind.PublicKeyword]: 'public',
    [ts.SyntaxKind.ProtectedKeyword]: 'protected',
    [ts.SyntaxKind.PrivateKeyword]: 'private'
}

export const BaseTypeMap = {
    [ts.SyntaxKind.VoidKeyword]: 'void',
    [ts.SyntaxKind.NullKeyword]: 'null',
    [ts.SyntaxKind.AnyKeyword]: 'any',
    [ts.SyntaxKind.ObjectKeyword]: 'object',
    [ts.SyntaxKind.BooleanKeyword]: 'boolean',
    [ts.SyntaxKind.StringKeyword]: 'string',
    [ts.SyntaxKind.NumberKeyword]: 'number'
}

const is = (kind: ts.SyntaxKind) => (node: ts.Node): boolean => node.kind === kind;
const isNot = (kind: ts.SyntaxKind) => (node: ts.Node): boolean => node.kind !== kind;
const merge = (a: any[], b: any[]): any[] => concat(a, b);
const isVisibility = (node: ts.Modifier): boolean => !!VisibilityMap[node.kind];
const isBaseType = (node: ts.TypeNode): boolean => !!BaseTypeMap[node.kind];
const isParameterOptional = (node: ts.ParameterDeclaration) => !!node.questionToken;
const hasParameterComment = (node: ts.ParameterDeclaration) =>
    (tag: ts.JSDocParameterTag): boolean => node.name.getText() === tag.name.getText();

const typescriptCompilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2015
}

function runDiagnosticsForProgram(program: ts.Program): MessageRegistry {
    const compilerDiagnostics = program.getSemanticDiagnostics();
    const registry: MessageRegistry = {};

    if (compilerDiagnostics.length === 0) {
        return;
    }

    compilerDiagnostics.forEach((diagnostic: ts.Diagnostic) => {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, EOL);

        if (!diagnostic.file) {
            registry['Program'] = [
                ...registry['Program'] || [],
                message
            ];

            return;
        }

        const location = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        const formattedMessage = `  (${location.line + 1}:${location.character + 1}) ${message}`;

        registry[diagnostic.file.fileName] = [
            ...registry[diagnostic.file.fileName] || [],
            formattedMessage
        ];
    });

    return registry;
}

function printDiagnosticsForProgram(file: string, registry: MessageRegistry) {
    console.log('\nParsing', basename(file));

    forEachObjIndexed((messages: string[], key: string) => {
        console.warn(dim(key));
        messages.forEach((message: string) => console.log(yellow(message)));
    }, registry);
}

function runDiagnosticsForSourceFile(sourceFile: ts.SourceFile): void {
    if (!sourceFile) {
        throw new Error('Error retrieving source file');
    }
}

function createTypeString(node: ts.TypeNode, isAsync: boolean = false): string {
    if (!node) {
        return isAsync
            ? `Promise<${BaseTypeMap[ts.SyntaxKind.VoidKeyword]}>`
            : BaseTypeMap[ts.SyntaxKind.VoidKeyword]
    }

    if (isBaseType(node)) {
        return BaseTypeMap[node.kind];
    }

    if (is(ts.SyntaxKind.TypeReference)(node)) {
        const typeReferenceNode = <ts.TypeReferenceNode>node;
        return typeReferenceNode.typeName.getText();
    }

    if (is(ts.SyntaxKind.ArrayType)(node)) {
        const arrayTypeNode = <ts.ArrayTypeNode>node;

        if (isBaseType(arrayTypeNode)) {
            BaseTypeMap[arrayTypeNode.elementType.kind] + '[]';
        }

        const typeReferenceNode = <ts.TypeReferenceNode>arrayTypeNode.elementType;
        return typeReferenceNode.typeName.getText() + '[]';
    }

    if (is(ts.SyntaxKind.UnionType)(node)) {
        return (<ts.UnionTypeNode>node)
            .types
            .map((type: ts.TypeNode) => createTypeString(type, isAsync))
            .join('|');
    }

    return null;
}

function createTag(node: ts.JSDocTag): TagApi {
    return {
        name: node.tagName.text,
        description: node.comment || null
    };
}

function createParameter(node: ts.ParameterDeclaration, jsDocNode: ts.JSDocParameterTag = null): ParameterApi {
    return {
        name: node.name.getText(),
        description: !!jsDocNode ? jsDocNode.comment || null : null,
        type: createTypeString(node.type),
        isOptional: isParameterOptional(node)
    };
}

function createMethodApi(node: ts.MethodDeclaration): MethodApi {
    return {
        name: node.name ? node.name.getText() : '',
        description: getDescription(node),
        tags: getTags(node),
        visibility: getVisibility(node),
        parameters: getParameters(node),
        returnType: getReturnValue(node),
        isAsync: isAsync(node)
    }
}

function createClassApi(node: ts.ClassDeclaration): ClassApi {
    return {
        name: node.name ? node.name.getText() : '',
        description: getDescription(node),
        tags: getTags(node),
        methods: crawlForMethods(node)
    }
}

function createApi(classes: ClassApi[]): Api {
    return {
        classes
    }
}

function crawl(root: ts.Node): Api {
    return createApi(
        crawlForClasses(root)
    )
}

function crawlForClasses(node: ts.Node): ClassApi[] {
    const children = node
        .getChildren();

    const classApis = children
        .filter(is(ts.SyntaxKind.ClassDeclaration))
        .map(createClassApi);

    return children
        .map(crawlForClasses)
        .reduce(merge, classApis);
}

function crawlForMethods(node: ts.ClassDeclaration): MethodApi[] {
    const children = node
        .getChildren();

    const methodApis = children
        .filter(is(ts.SyntaxKind.MethodDeclaration))
        .map(createMethodApi);

    return children
        .map(crawlForMethods)
        .reduce(merge, methodApis);
}

function getVisibility(node: ts.MethodDeclaration): string {
    if (!node.modifiers) {
        return VisibilityMap[ts.SyntaxKind.PublicKeyword];
    }

    const visibility = node
        .modifiers
        .find(isVisibility);

    if (!visibility) {
        return VisibilityMap[ts.SyntaxKind.PublicKeyword];
    }

    return VisibilityMap[visibility.kind];
}

function getReturnValue(node: ts.MethodDeclaration): string {
    return createTypeString(node.type, isAsync(node));
}

function isAsync(node: ts.MethodDeclaration | ts.FunctionDeclaration): boolean {
    if (!node.modifiers) {
        return false;
    }

    return !!node
        .modifiers
        .find(is(ts.SyntaxKind.AsyncKeyword));
}

function getParameters(node: ts.MethodDeclaration | ts.FunctionDeclaration): ParameterApi[] {
    const parameterTags = <ts.JSDocParameterTag[]>ts
        .getAllJSDocTagsOfKind(node, ts.SyntaxKind.JSDocParameterTag);

    return node
        .parameters
        .map((parameterNode: ts.ParameterDeclaration) =>
            createParameter(parameterNode, parameterTags.find(hasParameterComment(parameterNode)))
        );
}

function getTags(node: ts.Node): TagApi[] {
    return ts
        .getJSDocTags(node)
        .filter(isNot(ts.SyntaxKind.JSDocParameterTag))
        .map(createTag);
}

function getDescription(node: ts.Node): string {
    const commentNode = <ts.JSDoc>node
        .getChildren()
        .find(is(ts.SyntaxKind.JSDocComment));

    if (!commentNode) {
        return null;
    }

    return commentNode.comment || null;
}

export function parse(file: string): Api {
    const program = ts.createProgram([file], typescriptCompilerOptions);
    const output = runDiagnosticsForProgram(program);
    // printDiagnosticsForProgram(file, output);

    const sourceFile = program.getSourceFile(file);
    runDiagnosticsForSourceFile(sourceFile);

    return crawl(sourceFile);
}
