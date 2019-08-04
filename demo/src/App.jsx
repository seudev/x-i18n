import React, { Component } from 'react';

import { connect } from 'react-redux';
import Header from './Header';
import Examples from './Examples';
import I18n from '../../src';
import en from './i18n/en';
import './app.css';

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <I18n init={{ fallback: en, all: ['en', 'pt-BR'], messagesProvider: lang => import(`./i18n/${lang}`) }} />
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

export default connect(mapStateToProps)(App);
