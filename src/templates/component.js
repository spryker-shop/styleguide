import React from 'react';
import { graphql } from 'gatsby';
import { exists } from '../helpers/object';
import Usage from '../components/usage';
import Files from '../components/files';
import Tabs from '../components/api/tabs';
import Breadcrumb from "../components/breadcrumb";

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
                    path
                    api {
                        external {
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
                }
                sass {
                    exists
                    name
                    path
                    api {
                        external {
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
                }
                typescript {
                    exists
                    name
                    path
                    api {
                        external {
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
                                    extractAsync
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
    }
`;

const getReadme = (name, readme) => {
    return readme || `<h1>${name}</h1>This component has no description.`;
};

export default ({ data }) => {
    const component = data.sprykerComponent;

    return exists(data, 'sprykerComponent') && (
        <section className="section">
            <Breadcrumb steps={[component.namespace, component.module]} />
            <h1 className="title is-size-2">
                {component.name}
                &nbsp;
                <span className="tag is-danger is-rounded is-uppercase">{component.type}</span>
            </h1>

            {exists(component.isDeprecated, 'exists') && (
                <h3 className="title is-size-5 has-text-danger">Deprecated</h3>
            )}

            {exists(component.files, 'readme') && (
                <article
                    className="content"
                    dangerouslySetInnerHTML={{ __html: getReadme(component.name, component.files.readme.content) }}>
                </article>
            )}

            <Usage component={component} />
            <Files files={component.files} />
            <Tabs api={component.files} />
        </section>
    )
}
