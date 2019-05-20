import React from 'react';
import MissingResourceMessage from '../missing-resource-message';
import TwigTab from './tab-twig';
import SassTab from './tab-sass';
import TypescriptTab from './tab-typescript';

const API = {
    TWIG: 'twig',
    SASS: 'sass',
    TYPESCRIPT: 'typescript'
}

export default class extends React.Component {
    state = {
        activeTab: API.TWIG
    }

    showTab = (activeTab) => () => {
        this.setState(state => ({
            activeTab
        }))
    }

    currentTabLabel = (tab) => {
        if (this.state.activeTab === tab) {
            return 'is-active';
        }

        return '';
    }

    currentTab = (tab) => {
        if (this.state.activeTab === tab) {
            return '';
        }

        return 'is-hidden';
    }

    render() {
        const { twig, sass, typescript } = this.props.api;

        return (
            <section>
                <h3 className="title is-size-4">Component API</h3>

                <div className="tabs">
                    <ul>
                        <li className={this.currentTabLabel(API.TWIG)}><button className="tabs__button" onClick={this.showTab(API.TWIG)}>Twig</button></li>
                        <li className={this.currentTabLabel(API.SASS)}><button className="tabs__button" onClick={this.showTab(API.SASS)}>Sass</button></li>
                        <li className={this.currentTabLabel(API.TYPESCRIPT)}><button className="tabs__button" onClick={this.showTab(API.TYPESCRIPT)}>Typescript</button></li>
                    </ul>
                </div>

                <div className={this.currentTab(API.TWIG)}>
                    <MissingResourceMessage resource={twig}>
                        There are no {API.TWIG} API for this component.
                    </MissingResourceMessage>
                    <TwigTab api={twig} />
                </div>

                <div className={this.currentTab(API.SASS)}>
                    <MissingResourceMessage resource={sass}>
                        There are no {API.SASS} API for this component.
                    </MissingResourceMessage>
                    <SassTab api={sass} />
                </div>

                <div className={this.currentTab(API.TYPESCRIPT)}>
                    <MissingResourceMessage resource={typescript}>
                        There are no {API.TYPESCRIPT} API for this component.
                    </MissingResourceMessage>
                    <TypescriptTab api={typescript} />
                </div>
            </section>
        )
    }
}
