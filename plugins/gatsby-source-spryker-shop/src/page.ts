import { resolve } from 'path';
import { GatsbyOperations, GatsbyOptions } from './definitions';

const query = `
    {
        allSprykerComponent {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
`;

function createComponentPageData(edge: any, componentPageTemplateRelativePath: string): any {
    const slug = edge.node.slug;

    return {
        path: slug,
        component: resolve(componentPageTemplateRelativePath),
        context: {
            id: edge.node.id,
            slug
        }
    }
}

export async function createPages(operations: GatsbyOperations, options: GatsbyOptions): Promise<void> {
    const { graphql } = operations;
    const { createPage } = operations.actions;
    const { componentPageTemplateRelativePath } = options;
    const results = await graphql(query);

    results.data.allSprykerComponent.edges
        .map((edge: any) => createComponentPageData(edge, componentPageTemplateRelativePath))
        .map((componentPageData: any) => createPage(componentPageData));
}
