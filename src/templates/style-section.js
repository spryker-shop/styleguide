import React from 'react';
import { graphql } from 'gatsby';
import {exists} from "../helpers/object";

export const query = graphql`
    query StyleSectionPage($id: String!) {
        sprykerStyleSection(id: { eq: $id }) {
            type
            files {
                exists
                name
                type
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
        }
    }
`;

export default ({ data }) => {
    const section = data.sprykerStyleSection;

    return exists(data, 'sprykerStyleSection') && (
        <section className="section">
            {section.type}
        </section>
    )
}
