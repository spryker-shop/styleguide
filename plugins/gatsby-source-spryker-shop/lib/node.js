const { collect } = require('@spryker/frontend-sniffer/api');
const {
    createNavigationSectionNode,
    createNavigationNodesFromStyleFiles,
    createNavigationNodesFromApplicationFiles,
    createNavigationNodesFromComponents
} = require('./navigation');

const SECTIONS = {
    application: 'Application',
    styles: 'Styles',
    components: 'Components',
};

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
    const { applicationFiles, styleFiles, components } = await collect();

    const navigation = [
        createNavigationSectionNode(SECTIONS.application, createNavigationNodesFromApplicationFiles(applicationFiles, SECTIONS.application)),
        createNavigationSectionNode(SECTIONS.styles, createNavigationNodesFromStyleFiles(styleFiles, SECTIONS.styles)),
        createNavigationSectionNode(SECTIONS.components, [
            ...createNavigationNodesFromComponents(components, SECTIONS.components) // SprykerShop namespace
            // add project namespace here
        ])
    ];

    const nodesData = [
        ...applicationFiles.map(file => createNodeData(operations, 'SprykerApplicationFile', file.path, file)),
        ...styleFiles.map(file => createNodeData(operations, 'SprykerStyleFile', file.path, file)),
        ...components.map(component => createNodeData(operations, 'SprykerComponent', component.id, component)),
        ...navigation.map(node => createNodeData(operations, 'SprykerNavigation', node.name, node))
    ];

    nodesData.forEach(nodeData => createNode(nodeData));
}

module.exports = {
    sourceNodes
};
