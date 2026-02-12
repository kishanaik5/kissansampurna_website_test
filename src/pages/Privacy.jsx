import React from 'react';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <h1 className="text-4xl font-black text-gray-900 mb-8">{t('legal.privacy.title')}</h1>
                <p className="text-gray-600 mb-8 font-medium italic">
                    {t('legal.privacy.intro_italic')}
                </p>
                <p className="text-gray-600 mb-12 font-medium">
                    {t('legal.privacy.intro_bold')}
                </p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.privacy.sections.collection.title')}</h2>
                        <p className="text-gray-600 font-medium mb-4">{t('legal.privacy.sections.collection.p1')}</p>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.collection.items.0')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.collection.items.1')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.collection.items.2')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.collection.items.3')}</span></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.privacy.sections.usage.title')}</h2>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.usage.items.0')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.usage.items.1')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.usage.items.2')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.usage.items.3')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.usage.items.4')}</span></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.privacy.sections.sharing.title')}</h2>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.sharing.items.0')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.sharing.items.1')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.sharing.items.2')}</span></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.privacy.sections.security.title')}</h2>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            {t('legal.privacy.sections.security.p1')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.privacy.sections.rights.title')}</h2>
                        <ul className="space-y-3 text-gray-600 font-medium">
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.rights.items.0')}</span></li>
                            <li className="flex items-start"><span className="text-primary-green mr-2">•</span><span>{t('legal.privacy.sections.rights.items.1')}</span></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">{t('legal.privacy.sections.update.title')}</h2>
                        <p className="text-gray-600 font-medium leading-relaxed mb-8">
                            {t('legal.privacy.sections.update.p1')}
                        </p>
                    </section>
                </div>

                <div className="mt-16 bg-[#F9FBFA] rounded-3xl p-8 border border-gray-100 flex items-center justify-center">
                    <div className="text-center">
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">{t('legal.contact_privacy')}</h4>
                        <a href="mailto:admin@kissansampurna.com" className="text-primary-green font-bold text-lg hover:underline transition-all">
                            admin@kissansampurna.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
