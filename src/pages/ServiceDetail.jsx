import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import mockData from '../data/mockData.json';
import { cn } from '../utils/cn';
import { useTranslation } from 'react-i18next';
const logo = 'https://cdn.gausampurna.co/dev/kissan-sampurna/logo_1.png';

// Component to handle hybrid automatic/manual vertical scrolling for long images
const AutoScrollingImage = ({ src, alt, isActive, onScrollComplete, isPaused: isParentPaused }) => {
    const containerRef = useRef(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const scrollRafRef = useRef(null);
    const lastTimeRef = useRef(0);
    const scrollPosRef = useRef(0);
    const directionRef = useRef(1); // 1 for down, -1 for up
    const interactionTimeoutRef = useRef(null);
    const hasReportedCompleteRef = useRef(false);
    const isPaused = isInteracting || isParentPaused || !isImageLoaded;

    // Use refs to track latest values inside the animation loop to avoid stale closures
    const isPausedRef = useRef(isPaused);
    const onScrollCompleteRef = useRef(onScrollComplete);
    const isImageLoadedRef = useRef(isImageLoaded);

    useEffect(() => {
        isPausedRef.current = isPaused;
    }, [isPaused]);

    useEffect(() => {
        onScrollCompleteRef.current = onScrollComplete;
    }, [onScrollComplete]);

    useEffect(() => {
        isImageLoadedRef.current = isImageLoaded;
    }, [isImageLoaded]);

    const startAutoScroll = useCallback(() => {
        if (!containerRef.current) return;

        const animate = (time) => {
            // Use refs for the most up-to-date values in the loop
            if (!containerRef.current || isPausedRef.current) {
                lastTimeRef.current = time;
                scrollRafRef.current = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;

            // Avoid jumping after long pauses
            if (deltaTime > 100) {
                scrollRafRef.current = requestAnimationFrame(animate);
                return;
            }

            const container = containerRef.current;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
            const maxScroll = Math.max(0, scrollHeight - clientHeight);

            // If we're supposedly loaded but have no scroll height, re-check later
            if (scrollHeight === 0 && isImageLoadedRef.current) {
                scrollRafRef.current = requestAnimationFrame(animate);
                return;
            }

            // Conditional auto-scroll: only if the image is too long
            if (maxScroll <= 0) {
                // If it doesn't need to scroll, wait a bit then move next
                if (!hasReportedCompleteRef.current) {
                    hasReportedCompleteRef.current = true;
                    if (onScrollCompleteRef.current) {
                        setTimeout(() => {
                            // Check if we haven't been deactivated in the meantime
                            if (scrollRafRef.current) {
                                onScrollCompleteRef.current();
                            }
                        }, 2000);
                    }
                }
                return;
            }

            // Speed: approx 60px per second (increased from 40px)
            const speed = 0.06;
            scrollPosRef.current += directionRef.current * speed * deltaTime;

            // Trigger next slide if we hit the absolute bottom (with small buffer)
            if (scrollPosRef.current >= maxScroll - 1 && !hasReportedCompleteRef.current) {
                scrollPosRef.current = maxScroll; // Ensure it hit the absolute end
                hasReportedCompleteRef.current = true;
                if (onScrollCompleteRef.current) {
                    setTimeout(() => {
                        // Check if we haven't been deactivated in the meantime
                        if (scrollRafRef.current) {
                            onScrollCompleteRef.current();
                        }
                    }, 2000); // Wait at the bottom
                }
            }

            // Lock at bottom
            if (scrollPosRef.current >= maxScroll) {
                scrollPosRef.current = maxScroll;
            } else if (scrollPosRef.current <= 0) {
                scrollPosRef.current = 0;
                directionRef.current = 1;
            }

            container.scrollTop = scrollPosRef.current;
            scrollRafRef.current = requestAnimationFrame(animate);
        };

        lastTimeRef.current = performance.now();
        scrollRafRef.current = requestAnimationFrame(animate);
    }, [isInteracting]);

    const stopAutoScroll = useCallback(() => {
        if (scrollRafRef.current) {
            cancelAnimationFrame(scrollRafRef.current);
        }
    }, []);

    useEffect(() => {
        setIsImageLoaded(false); // Reset loading state when src changes
    }, [src]);

    useEffect(() => {
        if (isActive) {
            hasReportedCompleteRef.current = false;
            scrollPosRef.current = 0; // RESET POSITION ON ACTIVATION
            if (containerRef.current) {
                containerRef.current.scrollTop = 0;
            }
            startAutoScroll();
        } else {
            stopAutoScroll();
            hasReportedCompleteRef.current = true; // Stop any pending timeouts from firing
        }
        return () => stopAutoScroll();
    }, [isActive, startAutoScroll, stopAutoScroll]);

    const handleInteractionStart = () => {
        setIsInteracting(true);
        if (interactionTimeoutRef.current) {
            clearTimeout(interactionTimeoutRef.current);
        }
    };

    const handleInteractionEnd = () => {
        // Set a delay before resuming auto-scroll
        interactionTimeoutRef.current = setTimeout(() => {
            if (containerRef.current) {
                scrollPosRef.current = containerRef.current.scrollTop;
            }
            setIsInteracting(false);
        }, 2000); // Resume after 2 seconds of inactivity
    };

    // Tracking manual scroll to update scrollPosRef
    const handleScroll = () => {
        if (isInteracting && containerRef.current) {
            scrollPosRef.current = containerRef.current.scrollTop;
        }
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-y-auto overflow-x-hidden relative bg-gray-50 scrollbar-hide touch-pan-y shadow-inner"
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onScroll={handleScroll}
        >
            <img
                src={src}
                alt={alt}
                onLoad={() => {
                    setIsImageLoaded(true);
                    // Force a tiny delay to ensure browser layout is ready
                    setTimeout(() => {
                        if (containerRef.current) {
                            lastTimeRef.current = performance.now();
                        }
                    }, 100);
                }}
                className={cn(
                    "w-full h-auto block transition-opacity duration-700",
                    isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                draggable={false}
            />
        </div>
    );
};

// Horizontal sliding phone mockup component with auto-slide and manual navigation
const HorizontalPhoneMockup = ({ title, images, imagePath, extension = '.jpeg' }) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const resumeTimeoutRef = useRef(null);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const RESUME_DELAY = 2000; // 2 seconds pause after manual interaction
    const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels

    // Unified navigation function
    const goToSlide = useCallback((idx, isManual = false) => {
        setCurrentIndex(idx);

        if (isManual) {
            setIsPaused(true);
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current);
            }
            resumeTimeoutRef.current = setTimeout(() => {
                setIsPaused(false);
            }, RESUME_DELAY);
        }
    }, []);

    // Handle manual dot click
    const handleDotClick = useCallback((idx) => {
        goToSlide(idx, true);
    }, [goToSlide]);

    // Handle arrow navigation
    const handlePrevious = useCallback(() => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        handleDotClick(newIndex);
    }, [currentIndex, images.length, handleDotClick]);

    const handleNext = useCallback((isManual = true) => {
        const newIndex = (currentIndex + 1) % images.length;
        goToSlide(newIndex, isManual);
    }, [currentIndex, images.length, goToSlide]);

    const handleAutoNext = useCallback(() => {
        handleNext(false);
    }, [handleNext]);

    // Touch event handlers for swipe
    const handleTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e) => {
        touchEndX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const isSwipe = Math.abs(distance) > SWIPE_THRESHOLD;

        if (isSwipe) {
            if (distance > 0) {
                // Swiped left - go to next
                handleNext();
            } else {
                // Swiped right - go to previous
                handlePrevious();
            }
        }

        // Reset
        touchStartX.current = null;
        touchEndX.current = null;
    }, [handleNext, handlePrevious]);

    // Reset to first slide when service change (on refresh or navigation)
    useEffect(() => {
        setCurrentIndex(0);
        setIsPaused(false);
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }
    }, [imagePath]); // Depend only on imagePath to avoid resetting on every parent render

    // Initialize on mount
    useEffect(() => {
        return () => {
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="flex justify-center items-start sticky top-24">
            <div className="relative w-full max-w-[340px]">
                {/* Phone Frame */}
                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-gray-800 relative z-20">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-30 flex items-center justify-center">
                        <div className="w-8 h-1 bg-gray-700/50 rounded-full" />
                    </div>

                    {/* App Screen */}
                    <div className="bg-white rounded-[2.2rem] overflow-hidden aspect-[9/19.5] relative">
                        {/* White Header - positioned absolute to cover the status bar area in app screenshots */}
                        <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md px-2.5 py-1 text-center border-b border-gray-100 pt-5 flex items-center justify-center gap-2.5 z-20 shadow-sm">
                            <div className="flex items-center gap-1.5 shrink-0">
                                <img
                                    src={logo}
                                    alt={t('alt.logo')}
                                    className="h-2.5 w-auto object-contain"
                                />
                                <h4 className="text-[8px] font-black text-gray-800 uppercase tracking-widest mb-0">{title}</h4>
                            </div>
                            <div className="flex items-center gap-1 border-l border-gray-100 pl-2 shrink-0">
                                <Smartphone className="h-2 w-2 text-gray-400" />
                                <p className="text-[5.5px] text-gray-400 font-bold uppercase tracking-tighter leading-none">{t('services.app_view')}</p>
                            </div>
                        </div>

                        {/* Horizontal sliding Image Container - occupies full screen height, with header overlapping the top */}
                        <div
                            className="h-full relative overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className="absolute inset-0 flex transition-transform duration-[1000ms] ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {images.map((num, idx) => (
                                    <div key={num} className="w-full h-full flex-shrink-0">
                                        <AutoScrollingImage
                                            src={`${imagePath}${num}${extension}`}
                                            alt={`${title} ${num}`}
                                            isActive={currentIndex === idx}
                                            onScrollComplete={handleAutoNext}
                                            isPaused={isPaused}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows - Desktop Only */}
                            <button
                                onClick={handlePrevious}
                                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg z-10 transition-all hover:scale-110"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-700" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg z-10 transition-all hover:scale-110"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-700" />
                            </button>

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
        <div className="bg-green-100 min-h-screen pt-20 pb-20 px-4 md:px-8">
            <div className={cn("mx-auto", (slug === 'crop-disease' || slug === 'smart-farming' || slug === 'crop-advice' || slug === 'mandi-prices') ? "max-w-7xl" : "max-w-4xl")}>
                <Link to="/services" className="inline-flex items-center text-gray-600 hover:text-primary-green mb-4 transition-colors font-medium">
                    <ArrowLeft className="mr-2 h-5 w-5" /> {t('services.back_to')}
                </Link>

                <div className={cn((slug === 'crop-disease' || slug === 'smart-farming' || slug === 'crop-advice' || slug === 'mandi-prices') ? "grid grid-cols-1 lg:grid-cols-2 gap-12" : "block")}>
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 h-full flex flex-col justify-between order-2 lg:order-1">
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
                        <div className="order-1 lg:order-2">
                            <HorizontalPhoneMockup
                                title={t('services.items.s2.title')}
                                images={[1, 2, 3, 4]}
                                imagePath="https://cdn.gausampurna.co/dev/kissan-sampurna/crop_disease/crop_disease/"
                                extension=".svg"
                            />
                        </div>
                    )}

                    {/* Smart Farming - Horizontal sliding animation */}
                    {slug === 'smart-farming' && (
                        <div className="order-1 lg:order-2">
                            <HorizontalPhoneMockup
                                title={t('services.items.s4.title')}
                                images={[1, 2]}
                                imagePath="https://cdn.gausampurna.co/dev/kissan-sampurna/farm/farm/"
                                extension=".svg"
                            />
                        </div>
                    )}

                    {/* Crop Advice - Horizontal sliding animation */}
                    {slug === 'crop-advice' && (
                        <div className="order-1 lg:order-2">
                            <HorizontalPhoneMockup
                                title={t('services.items.s1.title')}
                                images={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                                imagePath="https://cdn.gausampurna.co/dev/kissan-sampurna/crop_advice/crop_advice/"
                                extension=".svg"
                            />
                        </div>
                    )}

                    {/* Mandi Prices - Horizontal sliding animation */}
                    {slug === 'mandi-prices' && (
                        <div className="order-1 lg:order-2">
                            <HorizontalPhoneMockup
                                title={t('services.items.s5.title')}
                                images={[1, 2, 3, 4, 5, 6]}
                                imagePath="https://cdn.gausampurna.co/dev/kissan-sampurna/mandi/mandi/"
                                extension=".svg"
                            />
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-primary-green rounded-3xl p-10 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">{t('services.cta_interest', { title: t(`services.items.${service.id}.title`) })}</h2>
                        <p className="text-green-100 mb-8 max-w-lg mx-auto">{t('services.cta_description')}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.kissansampurna.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform hover:scale-105"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt={t('alt.google_play')} className="h-14" />
                            </a>
                            <a
                                href="https://apps.apple.com/in/app/kissansampurna/id6756928848"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform hover:scale-105"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt={t('alt.app_store')} className="h-14" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
