import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { constants } from './constants';
import { en_language } from './en/en';
import { ua_language } from './ua/ua';

const resources = {
  [constants.EN]: {
    translation: en_language,
  },
  [constants.UA]: {
    translation: ua_language,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: constants.UA,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
