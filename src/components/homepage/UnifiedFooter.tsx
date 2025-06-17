'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsletterProps {
    variant?: 'hero' | 'sidebar' | 'footer';
    showIcon?: boolean;
}

// NewsletterSection'ı ayrı bir bileşen olarak bileşen dışında tanımlayın
const NewsletterSection = React.memo(({ 
    variant, 
    t, 
    email, 
    setEmail, 
    isLoading, 
    isSubmitted, 
    error, 
    handleSubmit,
    validateEmail
}: {
    variant: 'hero' | 'sidebar' | 'footer';
    t: any;
    email: string;
    setEmail: (email: string) => void;
    isLoading: boolean;
    isSubmitted: boolean;
    error: string;
    handleSubmit: (e: React.FormEvent) => void;
    validateEmail: (email: string) => boolean;
}) => {
    const getSizeClasses = () => {
        switch (variant) {
            case 'sidebar':
                return 'max-w-sm text-sm';
            case 'footer':
                return 'max-w-md text-sm';
            default:
                return 'max-w-4xl text-base md:text-lg';
        }
    };

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
            <div className="relative text-center">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {t('newsletter.title')}
                </h2>

                <p className="text-gray-300 mb-4 leading-relaxed">
                    {t('newsletter.description')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <div className="relative flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('newsletter.placeholder')}
                                className="flex-1 w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !validateEmail(email)}
                                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
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

                <p className="mt-3 text-gray-400 text-xs">
                    {t('newsletter.privacy')}
                </p>
            </div>
        </div>
    );
});

NewsletterSection.displayName = 'NewsletterSection';

