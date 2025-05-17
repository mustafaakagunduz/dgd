"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { getApprovedEssays, Essay } from '@/lib/essays';
import EssayCard from "@/components/tech-club/EssayCard";
import AddEssayCard from "@/components/tech-club/AddEssayCard";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

// Auth bilgisini ayrı bir component olarak yönetiyoruz
// Bu sayede auth yüklenmesi ana içeriği bloke etmiyor
const AuthAwareAddEssay = () => {
    const { isLoggedIn, currentUser, loading: authLoading } = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Auth yüklendikten sonra bileşeni göster
        if (!authLoading) {
            setIsReady(true);
        }
    }, [authLoading]);

    // Auth işlemi devam ederken basit bir placeholder göster
    if (!isReady) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-300 w-full min-h-[200px] flex items-center justify-center">
                <div className="text-white text-opacity-70">Yükleniyor...</div>
            </div>
        );
    }

    // Auth yüklendikten sonra gerçek componenti göster
    return <AddEssayCard />;
};

const TechClubPage = () => {
    const { t } = useLanguage();
    const [essays, setEssays] = useState<Essay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useCallback ile memoize edilmiş essays yükleme fonksiyonu
    const loadEssays = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            console.log("Fetching approved essays...");
            const approvedEssays = await getApprovedEssays();

            console.log(`Fetched ${approvedEssays.length} essays successfully`);
            setEssays(approvedEssays);
        } catch (error) {
            console.error('Error loading essays:', error);
            setError('Makaleleri yüklerken bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Component mount olduğunda içeriği yükle
    useEffect(() => {
        loadEssays();
    }, [loadEssays]);

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                when: "beforeChildren"
            }
        }
    };

    return (
        <div className="min-h-screen py-20">
            {/* Header Section - Her zaman göster */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {t("techClub.title")}
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto px-4">
                    {t("techClub.description")}
                </p>
            </div>

            {/* Essays Grid - Loading durumuna göre farklı içerik göster */}
            <div className="container mx-auto px-4">
                {loading && essays.length === 0 ? (
                    <div className="py-12 flex justify-center">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 border-3 border-green-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                            <div className="text-white">Makaleler yükleniyor...</div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="py-12 text-center">
                        <div className="text-white mb-4">{error}</div>
                        <button
                            onClick={() => loadEssays()}
                            className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300"
                        >
                            Yeniden Dene
                        </button>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {essays.length > 0 ? (
                            essays.map((essay, index) => (
                                <EssayCard
                                    key={essay.id}
                                    essay={essay}
                                    index={index}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-white py-8">
                                <p>Henüz makale bulunmamaktadır.</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Add Essay Section - Auth durumundan bağımsız bir şekilde yükle */}
                <div className="mt-16">
                    <AuthAwareAddEssay />
                </div>
            </div>
        </div>
    );
};

export default TechClubPage;