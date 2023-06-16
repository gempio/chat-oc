import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Locale as DateLocale } from 'date-fns';
import { enGB, de } from 'date-fns/locale';

import enTranslation from '../../public/translations/en-GB/main.json';
import deTranslation from '../../public/translations/de-DE/main.json';

export type Locale = 'en-GB';
export const locales: Locale[] = ['en-GB'];
export const defaultLocale: Locale = 'en-GB';
export const iso1ToLocale: { [key: string]: string } = {
  en: 'en-GB',
  de: 'de-DE'
};
export const DateLocaleMapping: { [key: string]: DateLocale } = {
  'en-GB': enGB,
  'de-DE': de
};
export type Namespace = 'main';
export const namespaces: Namespace[] = ['main'];

export function getSupportedUserLocaleFromBrowser(
  defaultLocale: string,
  locales: ReadonlyArray<string>,
  iso1ToLocale: { [key: string]: string }
): string {
  let browserLanguages: string[] = [];
  if (window.navigator.language) {
    browserLanguages = [...browserLanguages, window.navigator.language];
  }
  if (window.navigator.languages) {
    browserLanguages = [...browserLanguages, ...window.navigator.languages];
  }

  const supportedLanguage = browserLanguages.find((browserLanguage) => {
    const isBrowserLocaleSupported = locales.includes(browserLanguage);
    const isBrowserLanguageOnlySupported = !!iso1ToLocale[browserLanguage.split('-')[0]];

    return isBrowserLocaleSupported || isBrowserLanguageOnlySupported;
  });

  if (supportedLanguage) {
    if (locales.includes(supportedLanguage)) {
      return supportedLanguage;
    } else {
      return iso1ToLocale[supportedLanguage.split('-')[0]];
    }
  }

  return defaultLocale;
}
const userDefaultLocale = getSupportedUserLocaleFromBrowser(defaultLocale, locales, iso1ToLocale);

export const resources = {
  'en-GB': {
    main: enTranslation
  },
  'de-DE': {
    main: deTranslation
  }
};

export async function initI18n() {
  await i18n.use(initReactI18next).init({
    defaultNS: namespaces[0],
    fallbackLng: defaultLocale,
    lng: userDefaultLocale,
    ns: ['main'],
    resources,
    debug: false,
    saveMissing: false,
    react: {
      useSuspense: false
    },
    detection: {
      caches: null
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
      format(value: string, format?: string) {
        if (format === 'uppercase') return value.toUpperCase();

        return value;
      }
    }
  });
}

interface I18nProviderProps {
  children?: React.ReactNode;
  language: string;
}

export const I18nProvider = ({ language, children }: I18nProviderProps) => {
  // Using a separate state so it waits for all other components to be mounted/unmounted before changing the language
  // https://www.gitmemory.com/issue/i18next/react-i18next/796/479434338
  const [initiated, setInitiated] = React.useState(false);

  React.useEffect(() => {
    async function initiateI18N() {
      await initI18n();
      setInitiated(true);
    }

    initiateI18N();
  }, []);

  React.useEffect(() => {
    const locale = iso1ToLocale[language] ?? defaultLocale;
    if (initiated && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [language, initiated]);

  if (!initiated) {
    return null;
  }

  return <>{children}</>;
};
