import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Preview from '../components/preview';
import ApiTabs from '../components/api-tabs';

export const query = graphql`
    query SiteComponentPage($slug: String!) {
        sprykerComponent(slug: { eq: $slug }) {
            name
            type
            module {
                namespace
                name
            }
            readme
            api {
                sass {
                    description
                    context {
                        name
                        type
                        value
                    }
                }
                typescript {
                    classes {
                        name
                        tags {
                            name
                            description
                        }
                        methods {
                            name
                            description
                            visibility
                            returnType
                            isAsync
                            tags {
                                name
                                description
                            }
                        }
                    }
                }
            }
        }
    }
`
export default ({ data }) => (
    <Layout>
        <section className="section">
            <Preview>
                No preview yet available.
            </Preview>
            <nav class="breadcrumb">
                <ul>
                    <li><a href="#">{data.sprykerComponent.module.namespace}</a></li>
                    <li><a href="#">{data.sprykerComponent.module.name}</a></li>
                    <li><a href="#">{data.sprykerComponent.type}</a></li>
                    <li class="is-active"><a href="#">{data.sprykerComponent.name}</a></li>
                </ul>
            </nav>
        </section>

        <article class="section">
            <section
                className="content"
                dangerouslySetInnerHTML={{ __html: data.sprykerComponent.readme }}>
            </section>
        </article>

        <ApiTabs api={data.sprykerComponent.api} />
    </Layout>
)
