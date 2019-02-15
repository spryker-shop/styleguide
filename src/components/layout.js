import React from 'react';
import Helmet from 'react-helmet';
import { Location } from '@reach/router';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';
import Sidebar from './sidebar';

const query = graphql`
    query SiteInfoQuery {
        site {
            siteMetadata {
                title
                meta {
                    name
                    content
                }
            }
        }
        sprykerNavigation(namespace: {eq: "SprykerShop"}) {
            namespace
            modules {
                name
                slug
                types {
                    name
                    components {
                        name
                        slug
                    }
                }
            }
        }
    }
`;

export default ({ children }) => (
    <StaticQuery
        query={query}
        render={data => (
            <>
                <Helmet title={data.site.siteMetadata.title} meta={data.site.siteMetadata.meta} >
                    <html lang="en" className="has-navbar-fixed-top" />
                </Helmet>
                <Header title={data.site.siteMetadata.title} />
                <div className="layout container is-fullhd">
                    <div className="layout__container columns">
                        <div className="layout__container layout__container--overflow column is-one-quarter has-background-white-bis">
                            <Location>
                                {locationProps => <Sidebar {...locationProps} navigation={data.sprykerNavigation} />}
                            </Location>
                        </div>
                        <main className="layout__container layout__container--overflow column">
                            {children}
                        </main>
                    </div>
                </div>
            </>
        )}
    />
)
