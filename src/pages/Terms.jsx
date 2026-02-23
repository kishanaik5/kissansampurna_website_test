import React from 'react';
import { useTranslation } from 'react-i18next';

const Terms = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <h1 className="text-4xl font-black text-gray-900 mb-8">{t('legal.terms.title')}</h1>
                <p className="text-gray-600 mb-8 font-medium">{t('legal.terms.intro')}</p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.terms.sections.use.title')}</h2>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.use.items.0')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.use.items.1')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.use.items.2')}</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.terms.sections.responsibilities.title')}</h2>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.responsibilities.items.0')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.responsibilities.items.1')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.responsibilities.items.2')}</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.terms.sections.intellectual.title')}</h2>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.intellectual.items.0')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.intellectual.items.1')}</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.terms.sections.liability.title')}</h2>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.liability.items.0')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.terms.sections.liability.items.1')}</span>
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="mt-16 p-8 bg-[#F9FBFA] rounded-3xl border border-gray-100">
                    <p className="text-sm text-gray-500 italic">{t('legal.terms.footer')}</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
