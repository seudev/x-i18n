import React from 'react';

import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import JSError from '@seudev/js-error';
import { } from './Message';

export const formatDate = (date, options, lang) => {
    const language = lang ? lang : useI18n().lang;

    if (date instanceof Date) {
        return date.toLocaleDateString(language, options || {});
    } else if (date instanceof DateTime) {
        return date.setLocale(language).toLocaleString(options || {});
    }
};

const addLang = (lang, state, setState, messagesProvider) => {
    const { langs, messages } = state;

    if (!messagesProvider) {
        return new Promise(((resolve, reject) => {
            reject(new JSError({
                name: "X-i18n",
                message: `Not found messages provider.`
            }));
        }));
    }

    return messagesProvider(lang)
        .then(data => {
            setState({
                ...state,
                lang: lang,
                langs: langs.includes(lang) ? langs : [...langs, lang],
                messages: {
                    ...messages,
                    [data.default.id]: data.default.messages
                }
            });
        }).catch(ex => {
            throw new JSError({
                name: "X-i18n",
                message: `Cannot load the messages of lang: ${lang}`,
                data: { lang }
            }, ex);
        });
}

const buildSetLang = (state, setState, messagesProvider) => lang => {
    return new Promise((resolve, reject) => {
        if (state.messages[lang] === undefined) {
            addLang(lang, state, setState, messagesProvider)
                .then(() => resolve())
                .catch(e => reject(e));
        } else if (state.lang !== lang) {
            setState({
                ...state,
                lang: lang
            });
            resolve();
        }
    });
};

const buildTryUseNavigatorLang = (langs, setLang) => () => {
    const userLang = (navigator.language || navigator.userLanguage);

    return new Promise((resolve, reject) => {
        if (langs.includes(userLang)) {
            setLang(userLang)
                .then(() => resolve())
                .catch(e => reject(e));
        } else {
            reject(`Unsupported lang: ${userLang}`);
        }
    });
};

export const I18nContext = React.createContext();

export const useI18n = () => React.useContext(I18nContext);

export const getNestedValue = (obj, key, defaultValue) => {
    if (obj != null) {
        key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        key = key.replace(/^\./, '');           // strip a leading dot
        let keys = key.split('.');
        for (let k of keys) {
            obj = obj[k];
            if (obj == null) {
                break;
            }
        }
    }
    return (obj == null) ? defaultValue : obj;
}

export const getTemplate = (id, defaultTemplate) => {
    const { lang, fallback, messages } = useI18n();

    try {
        if (id == null) {
            if (defaultTemplate == null) {
                throw new JSError("The id must be not null.");
            }
            return defaultTemplate;
        }
        let template = null;
        const ids = (id instanceof Array) ? id : [id];
        for (let key of ids) {
            template = getNestedValue(messages[lang], key);
            if (template == null) {
                template = getNestedValue(messages[fallback], key);
            } else {
                break;
            }
        }

        if ((template == null) && (defaultTemplate == null)) {
            throw new JSError(`Not found template for the id: "${id}", in the language${lang === fallback ? ` "${lang}"` : `s "${lang}" and "${fallback}"`}.`);
        }
        return template || defaultTemplate;
    } catch (ex) {
        throw new JSError({
            name: "MessageError",
            message: `Cannot get the template: "${id}".`,
            data: {
                id,
                lang: {
                    current: lang,
                    fallback: fallback
                },
                defaultTemplate
            }
        }, ex);
    }
}

export const interpolate = (template, params = {}) => {
    const { getMessage, formatDate } = useI18n();
    try {
        params.getMessage = getMessage;
        params.formatDate = formatDate;
        const names = Object.keys(params);
        const values = Object.values(params);
        names.push('params');
        values.push(params);
        const message = new Function(...names, `return \`${template}\`;`)(...values);
        return message;
    } catch (ex) {
        throw new JSError({
            name: "MessageError",
            message: `Cannot interpolate the message: "${template}".`,
            data: { template, params }
        }, ex);
    }
}

export const getMessage = (id, params = {}, defaultMessage) => {
    try {
        const template = getTemplate(id, defaultMessage);
        if (template instanceof Array) {
            return template.map(t => interpolate(t, params));
        }
        return interpolate(template, params);
    } catch (ex) {
        console.error(new JSError({
            name: "MessageError",
            message: `Cannot get the message with the id: "${id}".`,
            data: { id, params, defaultMessage }
        }, ex));
        return "";
    }
}

const I18n = ({ lang, tryUseNavigatorLang, config: { fallback, langs, messagesProvider }, children }) => {
    const [state, setState] = React.useState({
        lang: fallback.id,
        fallback: fallback.id,
        langs: langs,
        messages: {
            [fallback.id]: fallback.messages
        }
    });

    const setLang = buildSetLang(state, setState, messagesProvider);
    const _tryUseNavigatorLang = buildTryUseNavigatorLang(state.langs, setLang);

    if (lang) {
        React.useEffect(() => {
            if (state.lang !== lang) {
                setLang(lang);
            }
        }, [lang]);
    }

    if (tryUseNavigatorLang) {
        React.useEffect(() => {
            _tryUseNavigatorLang();
        }, [tryUseNavigatorLang]);
    }

    const i18n = {
        ...state,
        setLang: setLang,
        tryUseNavigatorLang: _tryUseNavigatorLang,
        getMessage,
        formatDate
    };

    return (
        <I18nContext.Provider value={i18n}>
            {children}
        </I18nContext.Provider>
    );
};

I18n.propTypes = {
    config: PropTypes.shape({
        fallback: PropTypes.shape({
            id: PropTypes.string,
            messages: PropTypes.object
        }).isRequired,
        langs: PropTypes.arrayOf(PropTypes.string).isRequired,
        messagesProvider: PropTypes.func.isRequired,
    }),
    lang: PropTypes.string,
    tryUseNavigatorLang: PropTypes.bool
};

I18n.defaultValues = {
    tryUseNavigatorLang: false
};

export default I18n;
