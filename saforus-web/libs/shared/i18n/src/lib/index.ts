import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';

import koKR from '@locales/ko-KR';
import enUS from '@locales/en-US';

const resources = {
  en: {
    translation: enUS,
  },
  ko: {
    translation: koKR,
  },
};

function getSessionLang(privateKey: string, defaultLang?: string) {
  const langs = ['ko', 'en'];
  const langStr = localStorage.getItem(privateKey);
  if (langStr === null || langStr === undefined || !langs.includes(langStr)) {
    const defaultLangStr = defaultLang || 'ko';
    localStorage.setItem(privateKey, defaultLangStr);
    return defaultLangStr;
  }

  return langStr;
}

export function initializeI18next(privateKey: string, defaultLang?: string) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: false,
      react: {
        useSuspense: true,
        transSupportBasicHtmlNodes: true,
      },
      returnEmptyString: false,
      keySeparator: '.',
      nsSeparator: false,
      interpolation: {
        prefix: '%{',
        suffix: '}',
      },
      lng: getSessionLang(privateKey, defaultLang),
      parseMissingKeyHandler(key: string) {
        /* eslint-disable-next-line no-console */
        console.warn('parseMissingKeyHandler', `'key': '${key}'`);
        const keySeparator = '~~';
        return key.includes(keySeparator) ? key.split(keySeparator)[1] : key;
      },
      resources,
      detection: {
        order: ['localStorage', 'querystring', 'navigator'],
        lookupQuerystring: 'lang', // default is lng
        lookupLocalStorage: privateKey,
        caches: ['localStorage', 'cookie'],
      },
    });
}

export const i18n = i18next;
