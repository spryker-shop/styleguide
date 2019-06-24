exports.sourceNodes = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        """
        Define SprykerStyleFile object structure
        """
        type SprykerStyleFileApiExternalCommentTags {
            description: String,
            type: String
        }
        
        type SprykerStyleFileApiExternalComment {
            description: String,
            tags: [SprykerStyleFileApiExternalCommentTags]
        }
        
        type SprykerStyleFileApiExternalArguments {
            name: String,
            value: String
        }
        
        type SprykerStyleFileApiExternalMixins {
            name: String,
            hasContent: Boolean,
            arguments: [SprykerStyleFileApiExternalArguments],
            comment: SprykerStyleFileApiExternalComment
        }
        
        type SprykerStyleFileApiExternalFunctions {
            name: String,
            arguments: [SprykerStyleFileApiExternalArguments],
            comment: SprykerStyleFileApiExternalComment
        }
        
        type SprykerStyleFileApiExternalArgument {
            name: String
        }
        
        type SprykerStyleFileApiExternal {
            variables: [SprykerStyleFileApiExternalArguments],
            mixins: [SprykerStyleFileApiExternalMixins],
            classes: [SprykerStyleFileApiExternalArgument],
            modifiers: [SprykerStyleFileApiExternalArgument],
            functions: [SprykerStyleFileApiExternalFunctions]
        }
        
        type SprykerStyleFileApi {
            external: SprykerStyleFileApiExternal
        }
        
        type SprykerStyleFile implements Node {
            exists: Boolean,
            name: String,
            type: String,
            path: String,
            relativePath: String,
            api: SprykerStyleFileApi
        }
        
        """
        Define SprykerComponent object structure
        """
        type SprykerComponentFilesDeprecated {
            exists: Boolean
        }
        
        type SprykerComponentFilesReadme {
            exists: Boolean,
            name: String,
            content: String
        }
        
        type SprykerComponentFilesTwigApiExternalName {
            name: String
        }
        
        type SprykerComponentFilesTwigApiExternalDefinitions {
            name: String,
            contract: String,
            declaration: String
        }
        
        type SprykerComponentFilesTwigApiExternal {
            definitions: [SprykerComponentFilesTwigApiExternalDefinitions],
            blocks: [SprykerComponentFilesTwigApiExternalName]
        }
        
        type SprykerComponentFilesTwigApi {
            external: SprykerComponentFilesTwigApiExternal
        }
        
        type SprykerComponentFilesTwig {
            exists: Boolean,
            name: String,
            path: String,
            relativePath: String,
            api: SprykerComponentFilesTwigApi
        }
        
        type SprykerComponentFilesSassApiExternalArguments {
            name: String,
            value: String
        }
        
        type SprykerComponentFilesSassApiExternalMixins {
            name: String,
            arguments: [SprykerComponentFilesSassApiExternalArguments]
            hasContent: Boolean
        }
        
        type SprykerComponentFilesSassApiExternal {
            variables: [SprykerComponentFilesSassApiExternalArguments],
            mixins: [SprykerComponentFilesSassApiExternalMixins],
            modifiers: [SprykerComponentFilesTwigApiExternalName]
        }
        
        type SprykerComponentFilesSassApi {
            external: SprykerComponentFilesSassApiExternal
        }
        
        type SprykerComponentFilesSass {
            exists: Boolean,
            name: String,
            path: String,
            relativePath: String,
            api: SprykerComponentFilesSassApi
        }
        
        type SprykerComponentFilesTypescriptApiExternalClassesMethodsParameters {
            name: String,
            type: String,
            description: String,
            isOptional: Boolean
        }
        
        type SprykerComponentFilesTypescriptApiExternalClassesMethodsTags {
            name: String,
            description: String
        }
        
        type SprykerComponentFilesTypescriptApiExternalClassesMethods {
            name: String,
            description: String,
            visibility: String,
            returnType: String,
            extractAsync: Boolean,
            parameters: [SprykerComponentFilesTypescriptApiExternalClassesMethodsParameters],
            tags: [SprykerComponentFilesTypescriptApiExternalClassesMethodsTags],
        }
        
        type SprykerComponentFilesTypescriptApiExternalClassesTags {
            name: String,
            description: String
        }
        
        type SprykerComponentFilesTypescriptApiExternalClasses {
            name: String,
            tags: [SprykerComponentFilesTypescriptApiExternalClassesTags],
            methods: [SprykerComponentFilesTypescriptApiExternalClassesMethods],
        }
        
        type SprykerComponentFilesTypescriptApiExternal {
            classes: [SprykerComponentFilesTypescriptApiExternalClasses]
        }
        
        type SprykerComponentFilesTypescriptApi {
            external: SprykerComponentFilesTypescriptApiExternal
        }
        
        type SprykerComponentFilesTypescript {
            exists: Boolean,
            name: String,
            path: String,
            relativePath: String,
            api: SprykerComponentFilesTypescriptApi
        }
        
        type SprykerComponentFiles {
            deprecated: SprykerComponentFilesDeprecated,
            readme: SprykerComponentFilesReadme,
            twig: SprykerComponentFilesTwig,
            sass: SprykerComponentFilesSass,
            typescript: SprykerComponentFilesTypescript
        }
        
        type SprykerComponent implements Node {
            isDeprecated: Boolean,
            name: String,
            namespace: String,
            module: String,
            files: SprykerComponentFiles
        }
        
        """
        Define SprykerApplicationFile object structure
        """
        type SprykerApplicationFileApiExternalTags {
            name: String,
            description: String
        }
        
        type SprykerApplicationFileApiExternalMethods {
            name: String,
            description: String,
            visibility: String,
            returnType: String,
            extractAsync: Boolean,
            tags: [SprykerApplicationFileApiExternalTags],
        }
        
        type SprykerApplicationFileApiExternalClasses {
            name: String,
            description: String,
            methods: [SprykerApplicationFileApiExternalMethods]
        }
        
        type SprykerApplicationFileApiExternalFunctionsParameters {
            name: String,
            description: String,
            type: String,
            isOptional: Boolean
        }
        
        type SprykerApplicationFileApiExternalFunctions {
            name: String,
            description: String,
            returnType: String,
            extractAsync: Boolean,
            parameters: [SprykerApplicationFileApiExternalFunctionsParameters],
            tags: [SprykerApplicationFileApiExternalTags],
        }
        
        type SprykerApplicationFileApiExternal {
            classes: [SprykerApplicationFileApiExternalClasses],
            functions: [SprykerApplicationFileApiExternalFunctions]
        }
        
        type SprykerApplicationFileApi {
            external: SprykerApplicationFileApiExternal
        }
        
        type SprykerApplicationFile implements Node {
            exists: Boolean,
            name: String,
            path: String,
            relativePath: String,
            api: SprykerApplicationFileApi
        }
    `)
};
