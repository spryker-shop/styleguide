const { groupBy, keys } = require('lodash');
const { analyze } = require('@spryker/frontend-sniffer/api');
const { createSlug } = require('./shared');

function createNavigation(components) {
    const componentsByNamespace = groupBy(components, 'namespace');

    return keys(componentsByNamespace).map(namespace => {
        const componentsByModule = groupBy(componentsByNamespace[namespace], 'module');

        const modules = keys(componentsByModule).map(module => {
            const componentsByType = groupBy(componentsByModule[module], 'type');

            const types = keys(componentsByType).map(type => {
                const components = componentsByType[type].map(component => ({
                    ...component,
                    slug: createSlug(component)
                }))

                return {
                    type,
                    components
                }
            })

            return {
                module,
                types
            }
        })

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
        ...components.map(component => createNodeData(operations, 'SprykerComponent', component.path, component)),
        ...navigation.map(node => createNodeData(operations, 'SprykerNavigation', node.namespace, node))
    ]

    nodesData.forEach(nodeData => createNode(nodeData));
}

module.exports = {
    sourceNodes
}
