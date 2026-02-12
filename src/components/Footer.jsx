import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo_1.png';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-green-100 via-green-50 to-white border-t border-green-200 pt-20 pb-10 px-4 md:px-8 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 text-center md:text-left">
                {/* Branding & Social */}
                <div className="space-y-8 lg:col-span-1">
                    <div className="flex items-center justify-start space-x-2">
                        <img src={logo} alt="Logo" className="h-8 w-8" />
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            {t('hero.brand_first')} <span className="text-primary-green">{t('hero.brand_second')}</span>
                        </span>
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed max-w-xs mx-auto md:mx-0">
                        {t('footer.tagline')}
                    </p>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <a href="https://www.facebook.com/kissan.sampurna/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-green hover:shadow-md transition-all">
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="https://x.com/kissansampurna" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-green hover:shadow-md transition-all">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="https://www.instagram.com/kissansampurna" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-green hover:shadow-md transition-all">
                            <Instagram className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Information */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-8 text-lg">{t('footer.sections.information')}</h4>
                    <ul className="space-y-4 text-gray-600 font-medium">
                        <li><Link to="/terms" className="hover:text-primary-green transition-colors">{t('footer.links.terms')}</Link></li>
                        <li><Link to="/privacy" className="hover:text-primary-green transition-colors">{t('footer.links.privacy')}</Link></li>
                        <li>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@kissansampurna.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-green transition-colors flex items-center"
                            >
                                {t('footer.links.feedback')}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-8 text-lg">{t('footer.sections.company')}</h4>
                    <ul className="space-y-4 text-gray-600 font-medium">
                        <li><Link to="/pricing" className="hover:text-primary-green transition-colors">{t('footer.links.plans')}</Link></li>
                        <li><Link to="/aboutus" className="hover:text-primary-green transition-colors">{t('footer.links.about')}</Link></li>
                        <li><Link to="/contact" className="hover:text-primary-green transition-colors">{t('footer.links.contact')}</Link></li>
                    </ul>
                </div>

                {/* Reviews */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-8 text-lg">{t('footer.sections.reviews')}</h4>
                    <ul className="space-y-4 text-gray-600 font-medium font-primary">
                        <li><Link to="/blogs" className="hover:text-primary-green transition-colors">{t('footer.links.user_reviews')}</Link></li>
                    </ul>
                </div>

                {/* Products */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-8 text-lg">{t('footer.sections.products')}</h4>
                    <ul className="space-y-4 text-gray-600 font-medium">
                        <li><Link to="/products" className="hover:text-primary-green transition-colors">{t('footer.links.why_buy')}</Link></li>
                        <li className="text-gray-400 text-sm">{t('products.coming_soon')}</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto pt-10 border-t border-gray-200">
                <div className="text-center text-gray-500 text-xs font-medium space-y-2">
                    <p>©{currentYear} {t('footer.company_name')}. {t('footer.rights')}</p>
                    <p>{t('footer.legal_notice')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
