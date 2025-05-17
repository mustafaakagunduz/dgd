// src/components/providers/LoadingOverlay.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoadingOverlay({ children }: { children: React.ReactNode }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const { language } = useLanguage();
    const [isReady, setIsReady] = useState(false);

    // Font yükleme kontrolü
    useEffect(() => {
        // document.fonts API'sini kullanarak fontların yüklendiğini kontrol et
        if (typeof document !== 'undefined' && document.fonts) {
            const checkFonts = async () => {
                try {
                    await document.fonts.ready;
                    setFontsLoaded(true);
                } catch (e) {
                    console.error('Font yükleme hatası:', e);
                    // Hata durumunda bile 3 saniye sonra true yap
                    setTimeout(() => setFontsLoaded(true), 3000);
                }
            };

            checkFonts();
        } else {
            // document.fonts API yoksa timeout ile geç
            setTimeout(() => setFontsLoaded(true), 1000);
        }
    }, []);

    // Dil verilerinin hazır olup olmadığını kontrol et
    useEffect(() => {
        if (language && fontsLoaded) {
            // Hem dil hem fontlar yüklendiyse, isReady'i true yap
            setTimeout(() => setIsReady(true), 300);
        }
    }, [language, fontsLoaded]);

    if (!isReady) {
        return (
            <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white text-lg">Yükleniyor...</p>
            </div>
        );
    }

    return <>{children}</>;
}