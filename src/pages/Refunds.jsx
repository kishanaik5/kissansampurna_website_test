import React from 'react';
import { useTranslation } from 'react-i18next';

const Refunds = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <h1 className="text-4xl font-black text-gray-900 mb-8">{t('legal.refunds.title')}</h1>
                <p className="text-gray-600 mb-12 font-medium">{t('legal.refunds.intro')}</p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6">{t('legal.refunds.sections.refund.title')}</h2>
                        <div className="h-px bg-gray-100 w-full mb-6"></div>
                        <p className="text-gray-600 font-medium mb-4">{t('legal.refunds.sections.refund.p1')}</p>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.refunds.sections.refund.items.0')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.refunds.sections.refund.items.1')}</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6">{t('legal.refunds.sections.cancellation.title')}</h2>
                        <div className="h-px bg-gray-100 w-full mb-6"></div>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.refunds.sections.cancellation.items.0')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-green mr-2">•</span>
                                <span>{t('legal.refunds.sections.cancellation.items.1')}</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-6">{t('legal.refunds.sections.processing.title')}</h2>
                        <div className="h-px bg-gray-100 w-full mb-6"></div>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            {t('legal.refunds.sections.processing.p1')}
                        </p>
                    </section>
                </div>

                <div className="mt-16 bg-[#F9FBFA] rounded-3xl p-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">{t('legal.refunds.sections.contact_label')}</h4>
                            <a href="mailto:admin@kissansampurna.com" className="text-primary-green font-bold text-lg hover:underline transition-all">
                                admin@kissansampurna.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refunds;
