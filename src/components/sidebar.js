import React from 'react';
import { Link } from 'gatsby';
import { exists } from '../helpers/object';
import Highlighter from 'react-highlight-words';

export default class extends React.Component {
    state = {
        active: this.props.location.pathname,
        activeAll: false,
        list: this.props.listOfModules.modules,
        searchFilter: '',
    };

    activate = (slug) => () => {
        this.setState({
            active: slug
        })
    };

    activeHeader = (slug) => this.toggleClass(slug, 'navigation__header--active');

    activeContent = (slug) => this.toggleClass(slug, 'navigation__content--active');

    toggleClass = (slug, activeClass) => ((this.state.active.indexOf(slug) === 0) || this.state.activeAll) ? activeClass : '';

    filterList = (event) => {
        const initialList = this.props.listOfModules.modules;
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

            item.types.every((type) => {
                return type.components = type.components.filter((component) => this.isMatched(component.name, search))
            });

            return (item.types.some((type) => {
                return type.components.some((component) => this.isMatched(component.name, search))
            }));
        });
    };

    isMatched = (target, search) => {
        return target.toLowerCase().search(search) !== -1
    };

    render() {
        const { toggleSidebar, sidebarActiveClass } = this.props;

        return (
            <>
                <div className={`navigation-wrapper ${sidebarActiveClass()}`}>
                    <div className='control control--search'>
                        <input className='input' type='text' placeholder='Search' onChange={this.filterList}/>
                    </div>
                    <aside className='navigation'>
                        {this.state.list.map(module => exists(module, 'types') && (
                            <div key={module.name}>
                                <button className={`navigation__header ${this.activeHeader(module.slug)}`} onClick={this.activate(module.slug)}>
                                    <Highlighter
                                        highlightClassName='markered'
                                        searchWords={[this.state.searchFilter]}
                                        autoEscape={true}
                                        textToHighlight={module.name}
                                    />
                                </button>
                                <ul className={`navigation__content ${this.activeContent(module.slug)}`}>
                                    {module.types.map(type => exists(type, 'components') && (
                                        <li key={`${module.name}-${type.name}`}>
                                            <em className='is-capitalized'>{type.name}s</em>
                                            <ul>
                                                {type.components.map(component => (
                                                    <li key={component.name} className='navigation__item'>
                                                        <Link to={component.slug} className='navigation__link' activeClassName='navigation__link--active' onClick={toggleSidebar}>
                                                            <Highlighter
                                                                highlightClassName='markered'
                                                                searchWords={[this.state.searchFilter]}
                                                                autoEscape={true}
                                                                textToHighlight={component.name}
                                                            />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </aside>
                </div>
                <div className={`navigation-overlay ${sidebarActiveClass()}`} onClick={toggleSidebar}>&nbsp;</div>
            </>
        )
    }
}
