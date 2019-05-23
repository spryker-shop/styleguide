const { resolve } = require('path');
const { createSlug } = require('./shared/util');

const query = `
    {
        allSprykerApplicationFile {
            edges {
                node {
                    id
                    name
                }
            }
        }
        allSprykerStyleSection {
            edges {
                node {
                    id
                    type
                }
            }
        }
        allSprykerComponent {
            edges {
                node {
                    id
                    name
                    type
                    module
                    namespace
                }
            }
        }
    }
`;

function createPageDataFromApplicationFile(node) {
    const slug = createSlug('application', node.name);

    return {
        path: slug,
        component: resolve('src/templates/application-file.js'),
        context: {
            id: node.id,
            slug
        }
    }
}

function createPageDataFromStyleSection(node) {
    const slug = createSlug('styles', node.type);

    return {
        path: slug,
        component: resolve('src/templates/style-section.js'),
        context: {
            id: node.id,
            slug
        }
    }
}

function createPageDataFromComponent(node) {
    const slug = createSlug('components', node.namespace, node.module, node.type, node.name);

    return {
        path: slug,
        component: resolve('src/templates/component.js'),
        context: {
            id: node.id,
            slug
        }
    }
}

async function createPages(operations, options) {
    const { graphql } = operations;
    const { createPage } = operations.actions;
    const results = await graphql(query);

    results.data.allSprykerApplicationFile.edges
        .map(edge => createPageDataFromApplicationFile(edge.node))
        .map(pageData => createPage(pageData));

    results.data.allSprykerStyleSection.edges
        .map(edge => createPageDataFromStyleSection(edge.node))
        .map(pageData => createPage(pageData));

    results.data.allSprykerComponent.edges
        .map(edge => createPageDataFromComponent(edge.node))
        .map(pageData => createPage(pageData));
}

module.exports = {
    createPages
}
