import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, Sprout, BarChart3, ShieldCheck, Leaf, Sun, Droplets, Wheat, Play, Apple } from 'lucide-react';
import farmersImg from '../assets/images/1111.svg';

const Home = () => {
    const { t } = useTranslation();

    const farmingStages = [
        {
            title: t('stages.seed_sowing.title'),
            description: t('stages.seed_sowing.desc'),
            icon: Sprout,
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
            barColor: 'bg-amber-400',
            progress: '100%',
        },
        {
            title: t('stages.planting.title'),
            description: t('stages.planting.desc'),
            icon: Leaf,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            barColor: 'bg-green-500',
            progress: '75%',
        },
        {
            title: t('stages.growth.title'),
            description: t('stages.growth.desc'),
            icon: Droplets,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            barColor: 'bg-blue-500',
            progress: '45%',
        },
        {
            title: t('stages.harvest.title'),
            description: t('stages.harvest.desc'),
            icon: Wheat,
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            barColor: 'bg-yellow-400',
            progress: '25%',
        },
    ];

    const features = [
        {
            title: t('promotion.features.weather'),
            icon: CheckCircle2,
        },
        {
            title: t('promotion.features.advice'),
            icon: CheckCircle2,
        },
        {
            title: t('promotion.features.guidance'),
            icon: CheckCircle2,
        },
        {
            title: t('promotion.features.tools'),
            icon: CheckCircle2,
        },
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-16 bg-green-50 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={farmersImg}
                        alt={t('alt.hero_bg')}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-green-50/95 to-transparent/10" />
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-20 py-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left Content */}
                        <div className="max-w-2xl animate-fade-in-up lg:w-1/2">
                            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-primary-green text-xs font-bold uppercase tracking-wider mb-6">
                                {t('hero.tagline')}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">
                                {t('hero.brand_first')} <span className="text-primary-green">{t('hero.brand_second')}</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-xl">
                                {t('hero.description_1')}
                            </p>
                            <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-xl">
                                {t('hero.description_2')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/services"
                                    className="bg-primary-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-900/10 flex items-center justify-center"
                                >
                                    {t('hero.btn_more')} <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    to="/aboutus"
                                    className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center shadow-lg"
                                >
                                    {t('hero.btn_learn')}
                                </Link>
                            </div>
                        </div>

                        {/* Right Content - Farming Stages Cards */}
                        <div className="lg:w-1/2 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {farmingStages.map((stage, idx) => (
                                    <div key={idx} className="bg-white/90 backdrop-blur-sm p-6 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-white/50 flex flex-col items-start transition-all hover:translate-y-[-5px] group">
                                        <div className={`${stage.iconBg} p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                                            <stage.icon className={`w-6 h-6 ${stage.iconColor}`} />
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-2">{stage.title}</h3>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">
                                            {stage.description}
                                        </p>
                                        <div className="w-full h-1 bg-gray-100 rounded-full mt-auto overflow-hidden">
                                            <div
                                                className={`h-full ${stage.barColor} rounded-full`}
                                                style={{ width: stage.progress }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Promotion Section */}
            <section className="relative py-24 min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-white">
                            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight">
                                {t('promotion.title_part1')} <br />
                                <span className="text-green-600 text-5xl md:text-7xl">{t('promotion.title_part2')}</span>
                            </h2>
                            <p className="text-lg text-gray-200 mb-12 leading-relaxed font-bold max-w-xl">
                                {t('promotion.description')}
                            </p>

                            {/* Feature List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <feature.icon className="h-4 w-4 text-white opacity-80" />
                                        </div>
                                        <span className="text-white font-bold text-sm tracking-wide">{feature.title}</span>
                                    </div>
                                ))}
                            </div>

                            {/* App Download Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.kissansampurna.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold flex items-center gap-3 hover:bg-green-50 transition-all shadow-xl"
                                >
                                    <div className="bg-green-700 text-white p-1 rounded-full flex items-center justify-center">
                                        <ArrowRight className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] uppercase font-black text-gray-400 leading-none">{t('promotion.get_it_on')}</p>
                                        <p className="text-lg font-black leading-none">{t('promotion.btn_google')}</p>
                                    </div>
                                </a>
                                <div className="bg-[#D1D1D1]/80 backdrop-blur-sm px-6 py-2.5 rounded-xl font-bold flex items-center gap-3 grayscale cursor-not-allowed">
                                    <div className="bg-gray-400/50 text-white p-1 rounded-full flex items-center justify-center">
                                        <ArrowRight className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] uppercase font-black text-white/60 leading-none">{t('promotion.coming_soon')}</p>
                                        <p className="text-lg font-black leading-none text-white/80">{t('promotion.btn_apple')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phone Mockup */}
                        <div className="lg:w-1/2 flex justify-center lg:justify-end">
                            <div className="relative group">
                                {/* External Gradient Border Effect */}
                                <div className="absolute inset-0 bg-[#0F172A] rounded-[3.5rem] -m-1" />

                                {/* Phone Frame */}
                                <div className="relative w-[340px] h-[680px] bg-gray-900 rounded-[3.5rem] p-3 shadow-2xl border-[1px] border-white/10 z-10">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-3xl z-20 flex items-center justify-center border-x border-b border-white/5">
                                        <div className="w-8 h-1 bg-gray-800 rounded-full" />
                                    </div>

                                    {/* Screen Content */}
                                    <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden p-8 flex flex-col">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black text-gray-900 leading-[1.1]">
                                                {t('phone_mockup.welcome')} <br />
                                                <span className="text-[#1F4D1A]">{t('hero.brand_first')} {t('hero.brand_second')}</span>
                                            </h3>
                                        </div>

                                        <div className="flex-1 rounded-3xl overflow-hidden mb-8 shadow-md">
                                            <img
                                                src={farmersImg}
                                                alt={t('alt.app_ui')}
                                                className="w-full h-full object-cover shadow-sm"
                                            />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[12px] font-black text-gray-900 tracking-tight pl-1">{t('phone_mockup.label')}</label>
                                                <div className="w-full h-16 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-5 flex items-center text-gray-400 font-medium">
                                                    {t('phone_mockup.placeholder')}
                                                </div>
                                            </div>
                                            <button className="w-full h-16 bg-[#1F4D1A] text-white text-lg font-black rounded-2xl shadow-xl shadow-green-900/10 active:scale-95 transition-transform">
                                                {t('phone_mockup.btn_next')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;