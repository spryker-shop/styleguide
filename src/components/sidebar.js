import React from 'react';
import { Link } from 'gatsby';
import { exists } from '../helpers/object';
import Highlighter from 'react-highlight-words';

export default class extends React.Component {
    state = {
        active: this.props.location.pathname.replace(/^\//, ''),
        activeAll: false,
        list: this.props.listOfNavigation,
        searchFilter: '',
    };

    activate = (slug) => () => {
        this.setState({
            active: slug
        })
    };

    activeHeader = (slug) => this.toggleClass(slug, 'navigation__header--active');

    activeContent = (slug) => this.toggleClass(slug, 'navigation__content--active');

    toggleClass = (slug, activeClass) => (this.state.active.startsWith(slug) || this.state.activeAll) ? activeClass : '';

    filterList = (event) => {
        const initialList = this.props.listOfNavigation;
        const copyOfList = JSON.parse(JSON.stringify(initialList));

        if (event.target.value.length > 0) {
            const searchQuery = event.target.value.toLowerCase();
            const filteredList = this.findInArray(copyOfList, searchQuery);

            this.setState({
                list: filteredList,
                activeAll: true,
                searchFilter: event.target.value,
            });

            return
        }

        this.setState({
            list: initialList,
            activeAll: false,
            searchFilter: '',
        })
    };

    findInArray = (list, search) => {
        return list.filter((item) => {
            if (this.isMatched(item.name, search)) {
                return true;
            }

            return item.nodes = item.nodes.filter((node) => {
                if (this.isMatched(node.label, search)) {
                    return true;
                }

                if (node.children) {
                    return node.children = node.children.filter((children) => {
                        if (this.isMatched(children.label, search)) {
                            return true;
                        }
                        if (children.children) {
                            children.children.every((type) => {
                                return type.children = type.children.filter((component) => this.isMatched(component.label, search))
                            });

                            return (children.children.some((type) => {
                                return type.children.some((component) => this.isMatched(component.label, search))
                            }));
                        }
                        return false;
                    })
                }

                return false;
            });
        });
    };

    isMatched = (target, search) => {
        return target.toLowerCase().search(search) !== -1
    };

    isComponentType = (name, node) => {
        if (node.children.length === 0) {
            return
        }

        if (name === 'atom' || name === 'molecule' || name === 'organism') {
            return (
                <>
                    <em className='is-capitalized'>{name}</em>

                    {this.navigationBuilder(node.label, node.children, null, true)}
                </>
            )
        }

        return (
            <>
                <button className={`navigation__header ${this.activeHeader(node.slug)}`} onClick={this.activate(node.slug)}>
                    <Highlighter
                        highlightClassName='markered'
                        searchWords={[this.state.searchFilter]}
                        autoEscape={true}
                        textToHighlight={name}
                    />
                </button>

                {this.navigationBuilder(node.label, node.children, node.slug)}
            </>
        )
    };

    navigationBuilder = (parentName, list, parentSlug, contentResetClasses) => (
        <ul className={contentResetClasses ? '' : `navigation__content ${this.activeContent(parentSlug)}`}>
            {list.map(node => (
                <React.Fragment key={`${parentName}-${node.label}`}>
                    {exists(node, 'isPage') && (
                        <li className='navigation__item'>
                            <Link to={`/${node.slug}`} className='navigation__link' activeClassName='navigation__link--active' onClick={this.toggleSidebar}>
                                <Highlighter
                                    highlightClassName='markered'
                                    searchWords={[this.state.searchFilter]}
                                    autoEscape={true}
                                    textToHighlight={node.label}
                                />
                            </Link>
                        </li>
                    )}
                    {exists(node, 'hasChildren') && (
                        <li>
                            {this.isComponentType(node.label, node)}
                        </li>
                    )}
                </React.Fragment>

            ))}
        </ul>
    );

    render() {
        const { toggleSidebar, sidebarActiveClass } = this.props;

        return (
            <>
                <div className={`navigation-wrapper ${sidebarActiveClass()}`}>
                    <div className='control control--search'>
                        <input className='input' type='text' placeholder='Search' onChange={this.filterList}/>
                    </div>
                    <aside className='navigation'>
                        {this.state.list.map(element => exists(element, 'nodes') && (
                            <div key={element.id}>
                                <button className={`navigation__header ${this.activeHeader(element.slug)}`} onClick={this.activate(element.slug)}>
                                    <Highlighter
                                        highlightClassName='markered'
                                        searchWords={[this.state.searchFilter]}
                                        autoEscape={true}
                                        textToHighlight={element.name}
                                    />
                                </button>
                                {this.navigationBuilder(element.name, element.nodes, element.slug)}
                            </div>
                        ))}
                    </aside>
                </div>
                <div className={`navigation-overlay ${sidebarActiveClass()}`} onClick={toggleSidebar}>&nbsp;</div>
            </>
        )
    }
}
