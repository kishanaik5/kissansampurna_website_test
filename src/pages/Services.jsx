import { Link } from 'react-router-dom';
import { Sprout, Activity, Bell, Headset, ArrowRight, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import mockData from '../data/mockData.json';

const iconMap = {
    Sprout: Sprout,
    Activity: Activity,
    Bell: Bell,
    Headset: Headset,
    TrendingUp: TrendingUp,
};

const Services = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-green-100 min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('services.title')}</h1>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        {t('services.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mockData.services.map((service, idx) => {
                        const Icon = iconMap[service.icon];
                        return (
                            <div key={idx} className="bg-white rounded-3xl border border-gray-100 hover:shadow-2xl hover:border-green-100 transition-all group flex flex-col">
                                <div className="p-10 flex flex-col md:flex-row gap-8 items-start flex-1">
                                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-green transition-colors">
                                        <Icon className="h-8 w-8 text-primary-green group-hover:text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t(`services.items.${service.id}.title`, service.title)}</h3>
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            {t(`services.items.${service.id}.description`, service.description)}
                                        </p>
                                    </div>
                                </div>

                                {/* View Service Details Container */}
                                <div className="px-10 pb-10 pt-6">
                                    <Link
                                        to={`/services/${service.slug}`}
                                        className="inline-flex items-center bg-green-50 hover:bg-primary-green text-primary-green hover:text-white font-bold px-6 py-3 rounded-xl border-2 border-primary-green transition-all group/link shadow-sm hover:shadow-md"
                                    >
                                        {t('services.learn_more')} <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className="mt-24 bg-primary-green rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">{t('services.cta.title')}</h2>
                        <p className="text-green-100 mb-8 max-w-xl mx-auto font-medium">{t('services.cta.subtitle')}</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            {/* Android Link */}
                            <a
                                href="https://play.google.com/store/apps/details?id=com.kissansampurna.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl flex items-center justify-center group"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt={t('alt.google_play')} className="h-10" />
                                <span className="ml-4">{t('services.cta.android_btn')}</span>
                            </a>

                            {/* iOS Placeholder */}
                            <div className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center backdrop-blur-sm cursor-not-allowed">
                                <span className="opacity-50">{t('services.cta.ios_btn')}</span>
                                <span className="ml-3 px-2 py-0.5 bg-white/20 rounded text-[10px] uppercase tracking-widest whitespace-nowrap">{t('products.coming_soon')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
};

export default Services;