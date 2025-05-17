// src/contexts/LanguageContext.tsx (güncelleme)
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Language = "en" | "tr";
type Translations = Record<string, any>;

interface LanguageContextType {
    language: Language;
    translations: Translations;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isLoading: boolean; // İsLoading durumunu ekleyelim
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>("tr");
    const [translations, setTranslations] = useState<Translations>({});
    const [isLoading, setIsLoading] = useState(true);

    // Handle localStorage - must be in useEffect due to SSR
    useEffect(() => {
        try {
            const savedLanguage = localStorage.getItem("language") as Language;
            if (savedLanguage && (savedLanguage === "en" || savedLanguage === "tr")) {
                setLanguage(savedLanguage);
            }
        } catch (error) {
            console.error("Error accessing localStorage:", error);
        }
    }, []);

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                setIsLoading(true);
                // Preload edilmiş çevirileri kullanmak için
                const response = await fetch(`/locales/${language}.json`, {
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to load translations: ${response.status}`);
                }

                const data = await response.json();
                setTranslations(data);

                try {
                    localStorage.setItem("language", language);
                } catch (error) {
                    console.error("Error saving to localStorage:", error);
                }
            } catch (error) {
                console.error("Failed to load translations:", error);
                setTranslations({});
            } finally {
                // Çok kısa bir gecikme ekleyelim ki kullanıcı arayüzü kendini toparlayabilsin
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        };

        loadTranslations();
    }, [language]);

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
    };

    // Translation function with improved error handling
    const t = (key: string): string => {
        if (!key) return "";

        const keys = key.split(".");
        let result = translations;

        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key; // Return key as fallback
            }
        }

        return typeof result === "string" ? result : key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                translations,
                setLanguage: changeLanguage,
                t,
                isLoading
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};