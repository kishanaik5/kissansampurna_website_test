import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Sprout } from 'lucide-react';
import mockData from '../data/mockData.json';
import { cn } from '../utils/cn';
import { useTranslation } from 'react-i18next';

// Horizontal sliding phone mockup component with auto-slide and manual navigation
const HorizontalPhoneMockup = ({ title, images, imagePath, extension = '.jpeg' }) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);
    const resumeTimeoutRef = useRef(null);

    const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds between slides
    const RESUME_DELAY = 5000; // 5 seconds pause after manual interaction

    // Start auto-slide interval
    const startAutoSlide = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, AUTO_SLIDE_INTERVAL);
    }, [images.length]);

    // Stop auto-slide interval
    const stopAutoSlide = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Handle manual dot click
    const handleDotClick = useCallback((idx) => {
        // Navigate to clicked slide
        setCurrentIndex(idx);
        setIsPaused(true);

        // Stop current auto-slide
        stopAutoSlide();

        // Clear any existing resume timeout
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }

        // Resume auto-slide after delay
        resumeTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            startAutoSlide();
        }, RESUME_DELAY);
    }, [stopAutoSlide, startAutoSlide]);

    // Initialize auto-slide on mount
    useEffect(() => {
        startAutoSlide();

        // Cleanup on unmount
        return () => {
            stopAutoSlide();
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current);
            }
        };
    }, [startAutoSlide, stopAutoSlide]);

    return (
        <div className="flex justify-center items-start sticky top-32">
            <div className="relative w-full max-w-[340px]">
                {/* Phone Frame */}
                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-gray-800 relative z-20">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-30 flex items-center justify-center">
                        <div className="w-8 h-1 bg-gray-700/50 rounded-full" />
                    </div>

                    {/* App Screen */}
                    <div className="bg-white rounded-[2.2rem] overflow-hidden aspect-[9/19.5]">
                        <div className="h-full flex flex-col">
                            {/* White Header */}
                            <div className="bg-white p-4 text-center border-b border-gray-100 pt-8">
                                <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">{title}</h4>
                                <p className="text-[10px] text-gray-400 font-bold">{t('services.app_view')}</p>
                            </div>

                            {/* Horizontal sliding Image Container */}
                            <div className="flex-1 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                >
                                    {images.map((num) => (
                                        <div key={num} className="w-full h-full flex-shrink-0">
                                            <img
                                                src={`${imagePath}${num}${extension}`}
                                                alt={`${title} ${num}`}
                                                className="w-full h-full object-cover"
                                                draggable={false}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Clickable Slide Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 bg-black/10 backdrop-blur-sm rounded-full">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleDotClick(idx)}
                                            aria-label={`Go to slide ${idx + 1}`}
                                            className={cn(
                                                "p-0.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation",
                                                "hover:scale-125 active:scale-95",
                                                "focus:outline-none"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "h-1.5 rounded-full transition-all duration-300",
                                                    idx === currentIndex
                                                        ? "bg-primary-green w-3.5 shadow-sm shadow-primary-green/30"
                                                        : "bg-gray-300 w-1.5 hover:bg-gray-400"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Pause indicator (subtle) */}
                                {isPaused && (
                                    <div className="absolute top-2 right-2 bg-black/20 rounded-full px-2 py-0.5">
                                        <span className="text-[8px] text-white/70">Paused</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glow elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-green/20 blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary-green/10 blur-3xl" />
            </div>
        </div>
    );
};

const ServiceDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams();
    const service = mockData.services.find(s => s.slug === slug);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">{t('services.not_found')}</h2>
                    <Link to="/services" className="text-primary-green hover:underline">{t('services.back_to')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-green-50 min-h-screen py-32 px-4 md:px-8">
            <div className={cn("mx-auto", (slug === 'crop-disease' || slug === 'smart-farming' || slug === 'crop-advice' || slug === 'mandi-prices') ? "max-w-7xl" : "max-w-4xl")}>
                <Link to="/services" className="inline-flex items-center text-gray-600 hover:text-primary-green mb-10 transition-colors font-medium">
                    <ArrowLeft className="mr-2 h-5 w-5" /> {t('services.back_to')}
                </Link>

                <div className={cn((slug === 'crop-disease' || slug === 'smart-farming' || slug === 'crop-advice' || slug === 'mandi-prices') ? "grid grid-cols-1 lg:grid-cols-2 gap-12" : "block")}>
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 h-full flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t(`services.items.${service.id}.title`)} {t('services.services_suffix')}</h1>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-8">{t(`services.items.${service.id}.subtitle`)}</h2>

                            <div className="prose prose-lg max-w-none mb-12">
                                {t(`services.items.${service.id}.detailedDescription`, { defaultValue: service.detailedDescription }).split('\n\n').map((para, i) => (
                                    <p key={i} className="text-gray-600 leading-relaxed mb-4 font-medium">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            <div className="mb-12">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">{t('services.how_it_works', { title: t(`services.items.${service.id}.title`) })}</h3>
                                <div className="space-y-4">
                                    {(service.howItWorks || []).map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="bg-green-50 p-1 rounded-full shrink-0">
                                                <CheckCircle2 className="h-6 w-6 text-primary-green" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-900">{t(`services.items.${service.id}.howItWorks.${idx}.title`)}:</span>
                                                <span className="text-gray-600 ml-2 font-medium">{t(`services.items.${service.id}.howItWorks.${idx}.description`)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('services.benefits_title', { title: t(`services.items.${service.id}.title`) })}</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(service.benefits || []).map((benefit, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium">
                                            <div className="w-1.5 h-1.5 bg-primary-green rounded-full shrink-0" />
                                            {t(`services.items.${service.id}.benefits.${idx}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Crop Disease - Horizontal sliding animation */}
                    {slug === 'crop-disease' && (
                        <HorizontalPhoneMockup
                            title={t('services.items.s2.title')}
                            images={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            imagePath="/media/crop_disease/"
                            extension=".svg"
                        />
                    )}

                    {/* Smart Farming - Horizontal sliding animation */}
                    {slug === 'smart-farming' && (
                        <HorizontalPhoneMockup
                            title={t('services.items.s4.title')}
                            images={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            imagePath="/media/farm/"
                            extension=".svg"
                        />
                    )}

                    {/* Crop Advice - Horizontal sliding animation */}
                    {slug === 'crop-advice' && (
                        <HorizontalPhoneMockup
                            title={t('services.items.s1.title')}
                            images={[1, 2, 3, 4, 5, 6, 7, 8]}
                            imagePath="/media/crop_advice/"
                            extension=".svg"
                        />
                    )}

                    {/* Mandi Prices - Horizontal sliding animation */}
                    {slug === 'mandi-prices' && (
                        <HorizontalPhoneMockup
                            title={t('services.items.s5.title')}
                            images={[1, 2, 3, 4]}
                            imagePath="/media/mandi/"
                            extension=".svg"
                        />
                    )}
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-primary-green rounded-3xl p-10 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">{t('services.cta_interest', { title: t(`services.items.${service.id}.title`) })}</h2>
                        <p className="text-green-100 mb-8 max-w-lg mx-auto">{t('services.cta_description')}</p>
                        <Link to="/contact" className="bg-white text-primary-green px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg inline-block">
                            {t('services.cta_btn')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
