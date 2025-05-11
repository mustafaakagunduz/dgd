"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface HeroProps {
    // You can add props later if needed
}

export default function Hero({}: HeroProps) {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Component yüklendikten kısa bir süre sonra animasyonu başlat
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-screen">
            <Image
                src="/assets/images/heroimage.jpg"
                alt="Hero Image"
                fill
                priority
                className="object-cover"
            />
            {/* Navbar görünürlüğü için geliştirilmiş overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent h-56 pointer-events-none" />

            {/* Sol üstteki kart - Animasyonlu */}
            <div className="absolute top-32 left-8 md:left-16">
                <div
                    className={`
                        bg-black/50 backdrop-blur-[1px] rounded-lg p-8 md:p-12 max-w-2xl
                        transition-all duration-1000 ease-out
                        ${isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-20'
                    }
                    `}
                >
                    <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
                        {t("hero.title")}
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                        {t("hero.description")}
                    </p>
                </div>
            </div>
        </div>
    );
}