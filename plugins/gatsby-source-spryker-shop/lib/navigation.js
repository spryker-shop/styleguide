const { groupBy, keys } = require('lodash');
const { createSlug, sortObjectsByProperty } = require('./shared/util');

function createNavigationSectionNode(name, nodes) {
    return {
        slug: createSlug(name),
        name,
        nodes
    }
}

function createNavigationNode(label, slug, isPage, children = null) {
    const hasChildren = !!children && children.length > 0;

    return {
        label,
        slug,
        isPage,
        hasChildren,
        children
    }
}

function createNavigationNodesFromApplicationFiles(applicationFiles, slugBase) {
    return applicationFiles.map(applicationFile => createNavigationNode(
        applicationFile.name,
        createSlug(slugBase, applicationFile.name),
        true
    ))
}

function createNavigationNodesFromStyleFiles(styleFiles, slugBase) {
    const stylesByType = groupBy(styleFiles, 'type');

    return keys(stylesByType)
        .sort()
        .map(typeName => {
            const styles = stylesByType[typeName]
                .sort(sortObjectsByProperty('name'))
                .map(style => createNavigationNode(
                    style.name,
                    createSlug(slugBase, typeName, style.name),
                    true
                ))

            return createNavigationNode(
                typeName,
                createSlug(slugBase, typeName),
                false,
                styles
            )
        })
}

function createNavigationNodesFromComponents(components, slugBase) {
    const componentsByNamespace = groupBy(components, 'namespace');

    return keys(componentsByNamespace)
        .sort()
        .map(namespace => {
            const componentsByModule = groupBy(componentsByNamespace[namespace], 'module');

            const modules = keys(componentsByModule)
                .sort()
                .map(moduleName => {
                    const componentsByType = groupBy(componentsByModule[moduleName], 'type');

                    const types = keys(componentsByType)
                        .sort()
                        .map(typeName => {
                            const components = componentsByType[typeName]
                                .sort(sortObjectsByProperty('name'))
                                .map(component => createNavigationNode(
                                    component.name,
                                    createSlug(slugBase, namespace, moduleName, typeName, component.name),
                                    true
                                ));

                            return createNavigationNode(
                                typeName,
                                createSlug(slugBase, namespace, moduleName, typeName),
                                false,
                                components
                            )
                        });

                    return createNavigationNode(
                        moduleName,
                        createSlug(slugBase, namespace, moduleName),
                        false,
                        types
                    )
                });

            return createNavigationNode(
                namespace,
                createSlug(slugBase, namespace),
                false,
                modules
            )
        })
}

module.exports = {
    createNavigationNode,
    createNavigationSectionNode,
    createNavigationNodesFromApplicationFiles,
    createNavigationNodesFromStyleFiles,
    createNavigationNodesFromComponents
};
