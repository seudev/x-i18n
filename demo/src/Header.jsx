import React from 'react';

import { useI18n } from '../../src';

const Header = props => {
    const { lang, langs, setLang, tryUseNavigatorLang, getMessage } = useI18n();

    return (
        <header>
            <a href="https://seudev.com">
                <img src="https://seudev.com/img/brand/seudev-negative-horizonatal-264px-94px.png" alt="Seudev" />
            </a>
            <h1>@seudev/x-i18n</h1>
            <h2>A React library that use hooks to internationalize the messages of your app.</h2>
            <select value={lang} onChange={e => setLang(e.target.value)}>
                {langs.map((lang, index) => (
                    <option key={index} value={lang}>
                        {getMessage(`lang.${lang}`)}
                    </option>
                ))}
            </select>
            <button onClick={e => tryUseNavigatorLang()}>Try Use Navigator Lang</button>
            <a href="http://x-i18n.seudev.com" className="corner">
                <span>Learn How to Use it!</span>
            </a>
        </header>
    );

}

export default Header;
