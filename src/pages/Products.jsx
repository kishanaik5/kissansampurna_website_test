import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Hourglass, ShieldCheck, Sprout, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const PRODUCTS_PER_PAGE = 3;

const Products = () => {
    const { t } = useTranslation();

    const buyReasons = [
        {
            title: t('products.reasons.curated.title'),
            description: t('products.reasons.curated.desc'),
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: t('products.reasons.tested.title'),
            description: t('products.reasons.tested.desc'),
            icon: ShieldCheck,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: t('products.reasons.sustainable.title'),
            description: t('products.reasons.sustainable.desc'),
            icon: Sprout,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: t('products.reasons.data.title'),
            description: t('products.reasons.data.desc'),
            icon: TrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="pb-24 pt-20 bg-green-100 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">{t('products.title')}</h1>
                    <p className="text-lg text-gray-600 font-medium">{t('products.subtitle')}</p>
                </div>
            </section>

            {/* Products List - Dynamic Content */}
            {isLoading ? (
                <section className="py-20 bg-white flex flex-col items-center justify-center min-h-[40vh]">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-green-100 border-t-primary-green rounded-full animate-spin"></div>
                        <Sprout className="absolute inset-0 m-auto h-6 w-6 text-primary-green animate-pulse" />
                    </div>
                    <p className="mt-4 text-gray-500 font-bold animate-pulse uppercase tracking-widest text-sm">
                        Loading Products...
                    </p>
                </section>
            ) : products.length > 0 ? (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 md:px-8">
                        {/* Product Grid - 3 per page */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginatedProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col group">
                                    <div className="h-48 overflow-hidden bg-gray-50 flex-shrink-0">
                                        {product.image_path ? (
                                            <img
                                                src={product.image_path}
                                                alt={product.product_name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <Package className="h-12 w-12" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{product.product_name}</h3>
                                        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{product.about_product}</p>
                                        {product.ordering_link && (
                                            <a
                                                href={product.ordering_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-auto w-full bg-primary-green text-white py-3 rounded-xl font-bold text-center hover:bg-green-700 transition-colors shadow-lg shadow-green-900/20"
                                            >
                                                Order Now
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-12">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft className="h-4 w-4" /> Previous
                                </button>
                                <span className="text-gray-500 font-medium text-sm">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    Next <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                /* Content Section - Coming Soon (Fallback if no products) */
                <section className="py-20 text-center">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-12 relative overflow-hidden">
                            <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-green-100">
                                <Package className="h-12 w-12 text-primary-green" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase tracking-tight text-primary-green">{t('products.coming_soon')}</h2>

                            <div className="flex items-center justify-center gap-3 text-green-700 font-bold mb-8 text-xl">
                                <Hourglass className="h-6 w-6 animate-spin-slow" />
                                <span>{t('products.coming_soon_desc')}</span>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[#1F4D1A]">
                                    {t('products.innovation_tag')}
                                </p>
                            </div>

                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-50"></div>
                        </div>
                    </div>
                </section>
            )}


            {/* Why Buy Our Products Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('products.why_buy')}</h2>
                        <p className="text-lg text-gray-600 font-medium font-primary">
                            {t('products.ecosystem_desc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {buyReasons.map((reason, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                <div className={`w-14 h-14 ${reason.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <reason.icon className={`h-7 w-7 ${reason.color}`} />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h4>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {reason.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
