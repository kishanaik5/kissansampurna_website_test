import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import logo from '../assets/images/logo_1.png';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isInHero, setIsInHero] = useState(true);
    const [showBrandText, setShowBrandText] = useState(false);

    const [isLightTheme, setIsLightTheme] = useState(false); // True = White text, False = Dark text
    const { user, logout } = useAuth();
    const location = useLocation();
    const scrollTimeoutRef = useRef(null);

    // Sections that should trigger white text (Dark backgrounds)
    const DARK_SECTIONS = ['app-promotion', 'footer']; // Add footer if needed

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);

            // Logic for Home Page
            if (location.pathname === '/') {
                const inHero = currentScrollY < 600; // threshold for hero section ending
                setIsInHero(inHero);

                // 1. Navbar Visibility
                if (currentScrollY < 50) {
                    // Always visible at the very top
                    setIsVisible(true);
                    if (scrollTimeoutRef.current) {
                        clearTimeout(scrollTimeoutRef.current);
                    }
                } else {
                    // Show when scrolling, hide when stopped after 0.4s
                    setIsVisible(true);

                    if (scrollTimeoutRef.current) {
                        clearTimeout(scrollTimeoutRef.current);
                    }

                    scrollTimeoutRef.current = setTimeout(() => {
                        setIsVisible(false);
                    }, 400); // 0.4s visibility persistence
                }

                // 2. Brand Text Visibility (Show only when NOT in Hero)
                setShowBrandText(!inHero);

            } else {
                // Logic for Other Pages
                setIsVisible(true); // Always visible
                setShowBrandText(true); // Always show text
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const isDark = entries.some((entry) => entry.isIntersecting);
                // If on Home page and over a dark section, OR if at the very top of Home (Hero is green/dark-ish?)
                // Actually Hero is green-100 (light), so text should be dark.
                // But App Promotion is dark, so text should be white.
                setIsLightTheme(isDark);
            },
            { threshold: [0.1, 0.9] } // Check when even small part is visible, might need tuning
        );

        const checkTheme = () => {
            if (location.pathname !== '/') {
                setIsLightTheme(false);
                return;
            }

            const sections = ['hero', 'farming-cycle', 'app-promotion', 'recent-blogs'];
            let currentSection = 'hero';

            for (const id of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the navbar (0) is within this section
                    if (rect.top <= 40 && rect.bottom >= 40) {
                        currentSection = id;
                        break;
                    }
                }
            }

            if (DARK_SECTIONS.includes(currentSection)) {
                setIsLightTheme(true);
            } else {
                setIsLightTheme(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', checkTheme);

        // Initial check
        handleScroll();
        checkTheme();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', checkTheme);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [location.pathname]);

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.services'), path: '/services' },
        { name: t('nav.products'), path: '/products' },
        { name: t('nav.about'), path: '/aboutus' },
        { name: t('nav.blogs'), path: '/blogs' },
        { name: t('nav.plans'), path: '/pricing' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-4',
                isVisible ? 'translate-y-0' : '-translate-y-full',
                location.pathname === '/'
                    ? (isInHero ? 'py-5 bg-transparent shadow-none' : 'py-3 bg-white/95 backdrop-blur-md shadow-md')
                    : (isScrolled ? 'py-3 bg-white/95 backdrop-blur-md shadow-md' : 'py-5 bg-transparent shadow-none')
            )}
        >
            <div className="flex justify-between items-center w-full px-6 md:px-12">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-3 group min-w-fit">
                        <div className="relative">
                            <img
                                src={logo}
                                alt={t('alt.logo')}
                                className="h-10 w-10 group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                            />
                        </div>
                        {/* Only show text on Home page after scrolling past farming cycle, or immediately on other pages */}
                        <span className={cn(
                            "text-lg md:text-xl lg:text-2xl font-black tracking-tighter whitespace-nowrap transition-all duration-500",
                            (showBrandText || location.pathname !== '/') ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none absolute",
                            (isLightTheme && isInHero) ? "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" : "text-gray-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]"
                        )}>
                            {t('hero.brand_first')} <span className={cn((isLightTheme && isInHero) ? "text-white" : "text-primary-green")}>{t('hero.brand_second')}</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path || (link.path === '/services' && location.pathname.startsWith('/services'));
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    'text-lg font-bold transition-all relative py-1 whitespace-nowrap',
                                    isActive
                                        ? ((isLightTheme && isInHero) ? 'text-white underline decoration-2 underline-offset-4' : 'text-primary-green underline decoration-2 underline-offset-4')
                                        : ((isLightTheme && isInHero) ? 'text-white/90 hover:text-white drop-shadow-md' : 'text-gray-700 hover:text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]')
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    {user?.role === 'admin' && (
                        <Link to="/admin" className="text-sm font-medium text-accent-brown">Admin</Link>
                    )}

                    <div className="pl-4 border-l border-gray-100 flex items-center space-x-4">
                        <LanguageSwitcher isScrolled={isScrolled} isHome={location.pathname === '/'} isInHero={isInHero} mobile={false} theme={isLightTheme ? 'light' : 'dark'} />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center space-x-2 lg:hidden">
                    {/* Language Switcher moved inside menu for cleaner mobile/tablet view */}
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                        {isOpen ? (
                            <X className={cn("h-6 w-6 transition-colors duration-300", isLightTheme ? "text-white" : "text-gray-900")} />
                        ) : (
                            <Menu className={cn("h-6 w-6 transition-colors duration-300", isLightTheme ? "text-white" : "text-gray-900")} />
                        )}
                    </button>
                </div>
            </div >



            {/* Mobile Menu */}
            {
                isOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-4 flex flex-col space-y-2 shadow-xl max-h-[80vh] overflow-y-auto animate-fade-in-up">
                        <div className="flex justify-end p-2 border-b border-gray-100 mb-2">
                            <LanguageSwitcher isScrolled={true} isHome={false} isInHero={false} mobile={true} theme="dark" />
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 font-bold py-3 border-b border-gray-100 flex items-center justify-between"
                            >
                                {link.name}
                                <span className="w-2 h-2 rounded-full bg-gray-100 group-hover:bg-primary-green"></span>
                            </Link>
                        ))}
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;
