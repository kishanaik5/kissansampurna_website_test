import React from 'react';
import { useTranslation } from 'react-i18next';

const Shipping = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <h1 className="text-4xl font-black text-gray-900 mb-8">{t('legal.shipping.title')}</h1>
                <p className="text-gray-600 mb-12 font-medium leading-relaxed">
                    {t('legal.shipping.intro')}
                </p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6">{t('legal.shipping.sections.delivery.title')}</h2>
                        <div className="h-px bg-gray-100 w-full mb-6"></div>
                        <ul className="space-y-4 text-gray-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-primary-green mr-3">•</span>
                                <span>{t('legal.shipping.sections.delivery.items.0')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-3">•</span>
                                <span>{t('legal.shipping.sections.delivery.items.1')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-3">•</span>
                                <span>{t('legal.shipping.sections.delivery.items.2')}</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6">{t('legal.shipping.sections.delays.title')}</h2>
                        <div className="h-px bg-gray-100 w-full mb-6"></div>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            {t('legal.shipping.sections.delays.p1')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6">{t('legal.shipping.sections.no_physical.title')}</h2>
                        <div className="h-px bg-gray-100 w-full mb-6"></div>
                        <ul className="space-y-4 text-gray-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-primary-green mr-3">•</span>
                                <span>{t('legal.shipping.sections.no_physical.items.0')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-3">•</span>
                                <span>{t('legal.shipping.sections.no_physical.items.1')}</span>
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="mt-16 bg-[#F9FBFA] rounded-3xl p-8 border border-gray-100 flex items-center justify-center">
                    <div className="text-center">
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">{t('legal.shipping.sections.contact_label')}</h4>
                        <a href="mailto:admin@kissansampurna.com" className="text-primary-green font-bold text-lg hover:underline transition-all">
                            admin@kissansampurna.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
