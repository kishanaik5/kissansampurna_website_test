import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Default to English or saved language
    const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'English');

    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
    }, [language]);

    // Translation function
    const t = (key) => {
        const keys = key.split('.');
        let result = translations[language];

        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                // Fallback to English if key missing in current language
                return translations['English'][key] || key;
            }
        }
        return result || key;
    };

    const languages = [
        { code: 'English', name: 'English' },
        { code: 'Kannada', name: 'ಕನ್ನಡ' },
        { code: 'Telugu', name: 'తెలుగు' },
        { code: 'Hindi', name: 'हिंदी' },
        { code: 'Malayalam', name: 'മലയാളം' },
        { code: 'Tamil', name: 'தமிழ்' },
        { code: 'Bengali', name: 'বাংলা' },
        { code: 'Gujarathi', name: 'ગુજરાતી' },
        { code: 'Odia', name: 'ଓଡ଼ିଆ' },
        { code: 'Marathi', name: 'मराठी' }
    ];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
