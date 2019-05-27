const { analyze } = require('@spryker/frontend-sniffer/api');
const {
    createNavigationSectionNode,
    createNavigationNodesFromStyles,
    createNavigationNodesFromApplication,
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
    const { applicationFiles, styleSections, components } = await analyze();

    const navigation = [
        createNavigationSectionNode(SECTIONS.application, createNavigationNodesFromApplication(applicationFiles, SECTIONS.application)),
        createNavigationSectionNode(SECTIONS.styles, createNavigationNodesFromStyles(styleSections, SECTIONS.styles)),
        createNavigationSectionNode(SECTIONS.components, [
            ...createNavigationNodesFromComponents(components, SECTIONS.components) // SprykerShop namespace
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
