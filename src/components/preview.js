import React from 'react';

export default class extends React.Component {
    state = {
        isModalVisible: false
    }

    toggleModal = () => {
        this.setState(state => ({
            isModalVisible: !state.isModalVisible
        }))
    }

    render() {
        const { children } = this.props;
        const { isModalVisible } = this.state;

        return (
            <>
                <button
                    className="button is-primary is-pulled-right"
                    onClick={this.toggleModal}>
                    Show preview
                </button>

                <section className={'modal' + (isModalVisible ? ' is-active' : '')}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Preview</p>
                            <button className="delete" onClick={this.toggleModal}></button>
                        </header>
                        <section className="modal-card-body">
                            {children}
                        </section>
                    </div>
                </section>
            </>
        )
    }
}
