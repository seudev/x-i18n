import { setStateGetter } from './I18n';
import JSError from '@seudev/js-error';

export const ActionType = {
    INIT: '@seudev/x-i18n/init',
    SET_LANG: '@seudev/x-i18n/setLang',
    ADD_LANG: '@seudev/x-i18n/addLang',
};

var messagesProvider = null;

export const xi18n = config => (dispatch, getState) => {
    return new Promise(resolve => {
        setStateGetter(getState);
        const payload = { ...config };
        messagesProvider = payload.messagesProvider;
        delete payload.messagesProvider;
        dispatch({
            type: ActionType.INIT,
            payload
        });
        resolve();
    });
};

const addLang = (lang, dispatch) => {
    if (!messagesProvider) {
        return new Promise(((resolve, reject) => {
            reject(new JSError({
                name: "X-i18n",
                message: `Not found messages provider.`
            }));
        }));
    }

    return messagesProvider(lang).then(data => {
        dispatch({
            type: ActionType.ADD_LANG,
            payload: data.default
        });
    }).catch(ex => {
        throw new JSError({
            name: "X-i18n",
            message: `Cannot load the messages of lang: ${lang}`,
            data: { lang }
        }, ex);
    });
}

export const setLang = lang => (dispatch, getState) => {
    const state = getState();
    const action = {
        type: ActionType.SET_LANG,
        payload: lang
    };

    return new Promise((resolve, reject) => {
        if (state.i18n.messages[lang] === undefined) {
            addLang(lang, dispatch)
                .then(() => dispatch(action))
                .then(() => resolve())
                .catch(e => reject(e));
        } else {
            dispatch(action);
            resolve();
        }
    });
};

export const tryUseNavigatorLang = () => (dispatch, getState) => {
    const state = getState();
    const userLang = (navigator.language || navigator.userLanguage);

    return new Promise((resolve, reject) => {
        if (state.i18n.lang.all.includes(userLang)) {
            setLang(userLang)(dispatch, getState)
                .then(() => resolve())
                .catch(e => reject(e));
        } else {
            reject(`Unsupported lang: ${userLang}`);
        }
    });
};

export default {
    xi18n,
    setLang,
    tryUseNavigatorLang
};
