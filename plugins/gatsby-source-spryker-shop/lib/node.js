const { environment, collect } = require('@spryker/frontend-sniffer/api');
const {
    createNavigationSectionNode,
    createNavigationNodesFromStyleFiles,
    createNavigationNodesFromApplicationFiles,
    createNavigationNodesFromComponents
} = require('./navigation');

const SECTIONS = {
    application: 'Application',
    styles: 'Styles',
    namespaces: 'Namespaces',
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

const conversionObjectToArrayCollection = collection => {
    const modules = Object.values(collection.core);
    const collectionOfFiles = [];
    for (let module of modules) {
        collectionOfFiles.push(...Object.values(module).reduce(
            (accumulator, current) => [...accumulator, ...current], []
        ));
    }
    return collectionOfFiles;
};

async function sourceNodes(operations, options) {
    const { createNode } = operations.actions;

    const isValid = environment.update({
        path: options.projectPath,
        only: options.only,
        debugMode: options.debugMode
    });

    if (!isValid) {
        return Promise.reject('frontent-sniffer collector aborted');
    }

    const { applicationFiles, styleFiles, modules } = await collect();

    const navigation = [
        createNavigationSectionNode(SECTIONS.application, createNavigationNodesFromApplicationFiles(applicationFiles, SECTIONS.application)),
        createNavigationSectionNode(SECTIONS.styles, createNavigationNodesFromStyleFiles(styleFiles.core, SECTIONS.styles)),
        createNavigationSectionNode(SECTIONS.namespaces, createNavigationNodesFromComponents(conversionObjectToArrayCollection(modules), SECTIONS.namespaces))
    ];

    const nodesData = [
        ...applicationFiles.map(file => createNodeData(operations, 'SprykerApplicationFile', file.path, file)),
        ...styleFiles.core.map(file => createNodeData(operations, 'SprykerStyleFile', file.path, file)),
        ...conversionObjectToArrayCollection(modules).map(component => createNodeData(operations, 'SprykerComponent', component.id, component)),
        ...navigation.map(node => createNodeData(operations, 'SprykerNavigation', node.name, node))
    ];

    nodesData.forEach(nodeData => createNode(nodeData));
}

module.exports = {
    sourceNodes
};
