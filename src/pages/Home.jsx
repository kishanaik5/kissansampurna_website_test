import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, Sprout, BarChart3, ShieldCheck, Leaf, Sun, Droplets, Wheat, Play, Apple } from 'lucide-react';
import { cn } from '../utils/cn';
import FarmingCarousel from '../components/FarmingCarousel';
import mockData from '../data/mockData.json';

const farmersImg = 'https://cdn.gausampurna.co/dev/kissan-sampurna/IMG_20260225_142254.png';
const logo = 'https://cdn.gausampurna.co/dev/kissan-sampurna/logo_1.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules';

const Home = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();

    // Phone registration logic
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null

    const handlePhoneChange = (e) => {
        const val = e.target.value.replace(/\D/g, ''); // Numeric only
        if (val.length <= 10) {
            setPhoneNumber(val);
        }
    };

    const handleSubmitPhone = async () => {
        if (phoneNumber.length !== 10) return;

        setIsSubmitting(true);
        setSubmissionStatus(null);

        try {
            const response = await fetch('/api/phone-register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: phoneNumber })
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setPhoneNumber('');
            } else {
                setSubmissionStatus('error');
            }
        } catch (error) {
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Blog Data Logic
    const [dbBlogs, setDbBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const langCode = i18n.language.split('-')[0];
            console.log('Fetching blogs for language:', langCode);
            setDbBlogs([]); // Clear old blogs before fetching new ones
            try {
                const response = await fetch(`/api/blogs?lang=${langCode}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(`Fetched ${data.length} blogs for ${langCode}`);
                    setDbBlogs(data);
                } else {
                    console.error('Failed to fetch blogs');
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, [i18n.language]);

    const displayBlogs = useMemo(() => {
        if (dbBlogs.length > 0) {
            return dbBlogs.map(b => ({
                id: b.id,
                title: b.blog_title,
                image: b.blog_img || farmersImg,
                date: b.created_at,
                slug: b.id
            }));
        }
        // Fallback to mock data with translations
        return mockData.blogs.map(b => ({
            ...b,
            title: t(`blogs.articles.id_${b.id}.title`, b.title)
        }));
    }, [dbBlogs, t]);

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
            <section id="hero" className="relative min-h-screen flex items-center bg-green-100 overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src={farmersImg}
                        alt={t('alt.hero_bg')}
                        className="w-full h-full object-cover object-right md:object-center opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100/80 via-green-100/60 to-transparent/5" />

                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-20 py-6">
                    <div className="flex flex-col items-start">
                        {/* Hero Content */}
                        <div className="max-w-3xl animate-fade-in-up">

                            <h1
                                className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8"
                            >
                                {t('hero.brand_first')} <span className="text-primary-green">{t('hero.brand_second')}</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
                                {t('hero.description_1')}
                            </p>
                            <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-2xl">
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
                    </div>
                </div>
            </section>

            {/* Farming Stages Section */}
            <div id="farming-cycle">
                <FarmingCarousel />
            </div>

            {/* App Promotion Section */}
            <section id="app-promotion" className="relative pt-4 pb-20 flex items-start bg-gradient-to-br from-gray-950 via-black to-gray-950">
                <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 w-full pt-10">
                    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-32">



                        {/* Text Content */}
                        <div className="lg:max-w-4xl text-white">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tighter">
                                {t('promotion.title_part1')} <br />
                                <span className="text-green-600 text-3xl md:text-5xl lg:text-6xl">{t('promotion.title_part2')}</span>
                            </h2>

                            <p className="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed font-bold">
                                {t('promotion.description')}
                            </p>

                            {/* Feature List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <feature.icon className="h-5 w-5 text-white opacity-80" />
                                        </div>
                                        <span className="text-white font-bold text-base md:text-lg tracking-wide">{feature.title}</span>
                                    </div>
                                ))}
                            </div>



                        </div>

                        {/* Phone Mockup */}
                        <div className="flex flex-col items-center gap-8">
                            <div className="relative group">
                                {/* Ambient Halo Effect */}
                                <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full scale-110 pointer-events-none animate-pulse-slow" />

                                {/* External Gradient Border Effect */}
                                <div className="absolute inset-0 bg-[#0F172A] rounded-[3rem] -m-1 ring-1 ring-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]" />

                                {/* Phone Frame */}
                                <div className="relative w-[300px] h-[600px] bg-gray-950 rounded-[3rem] p-3 shadow-2xl border-[1px] border-white/20 z-10 backdrop-blur-sm">

                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-3xl z-20 flex items-center justify-center border-x border-b border-white/10">
                                        <div className="w-8 h-1 bg-gray-800 rounded-full" />
                                    </div>

                                    {/* Screen Content */}
                                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden p-6 flex flex-col">

                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black text-gray-900 leading-[1.1]">
                                                {t('phone_mockup.welcome')} <br />
                                                <span className="text-[#1F4D1A]">{t('hero.brand_first')} {t('hero.brand_second')}</span>
                                            </h3>
                                        </div>

                                        <div className="h-40 rounded-3xl overflow-hidden mb-6 shadow-md flex items-center justify-center bg-gray-50 p-4">
                                            <img
                                                src={logo}
                                                alt={t('alt.app_ui')}
                                                className="w-auto h-full object-contain shadow-sm"
                                            />
                                        </div>


                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[14px] font-black text-gray-900 tracking-tight pl-1">{t('phone_mockup.label', 'Phone number')}</label>
                                                <input
                                                    type="text"
                                                    value={phoneNumber}
                                                    onChange={handlePhoneChange}
                                                    placeholder={t('phone_mockup.placeholder', 'Enter your Phone number')}
                                                    className="w-full h-16 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-5 flex items-center text-gray-900 text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-primary-green/20 placeholder:text-gray-400"
                                                />
                                            </div>
                                            <button
                                                onClick={handleSubmitPhone}
                                                disabled={isSubmitting || phoneNumber.length !== 10}
                                                className={cn(
                                                    "w-full h-16 text-white text-lg font-black rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center",
                                                    isSubmitting || phoneNumber.length !== 10
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-[#1F4D1A] shadow-green-900/10 hover:bg-green-800"
                                                )}
                                            >
                                                {isSubmitting ? (
                                                    <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : t('phone_mockup.btn_next', 'Next')}
                                            </button>

                                            {submissionStatus === 'success' && (
                                                <p className="text-[10px] text-green-600 font-bold text-center animate-fade-in">
                                                    ✓ {t('phone_mockup.success', 'Registered successfully!')}
                                                </p>
                                            )}
                                            {submissionStatus === 'error' && (
                                                <p className="text-[10px] text-red-600 font-bold text-center animate-fade-in">
                                                    ⚠ {t('phone_mockup.error', 'Failed. Please try again.')}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* App Download Buttons - below phone mockup */}
                            <div className="flex flex-wrap gap-4 justify-center">
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
            </section>

            {/* Recent Blogs Section */}
            <section id="recent-blogs" className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight">
                        {t('home.recent_blogs', 'Recent from our Blog')}
                    </h2>
                    <div className="mb-8 max-w-7xl mx-auto">
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
                            }}
                            speed={600}
                            threshold={5}
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
                            grabCursor={true}
                            allowTouchMove={true}
                            resistance={true}
                            resistanceRatio={0.85}
                            mousewheel={{ forceToAxis: true }}
                            modules={[Autoplay, Pagination, Navigation, Mousewheel]}
                            className="mySwiper px-4 py-8"
                        >
                            {/* Tripling data to ensure seamless infinite circular loop */}
                            {[...displayBlogs, ...displayBlogs, ...displayBlogs].map((blog, index) => (
                                <SwiperSlide key={`${blog.id}-${index}`} className="flex-shrink-0">
                                    <Link
                                        to={`/blog/${blog.slug}`}
                                        className="group relative block w-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                                    >
                                        <div className="h-60 overflow-hidden">
                                            <img
                                                src={blog.image || farmersImg}
                                                onError={(e) => { e.target.onerror = null; e.target.src = farmersImg; }}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        {/* Overlay with title on interaction/hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <h3 className="text-white font-bold text-sm leading-tight translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300 line-clamp-3">
                                                {blog.title}
                                            </h3>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;