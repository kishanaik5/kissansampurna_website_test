import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import mockData from '../data/mockData.json';
import { useTranslation } from 'react-i18next';

const BlogDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams();
    const blog = mockData.blogs.find((b) => b.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">{t('blog_detail.not_found')}</h2>
                    <Link to="/blogs" className="text-primary-green font-bold">{t('blog_detail.back_to_blogs')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-green-50 min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                {/* Back Link */}
                <Link to="/blogs" className="inline-flex items-center text-gray-400 hover:text-primary-green mb-8 font-bold transition-colors text-sm">
                    <ArrowLeft className="h-4 w-4 mr-2" /> {t('nav.blogs')}
                </Link>

                {/* Header Information */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                        {t(`blogs.articles.id_${blog.id}.title`)}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400">
                        <span className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary-green" />
                            {t('blog_detail.by')} {t(`blogs.articles.id_${blog.id}.author`)}
                        </span>
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary-green" />
                            {blog.date}
                        </span>
                        <span className="bg-green-100 text-primary-green text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-black">
                            {t(`blogs.articles.id_${blog.id}.category`) || 'Agri Tech'}
                        </span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img
                        src={blog.image}
                        alt={t(`blogs.articles.id_${blog.id}.title`)}
                        className="w-full h-auto object-cover max-h-[600px]"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none text-gray-700 font-medium prose-headings:text-gray-900 prose-headings:font-black prose-green">
                    {t(`blogs.articles.id_${blog.id}.content`, { defaultValue: blog.content }).split('\n').map((para, i) => {
                        if (para.startsWith('# ')) return <h1 key={i} className="text-3xl font-black mt-12 mb-6">{para.replace('# ', '')}</h1>;
                        if (para.startsWith('## ')) return <h2 key={i} className="text-2xl font-black mt-10 mb-4">{para.replace('## ', '')}</h2>;
                        if (para.startsWith('- ')) return <li key={i} className="ml-6 mb-3 list-disc marker:text-primary-green">{para.replace('- ', '')}</li>;
                        if (para.trim() === '') return null;
                        return <p key={i} className="mb-8 leading-relaxed text-lg lg:text-xl text-gray-600">{para}</p>;
                    })}
                </div>

                {/* End of content marker or Footer spacing */}
                <div className="mt-24 border-t border-gray-100 pt-12 text-center">
                    <Link to="/blogs" className="text-primary-green font-black text-lg hover:underline transition-all">
                        ← {t('blog_detail.back_to_all')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;