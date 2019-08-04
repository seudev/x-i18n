import I18n from './I18n';

export { default as i18nActions, xi18n, setLang, tryUseNavigatorLang } from './i18nActions';
export { default as i18nReducer } from './i18nReducer';
export { default as Message, getMessage, getNestedValue } from './Message';
export { getCurrentLang, formatDate } from './I18n';
export default I18n;
