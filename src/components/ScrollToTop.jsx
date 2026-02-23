import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { cn } from '../utils/cn';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const hideTimerRef = useRef(null);

    // 1. Scroll Restoration: Reset scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // 2. Back to Top Button Logic — show when scrolled > 300px, auto-hide after 1s
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);

                // Clear any existing hide timer
                if (hideTimerRef.current) {
                    clearTimeout(hideTimerRef.current);
                }

                // Hide after 1 second of scroll inactivity
                hideTimerRef.current = setTimeout(() => {
                    setIsVisible(false);
                }, 1000);
            } else {
                setIsVisible(false);
                if (hideTimerRef.current) {
                    clearTimeout(hideTimerRef.current);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary-green text-white shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-6 w-6" />
        </button>
    );
};

export default ScrollToTop;
