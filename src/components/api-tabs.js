import React from 'react';

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

    showNoApiMessage = (name) => {
        if (!this.props.api || !this.props.api[name] || this.props.api[name].length < 1) {
            return '';
        }

        return 'is-hidden';
    }

    showApi = (name) => {
        if (!this.props.api || !this.props.api[name] || this.props.api[name].length < 1) {
            return 'is-hidden';
        }

        return '';
    }

    css = () => {
        if (!this.props.api.sass || this.props.api.sass.length < 1) {
            return [];
        }

        return this.props.api.sass;
    }

    tags = () => {
        if (!this.props.api.typescript || !this.props.api.typescript.classes || this.props.api.typescript.classes.length < 1) {
            return [];
        }

        return this.props.api.typescript.classes[0].tags;
    }

    methods = () => {
        if (!this.props.api.typescript || !this.props.api.typescript.classes || this.props.api.typescript.classes.length < 1) {
            return [];
        }

        return this.props.api.typescript.classes[0].methods.filter((method => method.visibility === 'public'));
    }

    render() {
        const { sass, typescript } = this.props.api;

        return (
            <>
                <section className="section">
                    <h2 className="title">Component API</h2>
                    <div className="tabs">
                        <ul>
                            <li className={this.currentTabLabel(API.TWIG)} onClick={this.showTab(API.TWIG)}><a>Twig</a></li>
                            <li className={this.currentTabLabel(API.SASS)} onClick={this.showTab(API.SASS)}><a>Sass</a></li>
                            <li className={this.currentTabLabel(API.TYPESCRIPT)} onClick={this.showTab(API.TYPESCRIPT)}><a>Typescript</a></li>
                        </ul>
                    </div>

                    <div className={this.currentTab(API.TWIG)}>
                        <div className={this.showNoApiMessage(API.TWIG) + ' message is-info'}>
                            <div className="message-body">
                                There are no Twig API for this component.
                            </div>
                        </div>
                    </div>

                    <div className={this.currentTab(API.SASS)}>
                        <div className={this.showNoApiMessage(API.SASS) + ' message is-info'}>
                            <div className="message-body">
                                There are no Sass API for this component.
                            </div>
                        </div>
                        <div className={this.showApi(API.SASS) + ' content'}>
                            <ul>
                                {this.css().map(css => (
                                    <li>
                                        {css.context.type} <code>{css.context.name}</code>
                                        <br />
                                        {css.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={this.currentTab(API.TYPESCRIPT)}>
                        <div className={this.showNoApiMessage(API.TYPESCRIPT) + ' message is-info'}>
                            <div className="message-body">
                                There are no Typescript API for this component.
                            </div>
                        </div>
                        <div className={this.showApi(API.TYPESCRIPT) + ' content'}>
                            <h4>Events</h4>
                            <ul>
                                {this.tags().map(tag => (
                                    <li>
                                        {tag.name} <code>{tag.description.split(' ')[0]}</code>
                                        <br />
                                        {tag.description}
                                    </li>
                                ))}
                            </ul>

                            <h4>Methods</h4>
                            <ul>
                                {this.methods().map(method => (
                                    <li>
                                        <code>{method.visibility} {method.name}(): {method.returnType}</code>
                                        <br />
                                        {method.description}
                                        <ul>
                                            {method.tags.map(tag => (
                                                <li>
                                                    <em>{tag.name}</em> {tag.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
