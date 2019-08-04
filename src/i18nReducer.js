import { ActionType } from './i18nActions';

export const INITIAL_STATE = {
    lang: {
        current: "",
        fallback: "",
        all: []
    },
    messages: {},
};

const reducers = {
    [ActionType.INIT]: (state, action) => {
        const data = { ...action.payload };
        const { id, messages } = data.fallback;
        const newState = {
            lang: {
                current: id,
                fallback: id,
                all: data.all
            },
            messages: {}
        };
        newState.messages[id] = messages;
        return newState;
    },
    [ActionType.ADD_LANG]: (state, action) => {
        const data = action.payload;
        const id = data.id;
        const newState = { ...state };
        newState.messages[id] = data.messages;
        return newState;
    },
    [ActionType.SET_LANG]: (state, action) => {
        const newState = { ...state };
        newState.lang.current = action.payload;
        return newState;
    }
};

export default (state = INITIAL_STATE, action) => {
    const reducer = reducers[action.type];
    return (reducer ? reducer(state, action) : state);
};
