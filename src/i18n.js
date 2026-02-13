import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import kn from './locales/kn.json';
import te from './locales/te.json';
import hi from './locales/hi.json';
import ml from './locales/ml.json';
import ta from './locales/ta.json';
import bn from './locales/bn.json';
import gu from './locales/gu.json';
import or from './locales/or.json';
import mr from './locales/mr.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            kn: { translation: kn },
            te: { translation: te },
            hi: { translation: hi },
            ml: { translation: ml },
            ta: { translation: ta },
            bn: { translation: bn },
            gu: { translation: gu },
            or: { translation: or },
            mr: { translation: mr }
        },
        lng: 'en', // Force English on initial load
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
