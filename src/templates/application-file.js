import React from 'react';
import { graphql } from 'gatsby';
import {exists} from "../helpers/object";
import Breadcrumb from "../components/breadcrumb";
import Files from "../components/files";
import TypescriptTab from "../components/api/tab-typescript";

export const query = graphql`
    query ApplicationPage($id: String!) {
        sprykerApplicationFile(id: { eq: $id }) {
            exists
            name
            path
            relativePath
            api {
                external {
                    classes {
                        name
                        description
                        methods {
                            name
                            description
                            visibility
                            returnType
                            extractAsync
                            tags {
                                name
                                description
                            }
                        }
                    }
                    functions {
                        name
                        description
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
`;

export default ({ data }) => {
    const section = data.sprykerApplicationFile;

    return exists(data, 'sprykerApplicationFile') && (
        <section className="section">
            <Breadcrumb steps={[section.name]} />
            <h1 className="title is-size-2">
                {section.name.replace(/(_|\.|[^.]+$)/gi, '')}
            </h1>
            <Files files={section} />
            <TypescriptTab api={section.api.external} />
        </section>
    )
}

