import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { cn } from '../utils/cn';

const LanguageSwitcher = ({ isScrolled, isHome, isInHero, mobile, theme }) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
        { code: 'te', name: 'తెలుగు (Telugu)' },
        { code: 'hi', name: 'हिन्दी (Hindi)' },
        { code: 'ml', name: 'മലയാളം (Malayalam)' },
        { code: 'ta', name: 'தமிழ் (Tamil)' },
        { code: 'bn', name: 'বাংলা (Bengali)' },
        { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
        { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
        { code: 'mr', name: 'मराठी (Marathi)' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className={cn(
                    "flex items-center gap-1 text-lg font-bold transition-all outline-none",
                    (theme === 'light' && isInHero)
                        ? "text-white/90 hover:text-white drop-shadow-md"
                        : "text-gray-700 hover:text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                )}
                aria-label="Select Language"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Globe className="h-5 w-5" />
                <span>{i18n.language.substring(0, 2).toUpperCase()}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60] animate-fade-in-up">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Language</span>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={cn(
                                    "w-full px-4 py-2.5 text-left text-sm font-bold flex items-center justify-between transition-colors",
                                    i18n.language === lang.code
                                        ? "text-primary-green bg-green-50"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <span>{lang.name}</span>
                                {i18n.language === lang.code && <Check className="h-4 w-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
