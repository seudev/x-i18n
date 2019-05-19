import { ActionType } from './i18nActions';

const INITIAL_STATE = {
    lang: {
        current: "",
        fallback: "",
        all: []
    },
    messagesProvider: null,
    messages: {},
};

const reducers = {};
reducers[ActionType.INIT] = (state, action) => {
    const data = { ...action.payload };
    const { id, messages } = data.fallback;
    const newState = {
        lang: {
            current: id,
            fallback: id,
            all: data.all
        },
        messagesProvider: data.messagesProvider,
        messages: {}
    };
    newState.messages[id] = messages;
    return newState;
};

reducers[ActionType.ADD_LANG] = (state, action) => {
    const data = action.payload;
    const id = data.id;
    const newState = { ...state };
    newState.messages[id] = data.messages;
    return newState;
};

reducers[ActionType.SET_LANG] = (state, action) => {
    const newState = { ...state };
    newState.lang.current = action.payload;
    return newState;
};

export default (state = INITIAL_STATE, action) => {
    const reducer = reducers[action.type];
    return (reducer ? reducer(state, action) : state);
};
