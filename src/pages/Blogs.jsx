import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';
import mockData from '../data/mockData.json';
const farmersImg = 'https://cdn.gausampurna.co/dev/kissan-sampurna/IMG_20260225_142254.png';

const Blogs = () => {
    const { t, i18n } = useTranslation();

    const [isOlderExpanded, setIsOlderExpanded] = useState(false);
    const [dbBlogs, setDbBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const langCode = i18n.language.split('-')[0];
            try {
                const response = await fetch(`/api/blogs?lang=${langCode}`);
                if (response.ok) {
                    const data = await response.json();
                    setDbBlogs(data);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, [i18n.language]);

    // Map DB fields to UI fields
    const displayBlogs = dbBlogs.length > 0 ? dbBlogs.map(b => ({
        id: b.id,
        title: b.blog_title,
        image: b.blog_img || farmersImg,
        date: b.created_at,
        slug: b.id, // Using ID as slug
        excerpt: b.blog_body ? b.blog_body.substring(0, 150) + '...' : '' // Generate excerpt
    })) : mockData.blogs;

    // Sort by date descending
    const sortedArticles = [...displayBlogs].sort((a, b) => new Date(b.date) - new Date(a.date));

    const recentArticles = sortedArticles.slice(0, 3);
    const olderArticles = sortedArticles.slice(3);

    return (
        <div className="bg-green-100 min-h-screen pb-24 md:pb-32 pt-20">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('blogs.title')}</h1>
                    <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        {t('blogs.subtitle')}
                    </p>
                </div>

                {/* Recent Articles Grid */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {recentArticles.map((article) => (
                            <article key={article.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group border border-gray-100 h-full flex flex-col">
                                {/* Article Image */}
                                <div className="relative h-48 overflow-hidden flex-shrink-0">
                                    <img
                                        src={article.image || farmersImg}
                                        onError={(e) => { e.target.onerror = null; e.target.src = farmersImg; }}
                                        alt={t(`blogs.articles.id_${article.id}.title`, article.title)}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Article Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <User className="h-4 w-4 mr-1" />
                                        <span>Kissan Sampurna</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-green transition-colors">
                                        {t(`blogs.articles.id_${article.id}.title`, article.title)}
                                    </h2>

                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {t(`blogs.articles.id_${article.id}.excerpt`, article.excerpt)}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            to={`/blog/${article.slug}`}
                                            className="inline-flex items-center text-primary-green font-bold hover:underline"
                                        >
                                            {t('blogs.read_more')} <ArrowRight className="h-4 w-4 ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Older Articles Dropdown */}
                {olderArticles.length > 0 && (
                    <div className="mb-20">
                        <button
                            onClick={() => setIsOlderExpanded(!isOlderExpanded)}
                            className="w-full flex items-center justify-between bg-white px-8 py-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 group"
                        >
                            <span className="text-xl font-bold text-gray-800">Older Articles ({olderArticles.length})</span>
                            <div className={`p-2 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors ${isOlderExpanded ? 'rotate-180' : ''} duration-300`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-green">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </button>

                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden transition-all duration-500 ease-in-out ${isOlderExpanded ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                            {olderArticles.map((article) => (
                                <article key={article.id} className="bg-white/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100">
                                    <div className="flex flex-col h-full">
                                        <div className="p-6 flex-1">

                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-green transition-colors">
                                                {t(`blogs.articles.id_${article.id}.title`, article.title)}
                                            </h3>
                                            <Link
                                                to={`/blog/${article.slug}`}
                                                className="inline-flex items-center text-sm text-primary-green font-bold hover:underline mt-auto"
                                            >
                                                {t('blogs.read_more')} <ArrowRight className="h-3 w-3 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {/* Divider */}
                <hr className="border-green-200 mb-16" />

                {/* User Reviews Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('blogs.reviews.title_part1')} <span className="text-primary-green">{t('blogs.reviews.title_part2')}</span>
                        </h2>
                        <p className="text-lg text-gray-600 font-medium mb-8">
                            {t('blogs.reviews.subtitle')}
                        </p>

                        {/* Review Button */}
                        <a
                            href="https://play.google.com/store/apps/details?id=com.kissansampurna.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-primary-green text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            <Star className="h-6 w-6 mr-3" />
                            {t('blogs.review_form.btn_submit')}
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Blogs;