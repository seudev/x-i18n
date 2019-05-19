export const ActionType = {
    INIT: '@seudev/x-i18n.init',
    SET_LANG: '@seudev/x-i18n.set_lang',
    ADD_LANG: '@seudev/x-i18n.add_lang',
};

var stateGetter = null;

export const getState = () => stateGetter().i18n;

export const xi18n = data => (dispatch, getState) => {
    stateGetter = getState;
    dispatch({
        type: ActionType.INIT,
        payload: data
    });
};

const addLang = (lang, messagesProvider, dispatch) => {
    return messagesProvider(lang).then(data => {
        dispatch({
            type: ActionType.ADD_LANG,
            payload: data.default
        });
    });
}

export const setLang = lang => (dispatch, getState) => {
    const state = getState();
    const action = {
        type: ActionType.SET_LANG,
        payload: lang
    };

    if (state.i18n.messages[lang] === undefined) {
        addLang(lang, state.i18n.messagesProvider, dispatch)
            .then(() => dispatch(action));

    } else {
        dispatch(action);
    }
};

export const tryUseNavigatorLang = () => (dispatch, getState) => {
    const state = getState();
    const userLang = (navigator.language || navigator.userLanguage);

    if (state.i18n.lang.all.includes(userLang)) {
        setLang(userLang)(dispatch, getState);
    }
};

export default {
    xi18n,
    setLang,
    tryUseNavigatorLang
};
