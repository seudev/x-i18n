import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { i18nActions } from '../../src';
import { getMessage } from '../../src/Message';

class Header extends Component {

    render() {
        const lang = this.props.i18n.lang;
        return (
            <header>
                <a href="https://seudev.com">
                    <img src="https://seudev.com/img/brand/seudev-negative-horizonatal-264px-94px.png" alt="Seudev" />
                </a>
                <h1>@seudev/x-i18n</h1>
                <h2>A React library that use Redux to internationalize the messages of your app.</h2>
                <select value={lang.current} onChange={e => this.props.setLang(e.target.value)}>
                    {lang.all.map((lang, index) => (
                        <option key={index} value={lang}>
                            {getMessage(`lang.${lang}`)}
                        </option>
                    ))}
                </select>
                <button onClick={e => this.props.tryUseNavigatorLang()}>Try Use Navigator Lang</button>
                <a href="http://x-i18n.seudev.com" className="corner">
                    <span>Learn How to Use it!</span>
                </a>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    i18n: state.i18n
});

const mapDispatchToProps = dispatch => bindActionCreators(i18nActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
