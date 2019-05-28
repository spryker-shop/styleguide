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
        allSprykerStyleFile {
            edges {
                node {
                    id
                    type
                    name
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

function createPageDataFromApplicationFileNode(node) {
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

function createPageDataFromStyleFileNode(node) {
    const slug = createSlug('styles', node.type, node.name);

    return {
        path: slug,
        component: resolve('src/templates/style-file.js'),
        context: {
            id: node.id,
            slug
        }
    }
}

function createPageDataFromComponentNode(node) {
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

async function createPages(operations) {
    const { graphql } = operations;
    const { createPage } = operations.actions;
    const results = await graphql(query);

    results.data.allSprykerApplicationFile.edges
        .map(edge => createPageDataFromApplicationFileNode(edge.node))
        .map(pageData => createPage(pageData));

    results.data.allSprykerStyleFile.edges
        .map(edge => createPageDataFromStyleFileNode(edge.node))
        .map(pageData => createPage(pageData));

    results.data.allSprykerComponent.edges
        .map(edge => createPageDataFromComponentNode(edge.node))
        .map(pageData => createPage(pageData));
}

module.exports = {
    createPages
}
