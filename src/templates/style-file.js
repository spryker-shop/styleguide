import React from 'react';
import { graphql } from 'gatsby';
import {exists} from "../helpers/object";
import SassTab from '../components/api/tab-sass';
import Files from "../components/files";
import Breadcrumb from '../components/breadcrumb';

export const query = graphql`
    query StylePage($id: String!) {
        sprykerStyleFile(id: { eq: $id }) {
            exists
            name
            type
            path
            api {
                external {
                    variables {
                        name
                        value
                    }
                    mixins {
                        name
                        hasContent
                        arguments {
                            name
                            value
                        }
                        comment {
                            description
                            tags {
                                type
                                description
                            }
                        }
                    }
                    modifiers {
                        name
                    }
                    functions {
                        name
                        arguments {
                            name
                            value
                        }
                        comment {
                            description
                            tags {
                                type
                                description
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default ({ data }) => {
    const section = data.sprykerStyleFile;

    return exists(data, 'sprykerStyleFile') && (
        <section className="section">
            <Breadcrumb steps={[section.type, section.name]} />
            <h1 className="title is-size-2">
                {section.name.replace(/(_|\.|[^.]+$)/gi, '')}
            </h1>
            <Files files={section} />
            <SassTab api={section.api.external} />
        </section>
    )
}
