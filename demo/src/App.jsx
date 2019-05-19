import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { i18nActions } from '../../src';
import Header from './Header';
import Examples from './Examples';
import en from './i18n/en';
import './app.css';

class App extends Component {

    componentWillMount() {
        this.props.xi18n({
            fallback: en,
            all: [
                "en",
                "pt-BR"
            ],
            messagesProvider: lang => import(`./i18n/${lang}`)
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <main>
                    <Examples />
                    <div id="x-i18n-state">
                        <h2>i18n state</h2>
                        <pre>
                            <code>{JSON.stringify(this.props.i18n, null, 4)}</code>
                        </pre>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    i18n: state.i18n
});

const mapDispatchToProps = dispatch => bindActionCreators(i18nActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
