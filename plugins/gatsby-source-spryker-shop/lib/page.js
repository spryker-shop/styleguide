const { resolve } = require('path');
const { createSlug } = require('./shared');

const query = `
    {
        allSprykerComponent {
            edges {
                node {
                    id,
                    name,
                    type,
                    module,
                    namespace
                }
            }
        }
    }
`;

function createPageData(node, componentPageTemplateRelativePath) {
    const slug = createSlug(node);

    return {
        path: slug,
        component: resolve(componentPageTemplateRelativePath),
        context: {
            id: node.id,
            slug
        }
    }
}

async function createPages(operations, options) {
    const { graphql } = operations;
    const { createPage } = operations.actions;
    const { componentPageTemplateRelativePath } = options;
    const results = await graphql(query);

    results.data.allSprykerComponent.edges
        .map(edge => createPageData(edge.node, componentPageTemplateRelativePath))
        .map(pageData => createPage(pageData));
}

module.exports = {
    createPages
}