// TransitionWave bileşenini de bileşen dışında tanımlayın
const TransitionWave = React.memo(() => {
    return (
        <div className="relative py-6">
            {/* Dalgalı SVG Geçiş Efekti */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block w-full h-32 rotate-180"
                    >
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            className="fill-green-800/30 opacity-80"
                        />
                        <path
                            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                            className="fill-green-900/30 opacity-75"
                        />
                        <path
                            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                            className="fill-black opacity-95"
                        />
                    </svg>
                </div>
            </div>

            {/* Yıldız parçacıkları */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                        animation: `pulse ${2 + Math.random() * 2}s ${Math.random() * 3}s infinite`
                    }}
                />
            ))}

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 0.8; transform: scale(1.5); }
                }
            `}</style>
        </div>
    );
});

TransitionWave.displayName = 'TransitionWave';

const UnifiedFooter = ({ variant = 'footer', showIcon = true }: NewsletterProps) => {
    const { t, language } = useLanguage();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const currentYear = new Date().getFullYear();

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

    return (
        <div className="relative">
            {/* Transition Wave connecting to the footer */}
            <TransitionWave />

            {/* Background Image */}
            <div className="relative">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/images/footer-bg.jpg"
                        alt="Footer Background"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Slightly darkened overlay for better content visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70" />
                </div>

                <div className="relative z-10 pt-16 pb-8">
                    <div className="container mx-auto px-4">
                        {/* Newsletter Section above the footer columns */}
                        <div className="mb-16 pb-6 border-b border-gray-800/50">
                            <NewsletterSection
                                variant={variant}
                                t={t}
                                email={email}
                                setEmail={setEmail}
                                isLoading={isLoading}
                                isSubmitted={isSubmitted}
                                error={error}
                                handleSubmit={handleSubmit}
                                validateEmail={validateEmail}
                            />
                        </div>

                        {/* Footer Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                            {/* Column 1: Logo & About */}
                            <div className="space-y-6">
                                <Link href="/" className="inline-block">
                                    <Image
                                        src="/assets/images/logo.jpeg"
                                        alt="DGD GLOBAL"
                                        width={150}
                                        height={50}
                                        className="object-contain"
                                    />
                                </Link>
                                <p className="text-gray-300 text-sm">
                                    {language === "tr"
                                        ? "Çevre duyarlılığı odağında yerli üretim ekseninde yeşil ve biyo-döngüsel, sürdürülebilir yaşam modeli geliştiren teknoloji şirketidir."
                                        : "A technology company focused on environmental awareness, developing green and bio-circular, sustainable life models based on domestic production."}
                                </p>

                                {/* Social Media Icons */}
                                <div className="flex space-x-4">
                                    {/* Twitter */}
                                    <a
                                        href="https://x.com/dgd_global_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-green-500/50 transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>

                                    {/* LinkedIn */}
                                    <a
                                        href="https://www.linkedin.com/in/dgd-global-teknoloji-a-ş-9326ab335"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-green-500/50 transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>

                                    {/* Instagram */}
                                    <a
                                        href="https://www.instagram.com/dgdglobalteknoloji?igsh=aW1hM2JhcGtkcnhp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-green-500/50 transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Column 2: Quick Links */}
                            <div>
                                <h3 className="text-white text-lg font-semibold mb-5">
                                    {language === "tr" ? "Hızlı Bağlantılar" : "Quick Links"}
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        { href: "/vision-mission", tr: "Vizyon & Misyon", en: "Vision & Mission" },
                                        { href: "/founders", tr: "Kurucularımız", en: "Our Founders" },
                                        { href: "/product-development", tr: "Ekibimiz", en: "Our Team" },
                                        { href: "/tech-club", tr: "DGD Tech Club", en: "DGD Tech Club" },
                                        { href: "/commercial-partnerships", tr: "İş Birliklerimiz", en: "Our Partnerships" },
                                    ].map(({ href, tr, en }, index) => (
                                        <li key={index}>
                                            <Link
                                                href={href}
                                                className="text-gray-300 hover:text-green-400 transition-colors"
                                            >
                                                {language === "tr" ? tr : en}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 3: Business Areas */}
                            <div>
                                <h3 className="text-white text-lg font-semibold mb-5">
                                    {language === "tr" ? "Faaliyet Alanlarımız" : "Business Areas"}
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        {
                                            href: "/bio-circular-process",
                                            tr: "Yeşil ve Biyo-Döngüsel Teknolojiler",
                                            en: "Green & Bio-Circular Technologies",
                                        },
                                        {
                                            href: "/radiator-systems",
                                            tr: "Isıtma ve Havalandırma Teknolojileri",
                                            en: "Heating & Ventilation Technologies",
                                        },
                                        {
                                            href: "/construction",
                                            tr: "Yapı ve Mimari Teknolojiler",
                                            en: "Building & Architecture Technologies",
                                        },
                                        {
                                            href: "/consulting-services",
                                            tr: "İletişim ve PR Danışmanlığı",
                                            en: "Communication & PR Consulting",
                                        },
                                    ].map(({ href, tr, en }, index) => (
                                        <li key={index}>
                                            <Link
                                                href={href}
                                                className="text-gray-300 hover:text-green-400 transition-colors"
                                            >
                                                {language === "tr" ? tr : en}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 4: Contact Info */}
                            <div>
                                <h3 className="text-white text-lg font-semibold mb-5">
                                    {language === "tr" ? "İletişim" : "Contact Us"}
                                </h3>
                                <ul className="space-y-3 text-gray-300 text-sm">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span>
                                            DGD Global Teknoloji A.Ş.<br />
                                            {language === "tr"
                                                ? "İkitelli OSB Mahallesi"
                                                : "İkitelli OSB District"}
                                            <br />
                                            {language === "tr"
                                                ? "Masko Sanayi 5B Blok No: 28"
                                                : "Masko Industrial 5B Block No: 28"}
                                            <br />
                                            {language === "tr" ? "Başakşehir / İstanbul" : "Başakşehir / Istanbul"}
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <span>+90 (212) 123 45 67</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>info@dgdglobal.com.tr</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Footer Bottom */}
                        <div className="text-center text-gray-400 text-xs border-t border-gray-700 pt-6">
                            © {currentYear} DGD Global. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements & Particle Effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Additional star particles */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                        animation: `twinkle ${2 + Math.random() * 3}s ${Math.random() * 5}s infinite`
                    }}
                />
            ))}

            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    50% { opacity: 0.8; transform: scale(1.3); }
                }
            `}</style>
        </div>
    );
};

export default UnifiedFooter;