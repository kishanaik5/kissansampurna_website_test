import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Info, ShieldCheck, Zap, HeartHandshake, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

const PricingCard = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleCTA = () => {
        window.open('https://play.google.com/store/apps/details?id=com.kissansampurna.app', '_blank');
    };

    const trustItems = [
        {
            icon: Zap,
            title: t('pricing.trust.refund_title'),
            desc: t('pricing.trust.refund_desc'),
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            icon: ShieldCheck,
            title: t('pricing.trust.secure_title'),
            desc: t('pricing.trust.secure_desc'),
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: HeartHandshake,
            title: t('pricing.trust.support_title'),
            desc: t('pricing.trust.support_desc'),
            color: "text-rose-600",
            bg: "bg-rose-50"
        }
    ];

    const limits = [
        { label: 'acre_limit', value: '5' },
        { label: 'scan_limit', value: '70' },
        { label: 'crop_advice_limit', value: '10' },
        { label: 'report_limit', value: '30' }
    ];

    return (
        <div className={cn(
            "w-full max-w-7xl mx-auto transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
            {/* Main Premium Card */}
            <div className="relative bg-gradient-to-br from-[#F7FFF9] via-white to-[#F0FDF4] rounded-[3rem] p-8 md:p-14 shadow-[0_40px_80px_rgba(0,0,0,0.06)] border border-green-100/40 overflow-hidden group hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] transition-all duration-700">

                {/* Gold Accent Border Glow */}
                <div className="absolute inset-0 rounded-[3rem] border-2 border-transparent group-hover:border-amber-400/20 transition-all duration-700 pointer-events-none" />
                <div className="absolute -inset-[1px] rounded-[3.1rem] border border-amber-400/10 opacity-30 pointer-events-none shadow-[0_0_40px_rgba(251,191,36,0.05)]" />

                {/* Floating Gold Badge */}
                <div className="relative mb-8 mx-auto w-fit lg:absolute lg:top-8 lg:right-10 lg:mb-0 lg:mx-0">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-[0_4px_15px_rgba(245,158,11,0.3)] ring-2 ring-white/50 animate-pulse">
                        {t('pricing.trial_badge')}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">

                    {/* COLUMN 1: TRUST PANEL */}
                    <div className="space-y-10 lg:pr-8 border-b lg:border-b-0 lg:border-r border-gray-100 pb-12 lg:pb-0">
                        {trustItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-6 group/item">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300",
                                    item.bg
                                )}>
                                    <item.icon className={cn("h-6 w-6", item.color)} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-gray-900 font-extrabold text-sm tracking-tight">{item.title}</h4>
                                    <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* COLUMN 2: PLAN DETAILS */}
                    <div className="text-center space-y-8 lg:px-4">
                        <div className="space-y-2">
                            <span className="text-amber-600 font-black text-xs uppercase tracking-[0.3em] block">
                                {t('pricing.gold_plan')}
                            </span>
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-7xl font-black text-gray-900 tracking-tighter">₹399</span>
                                <span className="text-xl font-bold text-gray-400">{t('pricing.per_year')}</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-primary-green font-black text-sm tracking-wide">
                                    {t('pricing.trial_desc')}
                                </p>
                                <p className="text-[11px] text-gray-400 font-bold">
                                    {t('pricing.trial_refund_info')}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleCTA}
                            className="group relative w-full px-12 py-6 bg-gradient-to-r from-[#1F4D1A] to-[#2D6A23] text-white rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(31,77,26,0.3)] hover:shadow-[0_25px_50px_rgba(31,77,26,0.4)] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {t('pricing.cta_get_app')} <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    </div>

                    {/* COLUMN 3: PLAN LIMITS PANEL */}
                    <div className="lg:pl-8 lg:border-l border-gray-100">
                        <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100/50 shadow-inner">
                            <h3 className="text-gray-900 font-black text-sm uppercase tracking-[0.2em] mb-8 text-center opacity-80">
                                {t('pricing.limits_title')}
                            </h3>
                            <div className="space-y-6">
                                {limits.map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between items-center text-sm font-bold">
                                            <span className="text-gray-400 font-mono text-xs lowercase tracking-tighter">
                                                {t(`pricing.${item.label}`)}
                                            </span>
                                            <span className="bg-white px-4 py-1.5 rounded-full text-xs font-black text-primary-green shadow-sm ring-1 ring-green-100">{item.value}</span>
                                        </div>
                                        {idx !== limits.length - 1 && <div className="border-b border-dotted border-gray-200" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Note Panel Below */}
            <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center justify-center gap-5 group hover:border-green-200 transition-colors">
                    <div className="bg-blue-50 p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-gray-600 text-[13px] font-bold text-center leading-relaxed">
                        <span className="text-gray-900 font-black uppercase tracking-wider mr-2">
                            {t('pricing.note_label')}:
                        </span>
                        {t('pricing.note_desc')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
