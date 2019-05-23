import React from 'react';
import { graphql } from 'gatsby';
import Usage from '../components/usage';
import Tabs from '../components/api/tabs';
import { exists } from '../helpers/object';

export const query = graphql`
    query SiteComponentPage($id: String!) {
        sprykerComponent(id: { eq: $id }) {
            namespace
            name
            type
            module
            isDeprecated
            files {
                deprecated {
                    exists
                } 
                readme {
                    exists
                    name
                    content
                 }
                twig {
                    exists
                    name
                    api {
                        definitions {
                            name
                            contract
                            declaration
                        }
                        blocks {
                            name
                        }
                    }
                }
                sass {
                    exists
                    name
                    api {
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
                        functions {
                            name
                            arguments {
                                name
                            }
                        }
                    }
                }
                typescript {
                    exists
                    name
                    api {
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
    }
`;

const getReadme = (name, readme) => {
    return readme || `<h1>${name}</h1>This component has no description.`;
};

export default ({ data }) => {
    const component = data.sprykerComponent;

    return exists(data, 'sprykerComponent') && (
        <>
            <section className="section">
                <nav className="breadcrumb">
                    <ul>
                        <li><span className="breadcrumb__item">{component.namespace}</span></li>
                        <li><span className="breadcrumb__item">{component.module}</span></li>
                    </ul>
                </nav>

                <h1 className="title is-size-2">
                    {component.name}
                    &nbsp;
                    <span className="tag is-danger is-rounded is-uppercase">{component.type}</span>
                </h1>

                {exists(component.isDeprecated, 'exists') && (
                    <h2>Deprecated</h2>
                )}

                {exists(component.files, 'readme') && (
                    <article
                        className="content"
                        dangerouslySetInnerHTML={{ __html: getReadme(component.name, component.files.readme.content) }}>
                    </article>
                )}

                <Usage component={component} />
                <Tabs api={component.files} />
            </section>
        </>
    )
}
