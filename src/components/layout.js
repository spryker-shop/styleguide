import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header';
import Sidebar from './sidebar';

const query = graphql`
    query SiteInfoQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

const meta = [
    { name: 'description', content: 'Spryker Styleguide' },
    { name: 'keywords', content: 'spryker, styleguide, spryker-shop' }
];

const Layout = ({ children }) => (
    <StaticQuery
        query={query}
        render={data => (
            <>
                <Helmet title={data.site.siteMetadata.title} meta={meta} >
                    <html lang="en" className="has-navbar-fixed-top" />
                </Helmet>
                <Header title={data.site.siteMetadata.title} />
                <div className="layout container is-fullhd">
                    <div className="layout__container columns">
                        <div className="layout__container layout__container--overflow column is-one-quarter has-background-white-bis">
                            <Sidebar />
                        </div>
                        <main className="layout__container layout__container--overflow column">
                            {children}
                        </main>
                    </div>
                </div>
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
