const { groupBy, keys } = require('lodash');
const { createSlug, sortStringsBy } = require('./shared/util');

function createNavigationSectionNode(name, nodes) {
    return {
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

function createNavigationNodesFromApplication(applicationFiles) {
    const slugBase = 'application';

    return applicationFiles.map(applicationFile => createNavigationNode(
        applicationFile.name,
        createSlug(slugBase, applicationFile.name),
        true
    ))
}

function createNavigationNodesFromStyles(styles) {
    const slugBase = 'styles';

    return styles.map(style => createNavigationNode(
        style.type,
        createSlug(slugBase, style.type),
        true
    ))
}

function createNavigationNodesFromComponents(components) {
    const slugBase = 'components';
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
                                .sort(sortStringsBy('name'))
                                .map(component => createNavigationNode(
                                    component.name,
                                    createSlug(slugBase, namespace, moduleName, typeName, component.name),
                                    true
                                ))

                            return createNavigationNode(
                                typeName,
                                createSlug(slugBase, namespace, moduleName, typeName),
                                false,
                                components
                            )
                        })

                    return createNavigationNode(
                        moduleName,
                        createSlug(slugBase, namespace, moduleName),
                        false,
                        types
                    )
                })

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
    createNavigationNodesFromApplication,
    createNavigationNodesFromStyles,
    createNavigationNodesFromComponents
}
