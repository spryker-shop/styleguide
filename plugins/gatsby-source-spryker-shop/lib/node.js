const { groupBy, keys } = require('lodash');
const { analyze } = require('@spryker/frontend-sniffer/api');
const { createSlugForComponent, createSlugForModule } = require('./shared');

function sortBy(propertyName) {
    return function compare(a, b) {
        const nameA = a[propertyName].toLowerCase();
        const nameB = b[propertyName].toLowerCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    }
}

function createNavigation(components) {
    const componentsByNamespace = groupBy(components, 'namespace');

    return keys(componentsByNamespace).map(namespace => {
        const componentsByModule = groupBy(componentsByNamespace[namespace], 'module');

        const modules = keys(componentsByModule).map(moduleName => {
            const componentsByType = groupBy(componentsByModule[moduleName], 'type');

            const types = keys(componentsByType).map(typeName => {
                const components = componentsByType[typeName].map(component => ({
                    ...component,
                    slug: createSlugForComponent(namespace, moduleName, typeName, component.name)
                })).sort(sortBy('name'));

                return {
                    typeName,
                    components
                }
            }).sort(sortBy('typeName'));

            return {
                moduleName,
                slug: createSlugForModule(namespace, moduleName),
                types
            }
        }).sort(sortBy('moduleName'));

        return {
            namespace,
            modules
        }
    })
}

function createNodeData(operations, type, id, entity) {
    return {
        ...entity,
        id: operations.createNodeId(`${type}-${id}`),
        parent: null,
        children: [],
        internal: {
            type,
            content: JSON.stringify(entity),
            contentDigest: operations.createContentDigest(entity)
        }
    }
}

async function sourceNodes(operations, options) {
    const { createNode } = operations.actions;
    const { projectRootAbsolutePath, typesToImport } = options;
    const { applicationFiles, styleSections, components } = await analyze();
    const navigation = createNavigation(components);

    const nodesData = [
        ...applicationFiles.map(file => createNodeData(operations, 'SprykerApplicationFile', file.path, file)),
        ...styleSections.map(section => createNodeData(operations, 'SprykerStyleSection', section.type, section)),
        ...components.map(component => createNodeData(operations, 'SprykerComponent', component.id, component)),
        ...navigation.map(node => createNodeData(operations, 'SprykerNavigation', node.namespace, node))
    ];

    nodesData.forEach(nodeData => createNode(nodeData));
}

module.exports = {
    sourceNodes
};
