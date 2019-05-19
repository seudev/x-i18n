import { combineReducers } from 'redux';

import { i18nReducer } from '../../../src';

export default combineReducers({
    i18n: i18nReducer,
});
