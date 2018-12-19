import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import style from './layout.module.css'
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';

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
    { name: 'description', content: 'Sample' },
    { name: 'keywords', content: 'sample, something' },
];

const Layout = ({ children }) => (
    <StaticQuery
        query={query}
        render={data => (
            <>
                <Helmet title={data.site.siteMetadata.title} meta={meta} >
                    <html lang="en" />
                </Helmet>
                <div className={style.layout}>
                    <div className={style.layout__header}>
                        <Header title={data.site.siteMetadata.title} />
                    </div>
                    <div className={style.layout__sidebar}>
                        <Sidebar />
                    </div>
                    <main className={style.layout__content}>
                        {children}
                    </main>
                </div>
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
