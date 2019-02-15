import {
    concat,
    groupBy,
    mapObjIndexed,
    filter,
    values,
    flatten
} from 'ramda';
import {
    importModules,
    importAllComponentsForModule
} from './importer';
import {
    GatsbyOperations,
    GatsbyOptions,
    Type,
    Module,
    ModuleNodeData,
    Component,
    ComponentNodeData,
    Navigation,
    NavigationModule,
    NavigationComponent,
    NavigationType,
    NavigationNodeData
} from './definitions';

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

function createNavigationNodeData(operations: GatsbyOperations, navigation: Navigation): NavigationNodeData {
    const id = operations.createNodeId(`spryker-navigation-${navigation.namespace}`);
    const content = JSON.stringify(navigation);

    return {
        ...navigation,
        id,
        parent: null,
        children: [],
        internal: {
            type: 'SprykerNavigation',
            content,
            contentDigest: operations.createContentDigest(navigation)
        }
    };
}

// I ask forgivness for this part of code
// but I was in a hurry... :(
// refactor, please!
export async function sourceNodes(operations: GatsbyOperations, options: GatsbyOptions): Promise<void> {
    const { createNode } = operations.actions;
    const { projectRootAbsolutePath, typesToImport } = options;

    const modules: Module[] = importModules(projectRootAbsolutePath);
    const components: Component[] = Array.prototype.concat(
        ...await Promise.all(modules.map((module: Module) => importAllComponentsForModule(module, typesToImport)))
    );

    const navigations: Navigation[] = [{
        namespace: 'SprykerShop',
        modules: modules
            .map(((module): NavigationModule => {
                const componentsInModule = filter((component: Component) => component.module.path === module.path, components)
                const componentsInModuleByType = groupBy((component: Component) => component.type)(componentsInModule);

                return {
                    name: module.name,
                    slug: module.slug,
                    types: values(mapObjIndexed((componentsByType: Component[], key: string): NavigationType => ({
                        name: key,
                        components: componentsByType.map((component: Component): NavigationComponent => ({
                            name: component.name,
                            path: component.path,
                            slug: component.slug
                        }))
                    }), componentsInModuleByType))
                }
            }))
    }];

    modules
        .map((module: Module) => createModuleNodeData(operations, module))
        .forEach((moduleData: ModuleNodeData) => createNode(moduleData));

    components
        .map((component: Component) => createComponentNodeData(operations, component))
        .forEach((componentData: ComponentNodeData) => createNode(componentData));

    navigations
        .map((navigation: Navigation) => createNavigationNodeData(operations, navigation))
        .forEach((navigationData: NavigationNodeData) => createNode(navigationData));
}
