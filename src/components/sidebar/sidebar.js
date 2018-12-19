import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import style from './sidebar.module.css';

const query = graphql`
    query SiteNavigationQuery {
        allSprykerComponent {
            edges {
                node {
                    name
                    slug
                }
            }
        }
    }
`;

// componentDidMount() {
//     document.body.style.overflow = 'auto'
// }

export default ({ siteTitle }) => (
    <StaticQuery
        query={query}
        render={data => (
            <aside className={style.sidebar}>
                <ul>
                    {data.allSprykerComponent.edges.map(edge => (
                        <li>
                            <Link to={edge.node.slug}>
                                {edge.node.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        )}
    />
)
