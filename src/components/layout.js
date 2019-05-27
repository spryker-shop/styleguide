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
        allSprykerNavigation {
            edges {
                node {
                    id
                    name
                    slug
                    nodes {
                        label
                        slug
                        isPage
                        hasChildren
                        children {
                            label
                            slug
                            isPage
                            hasChildren
                            children {
                                label
                                slug
                                isPage
                                hasChildren
                                children {
                                    label
                                    slug
                                    isPage
                                    hasChildren
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default class extends React.Component {
    state = {
        isSidebarShown: false
    };

    toggleSidebar = () => {
        this.setState(state => ({
            isSidebarShown: !state.isSidebarShown
        }));
    };

    sidebarActiveClass = () => {
        return this.state.isSidebarShown ? 'is-active' : '';
    };

    render() {
        const { children } = this.props;
        return (
            <StaticQuery
                query={query}
                render={data => {
                    const sectionNodes = data.allSprykerNavigation.edges.map(edge => edge.node);
                    return (
                        <>
                            <Helmet title={data.site.siteMetadata.title} meta={data.site.siteMetadata.meta} >
                                <html lang="en" className="has-navbar-fixed-top" />
                            </Helmet>
                            <Header title={data.site.siteMetadata.title} toggleSidebar={this.toggleSidebar} sidebarActiveClass={this.sidebarActiveClass} />
                            <div className="layout container is-fullhd">
                                <div className="layout__container columns">
                                    <div className="layout__container layout__container--nav column is-one-quarter has-background-white-bis">
                                        <Location>
                                            {locationProps => <Sidebar {...locationProps} listOfNavigation={sectionNodes} toggleSidebar={this.toggleSidebar} sidebarActiveClass={this.sidebarActiveClass} />}
                                        </Location>
                                    </div>
                                    <main className="layout__container layout__container--overflow column">
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </>
                )}}
            />
        )
    }
}
