import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Signup = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup({ ...formData, role: 'user', id: Date.now() });
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-8">
                        <Sprout className="h-10 w-10 text-primary-green" />
                        <span className="text-2xl font-bold text-gray-900 leading-none">Kissan <span className="text-primary-green">Sampurna</span></span>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t('auth.signup.title')}</h1>
                    <p className="text-gray-500 font-medium mt-2">{t('auth.signup.subtitle')}</p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-10 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('auth.signup.name_label')}</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                                    placeholder={t('auth.signup.name_placeholder')}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('auth.signup.email_label')}</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                                    placeholder={t('auth.signup.email_placeholder')}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('auth.signup.password_label')}</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                                    placeholder={t('auth.signup.password_placeholder')}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-green text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all shadow-xl shadow-green-100 flex items-center justify-center space-x-2"
                        >
                            <UserPlus className="h-5 w-5" />
                            <span>{t('auth.signup.btn_signup')}</span>
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm font-semibold text-gray-500">
                        {t('auth.signup.has_account')} <Link to="/login" className="text-primary-green hover:underline">{t('auth.login.btn_login')}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;