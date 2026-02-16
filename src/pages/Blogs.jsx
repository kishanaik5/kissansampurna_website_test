import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';
import mockData from '../data/mockData.json';

const Blogs = () => {
    const { t } = useTranslation();

    const articles = mockData.blogs;


    return (
        <div className="bg-green-100 min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('blogs.title')}</h1>
                    <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        {t('blogs.subtitle')}
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {articles.map((article) => (
                        <article key={article.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group border border-gray-100">
                            {/* Article Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={t(`blogs.articles.id_${article.id}.title`, article.title)}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Article Content */}
                            <div className="p-6">
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

                                <Link
                                    to={`/blog/${article.slug}`}
                                    className="inline-flex items-center text-primary-green font-bold hover:underline"
                                >
                                    {t('blogs.read_more')} <ArrowRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

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
        </div>
    );
};

export default Blogs;