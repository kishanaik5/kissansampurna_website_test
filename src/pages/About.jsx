import React from 'react';
import { Target, Lightbulb, Leaf, Users, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import farmersImg from '../assets/images/1111.svg';

const About = () => {
    const { t } = useTranslation();
    const values = [
        {
            title: t('about.values.sustainability.title'),
            description: t('about.values.sustainability.desc'),
            icon: Leaf,
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            title: t('about.values.farmer_centric.title'),
            description: t('about.values.farmer_centric.desc'),
            icon: Users,
            bgColor: 'bg-amber-50',
            iconColor: 'text-amber-600'
        },
        {
            title: t('about.values.data_driven.title'),
            description: t('about.values.data_driven.desc'),
            icon: BarChart3,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center pt-16">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                                {t('about.hero.title_part1')} <span className="text-primary-green">{t('about.hero.title_part2')}</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                                {t('about.hero.description_1')}
                            </p>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                {t('about.hero.description_2')}
                            </p>
                        </div>
                        <div className="lg:w-1/2">
                            <img
                                src={farmersImg}
                                alt="Indian farmers in field"
                                className="rounded-[2rem] shadow-2xl transform transition-all duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="py-20 bg-green-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Vision Card */}
                        <div className="bg-white p-12 rounded-[2.5rem] shadow-lg border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                                <Target className="h-8 w-8 text-primary-green" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('about.vision.title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                {t('about.vision.desc')}
                            </p>
                        </div>
                        {/* Mission Card */}
                        <div className="bg-primary-green p-12 rounded-[2.5rem] shadow-xl text-white flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                                <Lightbulb className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold mb-6">{t('about.mission.title')}</h3>
                            <p className="text-green-50 leading-relaxed font-medium">
                                {t('about.mission.desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">{t('about.values.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                        {values.map((v, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                <div className={`w-14 h-14 ${v.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <v.icon className={`h-7 w-7 ${v.iconColor}`} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">{v.title}</h4>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {v.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;