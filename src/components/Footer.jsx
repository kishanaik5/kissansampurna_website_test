import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const logo = 'https://cdn.gausampurna.co/dev/kissan-sampurna/logo_1.png';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();
    const [hasProducts, setHasProducts] = React.useState(false);

    React.useEffect(() => {
        const checkProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (response.ok) {
                    const data = await response.json();
                    setHasProducts(data.length > 0);
                }
            } catch (error) {
                console.error('Error checking products:', error);
            }
        };
        checkProducts();
    }, []);

    return (
        <footer className="bg-[#1F4D1A] pt-20 pb-10 px-4 md:px-8 mt-auto relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 text-center sm:text-left relative z-10">
                {/* Branding & Social */}
                <div className="space-y-8 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <div className="bg-white p-1.5 rounded-xl shadow-sm">
                            <img src={logo} alt={t('alt.logo')} className="h-7 w-7" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            {t('hero.brand_first')} <span className="text-green-400">{t('hero.brand_second')}</span>
                        </span>
                    </div>
                    <p className="text-green-100/90 font-medium leading-relaxed max-w-xs mx-auto sm:mx-0">
                        {t('footer.tagline')}
                    </p>
                    <div className="flex justify-center sm:justify-start space-x-6">
                        <a href="https://www.facebook.com/kissan.sampurna/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1F4D1A] transition-all shadow-lg hover:shadow-white/20" aria-label="Follow Kissan Sampurna on Facebook">
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="https://x.com/kissansampurna" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1F4D1A] transition-all shadow-lg hover:shadow-white/20" aria-label="Follow Kissan Sampurna on Twitter">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="https://www.instagram.com/kissansampurna" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1F4D1A] transition-all shadow-lg hover:shadow-white/20" aria-label="Follow Kissan Sampurna on Instagram">
                            <Instagram className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Information */}
                <div>
                    <h4 className="font-bold text-white mb-8 text-lg">{t('footer.sections.information')}</h4>
                    <ul className="space-y-4 text-green-100 font-medium">
                        <li><Link to="/terms" className="hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-2"><span>{t('footer.links.terms')}</span></Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-2"><span>{t('footer.links.privacy')}</span></Link></li>
                        <li>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@kissansampurna.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors inline-block"
                            >
                                {t('footer.links.feedback')}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-bold text-white mb-8 text-lg">{t('footer.sections.company')}</h4>
                    <ul className="space-y-4 text-green-100 font-medium">
                        <li><Link to="/pricing" className="hover:text-white transition-colors">{t('footer.links.plans')}</Link></li>
                        <li><Link to="/aboutus" className="hover:text-white transition-colors">{t('footer.links.about')}</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer.links.contact')}</Link></li>
                    </ul>
                </div>

                {/* Reviews */}
                <div>
                    <h4 className="font-bold text-white mb-8 text-lg">{t('footer.sections.reviews')}</h4>
                    <ul className="space-y-4 text-green-100 font-medium">
                        <li><Link to="/blogs" className="hover:text-white transition-colors">{t('footer.links.user_reviews')}</Link></li>
                    </ul>
                </div>

                {/* Products */}
                <div>
                    <h4 className="font-bold text-white mb-8 text-lg">{t('footer.sections.products')}</h4>
                    <ul className="space-y-4 text-green-100 font-medium">
                        <li><Link to="/products" className="hover:text-white transition-colors">{t('footer.links.why_buy')}</Link></li>
                        {!hasProducts && (
                            <li className="text-green-300/40 text-sm italic">{t('products.coming_soon', 'Coming Soon')}</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto pt-10 border-t border-white/10">
                <div className="text-center text-green-200/60 text-xs font-medium space-y-2">
                    <p>©{currentYear} {t('footer.company_name')}. {t('footer.rights')}</p>
                    <p className="opacity-70">{t('footer.legal_notice')}</p>
                </div>
            </div>

            {/* Subtle glow for detail */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-900/40 blur-[120px] rounded-full pointer-events-none" />
        </footer>
    );
};

export default Footer;
