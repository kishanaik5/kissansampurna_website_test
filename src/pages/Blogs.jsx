import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag, Star, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';
import mockData from '../data/mockData.json';

const Blogs = () => {
    const { t } = useTranslation();
    const [reviewName, setReviewName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const articles = mockData.blogs;

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (reviewName && reviewText) {
            const subject = encodeURIComponent(`${t('blogs.review_form.email_subject')} ${reviewName}`);
            const body = encodeURIComponent(`Name: ${reviewName}\n\nReview:\n${reviewText}`);
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=support@kissansampurna.com&su=${subject}&body=${body}`, '_blank');
            setSubmitted(true);
            setReviewName('');
            setReviewText('');
        }
    };

    return (
        <div className="bg-green-50 min-h-screen py-24 md:py-32">
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
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary-green text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {t(`blogs.articles.id_${article.id}.category`, article.category)}
                                    </span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                    <span className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {article.date}
                                    </span>
                                    <span className="flex items-center">
                                        <User className="h-4 w-4 mr-1" />
                                        {t('blogs.author_prefix', 'By')} {t(`blogs.articles.id_${article.id}.author`, article.author)}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-green transition-colors">
                                    {t(`blogs.articles.id_${article.id}.title`, article.title)}
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {t(`blogs.articles.id_${article.id}.excerpt`, article.excerpt)}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {article.tags.slice(0, 2).map((tag, idx) => (
                                        <span key={idx} className="text-xs bg-green-50 text-primary-green px-2 py-1 rounded-full font-medium">
                                            {t(`blogs.articles.id_${article.id}.tags.${idx}`, tag)}
                                        </span>
                                    ))}
                                </div>

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
                        <p className="text-lg text-gray-600 font-medium">
                            {t('blogs.reviews.subtitle')}
                        </p>
                    </div>

                    {/* Review Form */}
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="h-8 w-8 text-primary-green" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('blogs.review_form.thanks_title')}</h3>
                                <p className="text-gray-600">{t('blogs.review_form.thanks_msg')}</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-primary-green font-bold hover:underline"
                                >
                                    {t('blogs.review_form.thanks_btn')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleReviewSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('blogs.review_form.label_name')}</label>
                                    <input
                                        type="text"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                        placeholder={t('blogs.review_form.placeholder_name')}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('blogs.review_form.label_review')}</label>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder={t('blogs.review_form.placeholder_review')}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent resize-none"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center"
                                >
                                    <Send className="h-5 w-5 mr-2" />
                                    {t('blogs.review_form.btn_submit')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;