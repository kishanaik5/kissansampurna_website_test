import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sprout, Leaf, Droplets, Wheat, FlaskConical, ShieldCheck, Truck, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay, Mousewheel } from 'swiper/modules';

const FarmingCarousel = () => {
    const { t } = useTranslation();

    // Data - 8 Stages
    const stages = [
        { id: 1, title: t('stages.soil_testing.title', 'Soil Testing'), icon: FlaskConical, color: 'text-purple-600', bg: 'bg-purple-50' },
        { id: 2, title: t('stages.seed_sowing.title', 'Seed Selection'), icon: Sprout, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 3, title: t('stages.land_prep.title', 'Land Prep'), icon: Leaf, color: 'text-amber-600', bg: 'bg-amber-50' },
        { id: 4, title: t('stages.planting.title', 'Sowing'), icon: Sprout, color: 'text-green-600', bg: 'bg-green-50' },
        { id: 5, title: t('stages.irrigation.title', 'Irrigation'), icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 6, title: t('stages.protection.title', 'Crop Protection'), icon: ShieldCheck, color: 'text-sky-600', bg: 'bg-sky-50' },
        { id: 7, title: t('stages.harvest.title', 'Harvesting'), icon: Wheat, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { id: 8, title: t('stages.market.title', 'Distribution'), icon: Truck, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="relative w-full py-2 bg-white overflow-hidden">

            {/* Anti-gravity styles - preserved for floating effect if still desired, 
                but reduced duration or complexity might be better with moving carousel. 
                Keeping it as is for now. */}
            <style>{`
                @keyframes float-up-down {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .floating-card {
                    animation: float-up-down 6s ease-in-out infinite;
                }
                .floating-card:nth-child(even) {
                    animation-duration: 7s;
                    animation-delay: 1s;
                }
                .floating-card:nth-child(3n) {
                    animation-duration: 5s;
                    animation-delay: 2s;
                }
            `}</style>

            <div className="relative w-full max-w-[1600px] mx-auto border-b border-gray-100">
                <Swiper
                    spaceBetween={24}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.2,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 32,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 32,
                        }
                    }}
                    grabCursor={true}
                    allowTouchMove={true}
                    resistance={true}
                    resistanceRatio={0.85}
                    mousewheel={{ forceToAxis: true }}
                    threshold={5}
                    speed={600}
                    autoplay={{
                        delay: 500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        reverseDirection: false
                    }}
                    onTouchEnd={(swiper) => {
                        swiper.autoplay.stop();
                        setTimeout(() => {
                            swiper.slideNext();
                            swiper.autoplay.start();
                        }, 200);
                    }}
                    onMousewheelEnd={(swiper) => {
                        swiper.autoplay.stop();
                        setTimeout(() => {
                            swiper.slideNext();
                            swiper.autoplay.start();
                        }, 200);
                    }}
                    loop={true}
                    modules={[Autoplay, Mousewheel]}
                    className="w-full py-4"
                >
                    {/* Tripling data to ensure seamless infinite loop on all screen sizes */}
                    {[...stages, ...stages, ...stages].map((stage, idx) => (
                        <SwiperSlide key={`${stage.id}-${idx}`} className="flex-shrink-0">
                            <div
                                className={cn(
                                    "w-full bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 floating-card border border-gray-50 select-none cursor-grab active:cursor-grabbing",
                                )}
                            >
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 hover:scale-110", stage.bg)}>
                                    <stage.icon className={cn("w-8 h-8", stage.color)} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                                <div className="w-8 h-1 bg-gray-100 rounded-full" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Fade Gradients */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            </div>
        </div>
    );
};

export default FarmingCarousel;
