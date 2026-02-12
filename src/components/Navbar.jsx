import React, { useState, useEffect } from 'react';
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
    const { user, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            // Show brand text after scrolling past the hero section (~600px)
            setIsScrolled(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                'bg-white backdrop-blur-md shadow-lg border-b border-gray-200'
            )}
        >
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-3 group min-w-fit">
                        <div className="relative">
                            <img
                                src={logo}
                                alt="Kissan Sampurna Logo"
                                className="h-10 w-10 group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                            />
                        </div>
                        {/* Only show text on Home page after scrolling past hero, or immediately on other pages */}
                        {(location.pathname !== '/' || isScrolled) && (
                            <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-900 animate-fade-in whitespace-nowrap">
                                {t('hero.brand_first')} <span className="text-primary-green">{t('hero.brand_second')}</span>
                            </span>
                        )}
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
                                    'text-sm font-bold transition-all hover:text-primary-green relative py-1 whitespace-nowrap',
                                    isActive ? 'text-primary-green' : 'text-gray-600'
                                )}
                            >
                                {link.name}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-green rounded-full" />
                                )}
                            </Link>
                        );
                    })}

                    {user?.role === 'admin' && (
                        <Link to="/admin" className="text-sm font-medium text-accent-brown">Admin</Link>
                    )}

                    <div className="pl-4 border-l border-gray-100">
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center space-x-4 lg:hidden">
                    <LanguageSwitcher />
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-4 flex flex-col space-y-2 shadow-xl max-h-[80vh] overflow-y-auto animate-fade-in-up">
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
            )}
        </nav>
    );
};

export default Navbar;
