import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import mockData from '../data/mockData.json';
import { useTranslation } from 'react-i18next';

const BlogDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                // 1. Try fetching from Backend
                const response = await fetch('/api/blogs');
                if (response.ok) {
                    const data = await response.json();

                    // The 'slug' param is likely the UUID for DB blogs
                    const dbBlog = data.find(b => b.id === slug);

                    if (dbBlog) {
                        setBlog({
                            id: dbBlog.id,
                            title: dbBlog.blog_title,
                            content: dbBlog.blog_body,
                            image: dbBlog.blog_img,
                            date: dbBlog.created_at,
                            slug: dbBlog.id
                        });
                        setLoading(false);
                        return;
                    }
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }

            // 2. Fallback to Mock Data if not found in DB or error occurs
            const mockBlog = mockData.blogs.find((b) => b.slug === slug);
            if (mockBlog) {
                setBlog(mockBlog);
            }

            setLoading(false);
        };

        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
            </div>
        );
    }

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
        <div className="bg-green-100 min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                {/* Back Link */}
                <Link to="/blogs" className="inline-flex items-center text-gray-400 hover:text-primary-green mb-8 font-bold transition-colors text-sm">
                    <ArrowLeft className="h-4 w-4 mr-2" /> {t('nav.blogs')}
                </Link>

                {/* Header Information */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                        {t(`blogs.articles.id_${blog.id}.title`, blog.title)}
                    </h1>
                </div>

                {/* Featured Image */}
                <div className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img
                        src={blog.image}
                        alt={t(`blogs.articles.id_${blog.id}.title`, blog.title)}
                        className="w-full h-auto object-cover max-h-[600px]"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none text-gray-700 font-medium prose-headings:text-gray-900 prose-headings:font-black prose-green">
                    {/* Handle both translation key and direct content (for DB blogs) */}
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