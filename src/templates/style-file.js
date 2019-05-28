import React from 'react';
import { graphql } from 'gatsby';
import {exists} from "../helpers/object";

export const query = graphql`
    query StylePage($id: String!) {
        sprykerStyleFile(id: { eq: $id }) {
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
`;

export default ({ data }) => {
    const section = data.sprykerStyleFile;

    return exists(data, 'sprykerStyleFile') && (
        <section className="section">
            {section.type}
        </section>
    )
}
