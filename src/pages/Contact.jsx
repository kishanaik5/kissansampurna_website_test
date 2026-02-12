import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: 'Support',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // FormSubmit.co - FREE, no signup required, sends directly to email
            const response = await fetch('https://formsubmit.co/ajax/support@kissansampurna.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `[Kissan Sampurna - ${formData.topic}] New message from ${formData.name}`,
                    name: formData.name,
                    email: formData.email,
                    topic: formData.topic,
                    message: formData.message,
                    _template: 'table' // Sends nicely formatted table email
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 5000);
                setFormData({ name: '', email: '', topic: 'Support', message: '' });
            } else {
                setError('Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white min-h-screen">
            <section className="py-24 bg-green-50 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('contact.title')}</h1>
                    <p className="text-lg text-gray-600 font-medium">{t('contact.subtitle')}</p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.info.title')}</h2>
                            <p className="text-gray-600 font-medium mb-12 text-lg leading-relaxed">
                                {t('contact.info.description', 'Connect with us through any of these channels or fill out the form, and we\'ll get back to you within 24 hours.')}
                            </p>

                            <div className="space-y-10">
                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 border border-green-100">
                                        <Mail className="h-6 w-6 text-primary-green" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">{t('contact.info.email_label')}</h4>
                                        <p className="text-gray-600 font-medium">support@kissansampurna.com</p>
                                        <p className="text-gray-500 text-sm">General & technical queries</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 border border-green-100">
                                        <Phone className="h-6 w-6 text-primary-green" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">{t('contact.info.phone_label')}</h4>
                                        <p className="text-gray-600 font-medium">+91 98765 43210</p>
                                        <p className="text-gray-500 text-sm">Mon-Fri, 9am - 6pm IST</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 border border-green-100">
                                        <MapPin className="h-6 w-6 text-primary-green" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">{t('contact.info.address_label')}</h4>
                                        <p className="text-gray-500 text-sm">2nd Floor, 558, 9th Cross Rd, 3rd Phase, J. P. Nagar, Bengaluru, Karnataka 560078</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 md:p-12 relative overflow-hidden">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                <MessageSquare className="mr-3 text-primary-green h-6 w-6" /> {t('contact.form.btn_send')}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.form.name')}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t('contact.form.placeholder_name')}
                                            className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.form.email')}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('contact.form.placeholder_email')}
                                            className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.form.subject')}</label>
                                    <select
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all bg-white appearance-none"
                                    >
                                        <option value="Support">Support</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('contact.form.message')}</label>
                                    <textarea
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder={t('contact.form.placeholder_message')}
                                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitted || isSubmitting}
                                    className="w-full bg-primary-green text-white font-bold py-5 rounded-xl hover:bg-green-800 transition-all shadow-xl shadow-green-100 flex items-center justify-center space-x-3 disabled:bg-gray-400"
                                >
                                    <Send className={`h-5 w-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                                    <span>{isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : t('contact.form.btn_send')}</span>
                                </button>
                            </form>

                            {submitted && (
                                <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center text-center p-12 animate-fade-in">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                        <Send className="h-10 w-10 text-primary-green" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        Your message has been received successfully. Our team will get back to you shortly.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;