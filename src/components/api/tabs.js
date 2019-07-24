import React from 'react';
import TwigTab from './tab-twig';
import SassTab from './tab-sass';
import TypescriptTab from './tab-typescript';

const API = {
    TWIG: 'Twig',
    SASS: 'Sass',
    TYPESCRIPT: 'Typescript'
};

export default class extends React.Component {
    state = {
        activeTab: API.TWIG,
    };

    components = {
        twig: TwigTab,
        sass: SassTab,
        typescript: TypescriptTab,
    };

    componentDidMount() {
        this.setState({
            activeTab: this.findActiveTab(this.props.api)
        });
    }

    findActiveTab = (listOfTabs) => {
        return listOfTabs.twig.exists ? API.TWIG : API.SASS;
    };

    showTab = (activeTab) => () => {
        this.setState({
            activeTab
        })
    };

    currentTabLabel = (tab) => {
        if (this.state.activeTab === tab) {
            return 'is-active';
        }

        return '';
    };

    currentTab = (tab) => {
        if (this.state.activeTab === tab) {
            return '';
        }

        return 'is-hidden';
    };

    filterTabs = tabs => tabs.filter(tab => tab.content !== null ? tab.content.exists : false);

    mapContentComponents = (name, api) => {
        const TagName = this.components[name.toLowerCase()];
        return <TagName api={api.external} />
    };

    render() {
        const tabList = [
            {
                name: API.TWIG,
                content: this.props.api.twig,
            },
            {
                name: API.SASS,
                content: this.props.api.sass,
            },
            {
                name: API.TYPESCRIPT,
                content: this.props.api.typescript,
            },
        ];

        return (
            <section>
                <h3 className="title is-size-4">Component API</h3>

                <div className="tabs">
                    <ul>
                        {this.filterTabs(tabList).map(tab => (
                            <li key={tab.name} className={this.currentTabLabel(tab.name)}><button className="tabs__button" onClick={this.showTab(tab.name)}>{tab.name}</button></li>
                        ))}
                    </ul>
                </div>

                {this.filterTabs(tabList).map((tab) => (
                    <div key={`${tab.name}-content`} className={this.currentTab(tab.name)}>
                        {this.mapContentComponents(tab.name, tab.content.api)}
                    </div>
                ))}
            </section>
        )
    }
}
