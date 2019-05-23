const { analyze } = require('@spryker/frontend-sniffer/api');
const {
    createNavigationSectionNode,
    createNavigationNodesFromStyles,
    createNavigationNodesFromApplication,
    createNavigationNodesFromComponents
} = require('./navigation');

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
    const { applicationFiles, styleSections, components } = await analyze();

    const navigation = [
        createNavigationSectionNode('application', createNavigationNodesFromApplication(applicationFiles)),
        createNavigationSectionNode('styles', createNavigationNodesFromStyles(styleSections)),
        createNavigationSectionNode('components', [
            ...createNavigationNodesFromComponents(components) // SprykerShop namespace
            // add project namespace here
        ])
    ];

    const nodesData = [
        ...applicationFiles.map(file => createNodeData(operations, 'SprykerApplicationFile', file.path, file)),
        ...styleSections.map(section => createNodeData(operations, 'SprykerStyleSection', section.type, section)),
        ...components.map(component => createNodeData(operations, 'SprykerComponent', component.id, component)),
        ...navigation.map(node => createNodeData(operations, 'SprykerNavigation', node.name, node))
    ];

    nodesData.forEach(nodeData => createNode(nodeData));
}

module.exports = {
    sourceNodes
};
