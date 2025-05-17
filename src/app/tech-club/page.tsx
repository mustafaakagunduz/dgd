"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { getApprovedEssays, Essay } from '@/lib/essays';
import EssayCard from "@/components/tech-club/EssayCard";
import AddEssayCard from "@/components/tech-club/AddEssayCard";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { testSupabaseConnection } from '@/lib/supabase';

// Placeholder makale kartı - veri yüklenirken veya hata durumunda gösterilir
const PlaceholderCard = () => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg h-full animate-pulse">
        <div className="h-48 w-full bg-gray-700"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
    </div>
);

// Auth bilgisini ayrı component olarak yönetiyoruz
const AuthAwareAddEssay = ({ onEssayCreated }: { onEssayCreated?: () => void }) => {
    const { isLoggedIn, currentUser, loading: authLoading } = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Auth yüklendikten sonra bileşeni göster
        if (!authLoading) {
            // Kısa bir gecikme ekleyerek daha düzgün bir geçiş sağla
            const timer = setTimeout(() => setIsReady(true), 100);
            return () => clearTimeout(timer);
        }
    }, [authLoading]);

    // Auth işlemi devam ederken basit bir placeholder göster
    if (!isReady) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-300 w-full h-[200px] flex items-center justify-center">
                <div className="text-white text-opacity-70">Yükleniyor...</div>
            </div>
        );
    }

    // Auth yüklendikten sonra gerçek componenti göster
    return <AddEssayCard onEssayCreated={onEssayCreated} />;
};

const TechClubPage = () => {
    const { t } = useLanguage();
    const [essays, setEssays] = useState<Essay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);

    // Önce bağlantıyı kontrol et
    useEffect(() => {
        const checkConnection = async () => {
            try {
                const isConnected = await testSupabaseConnection();
                setConnectionStatus(isConnected);
                console.log('Supabase bağlantı durumu:', isConnected ? 'Bağlı' : 'Bağlantı hatası');
            } catch (error) {
                console.error('Bağlantı kontrolü sırasında hata:', error);
                setConnectionStatus(false);
            }
        };

        checkConnection();
    }, []);

    // Makaleleri yükle
    const loadEssays = useCallback(async () => {
        try {
            console.log('Makaleler yükleniyor...');
            setLoading(true);
            setError(null);

            const approvedEssays = await getApprovedEssays();

            console.log(`${approvedEssays.length} makale başarıyla yüklendi`);
            setEssays(approvedEssays);
        } catch (error) {
            console.error('Makaleleri yüklerken hata:', error);
            setError('Makaleleri yüklerken bir sorun oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Component mount olduğunda ve bağlantı durumu değiştiğinde içeriği yükle
    useEffect(() => {
        // Bağlantı durumu biliniyorsa ve bağlı ise makaleleri yükle
        if (connectionStatus === true) {
            loadEssays();
        }
        // Bağlantı durumu biliniyorsa ve bağlı değilse hata mesajı göster
        else if (connectionStatus === false) {
            setError('Veritabanına bağlanılamadı. Lütfen internet bağlantınızı kontrol edin ve sayfayı yenileyin.');
            setLoading(false);
        }
        // Bağlantı durumu henüz bilinmiyorsa bekle
    }, [connectionStatus, loadEssays]);

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

    // Bağlantı kontrolü yapılıyor
    if (connectionStatus === null) {
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

                {/* Bağlantı kontrolü yapılıyor ekranı */}
                <div className="container mx-auto px-4 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <div className="text-white text-xl">Bağlantı kontrol ediliyor...</div>
                    </div>
                </div>
            </div>
        );
    }

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

            {/* Essays Grid - Loading veya error durumuna göre farklı içerikler göster */}
            <div className="container mx-auto px-4">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <PlaceholderCard key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="py-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-yellow-400 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="text-white text-xl mb-4">{error}</div>
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    setError(null);
                                    // Bağlantıyı yeniden kontrol et ve makaleleri yükle
                                    testSupabaseConnection().then(isConnected => {
                                        setConnectionStatus(isConnected);
                                        if (isConnected) {
                                            loadEssays();
                                        } else {
                                            setError('Veritabanına bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
                                            setLoading(false);
                                        }
                                    });
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300"
                            >
                                Yeniden Dene
                            </button>
                        </div>
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
                            <div className="col-span-full text-center py-8">
                                <p className="text-white text-lg">Henüz makale bulunmamaktadır.</p>
                                <p className="text-gray-300 mt-2">
                                    İlk makaleyi yazmak için "Makale Oluştur" butonuna tıklayabilirsiniz.
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Add Essay Section - Auth durumundan bağımsız bir şekilde yükle */}
                <div className="mt-16">
                    <AuthAwareAddEssay onEssayCreated={loadEssays} />
                </div>
            </div>
        </div>
    );
};

export default TechClubPage;