'use client';

import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsletterProps {
    variant?: 'hero' | 'sidebar' | 'footer';
    showIcon?: boolean;
}

const Newsletter = ({ variant = 'hero', showIcon = true }: NewsletterProps) => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Backend API çağrısı
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(t('newsletter.error.submit'));
            }

            setIsSubmitted(true);
            setEmail('');
        } catch (err) {
            setError(t('newsletter.error.submit'));
        } finally {
            setIsLoading(false);
        }
    }, [email, t]);

    const validateEmail = useCallback((email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    const getSizeClasses = useCallback(() => {
        switch (variant) {
            case 'sidebar':
                return 'max-w-sm text-sm';
            case 'footer':
                return 'max-w-md text-sm';
            default:
                return 'max-w-4xl text-base md:text-lg';
        }
    }, [variant]);

    if (isSubmitted) {
        return (
            <div className={`relative ${getSizeClasses()} mx-auto text-center`}>
                {/* Success Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md rounded-full border border-green-500/30">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    {t('newsletter.success.title')}
                </h3>
                <p className="text-gray-300">
                    {t('newsletter.success.message')}
                </p>
            </div>
        );
    }

    return (
        <div className={`relative ${getSizeClasses()} mx-auto`}>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="relative text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    {t('newsletter.title')}
                </h2>

                <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed">
                    {t('newsletter.description')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <div className="relative flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('newsletter.placeholder')}
                                className="flex-1 w-full sm:w-auto sm:flex-1 px-4 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !validateEmail(email)}
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {t('newsletter.sending')}
                                    </div>
                                ) : (
                                    t('newsletter.subscribe')
                                )}
                            </button>
                        </div>

                        {error && (
                            <p className="mt-2 text-red-400 text-sm text-center">{error}</p>
                        )}
                    </div>
                </form>

                <p className="mt-4 text-gray-400 text-xs md:text-sm">
                    {t('newsletter.privacy')}
                </p>
            </div>
        </div>
    );
};

export default Newsletter;