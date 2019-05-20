import React from 'react';
import { graphql } from 'gatsby';
import Usage from '../components/usage';
import Tabs from '../components/api/tabs';

export const query = graphql`
    query SiteComponentPage($slug: String!) {
        sprykerComponent(slug: { eq: $slug }) {
            name
            type
            module {
                namespace
                name
                path
            }
            readme
            api {
                twig {
                    defines {
                        name
                        contract
                        declaration
                    }
                    blocks {
                        name
                    }
                }
                sass {
                    variables {
                        name
                        value
                    }
                    mixins {
                        name
                        arguments {
                            name
                            value
                        }
                        hasContent
                    }
                    modifiers {
                        name
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
                            parameters {
                                name
                                type
                                description
                                isOptional
                            }
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
`;

const getReadme = (name, readme) => {
    return readme || `<h1>${name}</h1>This component has no description.`;
};

export default ({ data }) => {
    const component = data.sprykerComponent;

    return (
        <>
            <section className="section">
                <nav className="breadcrumb">
                    <ul>
                        <li><span className="breadcrumb__item">{component.module.namespace}</span></li>
                        <li><span className="breadcrumb__item">{component.module.name}</span></li>
                    </ul>
                </nav>

                <h1 className="title is-size-2">
                    {component.name}
                    &nbsp;
                    <span className="tag is-danger is-rounded is-uppercase">{component.type}</span>
                </h1>

                <article
                    className="content"
                    dangerouslySetInnerHTML={{ __html: getReadme(component.name, component.readme) }}>
                </article>

                <Usage component={component} />
                <Tabs api={component.api} />
            </section>
        </>
    )
}
