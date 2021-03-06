/**
 *
 *
 * Gatsby
 */

export type GatsbyOperations = any
export type GatsbyOptions = any

/**
 *
 *
 * Spryker
 */

export interface GlobSettings {
    dirs: string[]
    patterns: string[],
    options?: any
}

export interface GlobModuleSettings extends GlobSettings {
    namespace: string
}

export enum Type {
    Atom = 'atom',
    Molecule = 'molecule',
    Organism = 'organism',
    Template = 'template',
    View = 'view'
}

export interface Module {
    namespace: string
    name: string
    path: string
    slug: string
}

export interface Component {
    name: string
    path: string
    slug: string
    type: Type
    module: Module
    readme: string
    api: {
        twig?: any
        sass?: any
        typescript?: any
    }
}

export interface NavigationComponent {
    name: string
    path: string
    slug: string
}

export interface NavigationType {
    name: string
    components: NavigationComponent[]
}

export interface NavigationModule {
    name: string
    slug: string
    types: NavigationType[]
}

export interface Navigation {
    namespace: string
    modules: NavigationModule[]
}

export enum NodeType {
    Module = 'SprykerModule',
    Component = 'SprykerComponent'
}

export interface NodeData {
    id: string
    parent: string
    children: any[]
    internal: {
        type: string | NodeType
        content: string
        contentDigest: string
    }
}

export interface ModuleNodeData extends Module, NodeData { }
export interface ComponentNodeData extends Component, NodeData { }
export interface NavigationNodeData extends Navigation, NodeData { }
