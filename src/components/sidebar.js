import React from 'react';
import { Link } from 'gatsby';
import { exists } from '../helpers/object';

export default class extends React.Component {
    state = {
        active: this.props.location.pathname
    }

    activate = (slug) => () => {
        this.setState(state => ({
            active: slug
        }))
    }

    activeHeader = (slug) => {
        if (this.state.active.indexOf(slug) === 0) {
            return 'navigation__header--active';
        }

        return '';
    }

    activeContent = (slug) => {
        if (this.state.active.indexOf(slug) === 0) {
            return 'navigation__content--active';
        }

        return '';
    }

    render() {
        const { navigation } = this.props;

        return (
            <aside className='navigation'>
                {navigation.modules.map(module => exists(module, 'types') && (
                    <div>
                        <button className={`navigation__header ${this.activeHeader(module.slug)}`} onClick={this.activate(module.slug)}>
                            {module.name}
                        </button>
                        <ul className={`navigation__content ${this.activeContent(module.slug)}`}>
                            {module.types.map(type => (
                                <li>
                                    <em className='is-capitalized'>{type.name}s</em>
                                    <ul>
                                        {type.components.map(component => (
                                            <li className='navigation__item'>
                                                <Link to={component.slug} className='navigation__link' activeClassName='navigation__link--active'>
                                                    {component.name}
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
        )
    }
}
