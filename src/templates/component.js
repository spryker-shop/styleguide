import React from 'react';
import { graphql } from 'gatsby';
import { exists } from '../helpers/object';
import Usage from '../components/usage';
import Files from '../components/files';
import Tabs from '../components/api/tabs';
import Breadcrumb from "../components/breadcrumb";
import IconAlert from "../icons/attention.svg";

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
                    relativePath
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
                    relativePath
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
                        }
                    }
                }
                typescript {
                    exists
                    name
                    path
                    relativePath
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

            {component.isDeprecated &&
                <h3 className="title title--flex is-size-5 has-text-danger">
                    <IconAlert className="icon icon--inline" />
                    Deprecated
                </h3>
            }

            {exists(component.files, 'readme') && (
                <article
                    className="content"
                    dangerouslySetInnerHTML={{ __html: getReadme(component.name, component.files.readme.content) }}>
                </article>
            )}

            {(component.type !== 'view' && component.type !== 'template') && <Usage component={component} />}
            <Files files={component.files} />
            <Tabs api={component.files} />
        </section>
    )
}
