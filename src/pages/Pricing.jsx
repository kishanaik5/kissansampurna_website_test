import React from 'react';
import { useTranslation } from 'react-i18next';
import PricingCard from '../components/PricingCard';

const Pricing = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-green-100 min-h-screen py-32 font-primary">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        {t('pricing.title')}
                    </h1>
                    <p className="text-lg text-gray-600 font-bold">
                        {t('pricing.subtitle')}
                    </p>
                </div>

                <PricingCard />
            </div>
        </div>
    );
};

export default Pricing;