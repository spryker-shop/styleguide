import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

const query = graphql`
    query SiteNavigationQuery {
        sprykerNavigation(namespace: {eq: "SprykerShop"}) {
            namespace
            modules {
                name
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

export default ({ siteTitle }) => (
    <StaticQuery
        query={query}
        render={data => (
            <aside className="menu">
                {data.sprykerNavigation.modules.map(module => (
                    <>
                        <p className="menu-label">{module.name}</p>
                        <ul className="menu-list">
                            {module.types.map(type => (
                                <li>
                                    <em className="is-capitalized">{type.name}s</em>
                                    <ul>
                                        {type.components.map(component => (
                                            <li>
                                                <Link to={component.slug}>
                                                    {component.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                ))}
            </aside>
        )}
    />
)
