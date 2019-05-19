import { DateTime } from 'luxon';
import { getState } from './i18nActions';

export { default as i18nActions } from './i18nActions';
export { default as i18nReducer } from './i18nReducer';
export { default as Message } from './Message';

export const getCurrentLang = () => {
  const i18n = getState();
  return i18n.lang.current;
}

export const formatDate = (date, options, lang) => {
  if (date instanceof Date) {
    return date.toLocaleDateString(lang || getCurrentLang(), options || {});
  } else if (date instanceof DateTime) {
    return date.setLocale(lang || getCurrentLang()).toLocaleString(options || {});
  }
}
