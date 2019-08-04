import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSError from '@seudev/js-error';
import { getState } from './I18n';

const PARAMS = "params";

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
    const i18n = getState();
    const currentLang = i18n.lang.current;
    const fallbackLang = i18n.lang.fallback;
    try {
        if (id == null) {
            if (defaultTemplate == null) {
                throw new JSError("The id must be not null.");
            }
            return defaultTemplate;
        }
        let template = getNestedValue(i18n.messages[currentLang], id);
        if (template == null) {
            template = getNestedValue(i18n.messages[fallbackLang], id);
        }
        if ((template == null) && (defaultTemplate == null)) {
            throw new JSError(`Not found template for the id: "${id}", in the language${currentLang === fallbackLang ? ` "${currentLang}"` : `s "${currentLang}" and "${fallbackLang}"`}.`);
        }
        return template || defaultTemplate;
    } catch (ex) {
        throw new JSError({
            name: "MessageError",
            message: `Cannot get the template: "${id}".`,
            data: {
                id,
                lang: {
                    current: currentLang,
                    fallback: fallbackLang
                },
                defaultTemplate
            }
        }, ex);
    }
}

export const interpolate = (template, params = {}) => {
    try {
        params.getMessage = getMessage;
        const names = Object.keys(params);
        const values = Object.values(params);
        if (!names.includes(PARAMS)) {
            names.push(PARAMS);
            values.push(params);
        }
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

const Message = props => {
    const { id, params, rawHtml } = props;
    const message = getMessage(id, params, props.default);
    const messages = ((message instanceof Array) ? message : [message]);
    const ElementType = (props.as || React.Fragment);
    return (
        <React.Fragment>
            {messages.map((message, index) => {
                if (rawHtml) {
                    return (
                        <ElementType key={index} dangerouslySetInnerHTML={{ __html: message }} />
                    );
                }
                return (
                    <ElementType key={index}>{message}</ElementType>
                );
            })}
        </React.Fragment>
    );
};

Message.propTypes = {
    id: PropTypes.string,
    params: PropTypes.object,
    rawHtml: PropTypes.bool,
    default: PropTypes.string,
    as: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType
    ]),
};

Message.defaultProps = {

};

const mapStateToProps = state => ({
    i18n: state.i18n
});

export default connect(mapStateToProps)(Message);
