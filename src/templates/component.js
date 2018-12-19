import React from 'react';
// import { Link } from 'gatsby'
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';

export const query = graphql`
    query SiteComponentPage($slug: String!) {
        sprykerComponent(slug: { eq: $slug }) {
            name
            readme
        }
    }
`

export default ({ data }) => (
    <Layout>
        Component: {data.sprykerComponent.name}
        <hr />
        <article dangerouslySetInnerHTML={{ __html: data.sprykerComponent.readme }} ></article>
    </Layout>
)
