import React from 'react';

import Header from './Header';
import Main from './Main';
import I18n from '../../src';
import en from './i18n/en';
import './app.css';

const i18nConfig = {
    fallback: en,
    langs: ['en', 'pt-BR'],
    messagesProvider: lang => import(`./i18n/${lang}`)
};

const App = props => {
    return (
        <I18n tryUseNavigatorLang config={i18nConfig}>
            <Header />
            <Main />
        </I18n>
    );
};

export default App;
