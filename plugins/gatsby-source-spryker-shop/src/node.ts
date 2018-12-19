import { concat } from 'ramda';
import { importModules, importAllComponentsForModule } from './importer';
import { GatsbyOperations, GatsbyOptions, Module, ModuleNodeData, Component, ComponentNodeData } from './definitions';

function createModuleNodeData(operations: GatsbyOperations, module: Module): ModuleNodeData {
    const id = operations.createNodeId(`spryker-module-${module.path}`);
    const content = JSON.stringify(module);

    return {
        ...module,
        id,
        parent: null,
        children: [],
        internal: {
            type: 'SprykerModule',
            content,
            contentDigest: operations.createContentDigest(module)
        }
    };
}

function createComponentNodeData(operations: GatsbyOperations, component: Component): ComponentNodeData {
    const id = operations.createNodeId(`spryker-component-${component.path}`);
    const content = JSON.stringify(component);

    return {
        ...component,
        id,
        parent: null,
        children: [],
        internal: {
            type: 'SprykerComponent',
            content,
            contentDigest: operations.createContentDigest(component)
        }
    };
}

export async function sourceNodes(operations: GatsbyOperations, options: GatsbyOptions): Promise<void> {
    const { createNode } = operations.actions;
    const { projectRootAbsolutePath } = options;
    const modules = importModules(projectRootAbsolutePath);

    modules
        .map((module: Module) => createModuleNodeData(operations, module))
        .map((moduleData: ModuleNodeData) => createNode(moduleData));

    modules
        .map((module: Module) => importAllComponentsForModule(module))
        .reduce((previous: Component[], current: Component[]): Component[] => concat(previous, current))
        .map((component: Component) => createComponentNodeData(operations, component))
        .map((componentData: ComponentNodeData) => createNode(componentData));
}
