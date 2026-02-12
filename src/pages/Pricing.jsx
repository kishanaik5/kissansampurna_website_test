import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import mockData from '../data/mockData.json';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

const Pricing = () => {
    const { t } = useTranslation();
    const [isYearly, setIsYearly] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubscribe = (plan) => {
        if (!user) {
            navigate('/login', { state: { plan: t(`pricing.plans.${plan.name.toLowerCase()}.name`, plan.name) } });
        } else {
            alert(`${t('pricing.success_msg')} ${t(`pricing.plans.${plan.name.toLowerCase()}.name`, plan.name)} plan.`);
        }
    };

    return (
        <div className="bg-green-50 min-h-screen py-32">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('pricing.title')}</h1>
                    <p className="text-lg text-gray-600 font-medium mb-10">{t('pricing.subtitle')}</p>

                    <div className="flex items-center justify-center space-x-4">
                        <span className={cn('text-sm font-bold', !isYearly ? 'text-gray-900' : 'text-gray-400')}>{t('pricing.monthly')}</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-14 h-8 bg-gray-200 rounded-full transition-all relative"
                        >
                            <div className={cn(
                                'w-6 h-6 bg-primary-green rounded-full shadow-md transition-all absolute top-1',
                                isYearly ? 'left-7' : 'left-1'
                            )} />
                        </button>
                        <span className={cn('text-sm font-bold flex items-center', isYearly ? 'text-gray-900' : 'text-gray-400')}>
                            {t('pricing.yearly')} <span className="ml-2 bg-green-100 text-primary-green text-[10px] px-2 py-0.5 rounded-full uppercase">{t('pricing.save_tag')}</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-end">
                    {mockData.pricing.map((plan, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                'bg-white rounded-[2rem] border transition-all p-10 flex flex-col',
                                plan.name === 'Basic'
                                    ? 'border-primary-green shadow-2xl relative scale-105 z-10 md:py-14'
                                    : 'border-gray-100 shadow-xl'
                            )}
                        >
                            {plan.name === 'Basic' && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-green text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                                    {t('pricing.most_popular')}
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t(`pricing.plans.${plan.name.toLowerCase()}.name`, plan.name)}</h3>
                            <div className="flex items-baseline mb-8">
                                <span className="text-4xl font-extrabold text-gray-900">₹{isYearly ? Math.floor(plan.price * 10) : plan.price}</span>
                                <span className="text-gray-500 font-medium ml-2">/{isYearly ? t('pricing.year') : t('pricing.month')}</span>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-sm font-semibold text-gray-700">
                                        <Check className="h-5 w-5 text-primary-green mr-3 shrink-0" />
                                        {t(`pricing.plans.${plan.name.toLowerCase()}.features.${i}`, feature)}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://play.google.com/store/apps/details?id=com.kissansampurna.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'w-full py-4 rounded-xl font-bold text-lg transition-all text-center block',
                                    plan.name === 'Basic'
                                        ? 'bg-primary-green text-white shadow-xl shadow-green-100 hover:bg-green-800'
                                        : 'bg-gray-50 text-gray-900 border-2 border-transparent hover:border-gray-200'
                                )}
                            >
                                {t('pricing.cta')}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-20 max-w-2xl mx-auto bg-green-50/50 p-6 rounded-2xl flex items-start space-x-4 border border-green-100">
                    <Info className="h-6 w-6 text-primary-green mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                        {t('pricing.info_box')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;