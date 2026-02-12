import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldAlert, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default to user
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login logic
        const userData = { email, role, id: '123' };
        login(userData);

        const from = location.state?.from?.pathname || (role === 'admin' ? '/admin' : '/');
        navigate(from, { replace: true });
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-8">
                        <Sprout className="h-10 w-10 text-primary-green" />
                        <span className="text-2xl font-bold text-gray-900 leading-none">Kissan <span className="text-primary-green">Sampurna</span></span>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t('auth.login.title')}</h1>
                    <p className="text-gray-500 font-medium mt-2">{t('auth.login.subtitle')}</p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-10 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
                            <button
                                type="button"
                                onClick={() => setRole('user')}
                                className={cn(
                                    'flex-1 py-3 text-sm font-bold rounded-lg transition-all',
                                    role === 'user' ? 'bg-white shadow-sm text-primary-green' : 'text-gray-500'
                                )}
                            >
                                {t('auth.login.role_user')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={cn(
                                    'flex-1 py-3 text-sm font-bold rounded-lg transition-all',
                                    role === 'admin' ? 'bg-white shadow-sm text-primary-green' : 'text-gray-500'
                                )}
                            >
                                {t('auth.login.role_admin')}
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('auth.login.email_label')}</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                                    placeholder={t('auth.login.email_placeholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{t('auth.login.password_label')}</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                                    placeholder={t('auth.login.password_placeholder')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {role === 'admin' && (
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-4">
                                <ShieldAlert className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                                <p className="text-xs text-orange-800 font-medium">
                                    {t('auth.login.admin_warning')}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary-green text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all shadow-xl shadow-green-100 flex items-center justify-center space-x-2"
                        >
                            <LogIn className="h-5 w-5" />
                            <span>{t('auth.login.btn_login')}</span>
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm font-semibold text-gray-500">
                        {t('auth.login.no_account')} <Link to="/signup" className="text-primary-green hover:underline">{t('auth.login.signup_link')}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

// Local cn helper
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default Login;