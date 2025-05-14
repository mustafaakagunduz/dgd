// src/components/homepage/Hero.tsx
"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface HeroProps {
    // Static props için hazırlık
    initialData?: {
        title?: string;
        description?: string;
    };
}

export default function Hero({ initialData }: HeroProps) {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Component yüklendikten kısa bir süre sonra animasyonu başlat
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Hydration mismatch'i önlemek için mounted kontrolü
    if (!mounted) {
        return (
            <div className="relative w-full h-screen opacity-0">
                <Image
                    src="/assets/images/heroimage.jpg"
                    alt="Hero Image"
                    fill
                    priority
                    className="object-cover"
                />
            </div>
        );
    }

    // Fallback değerler için initial data kullan
    const title = initialData?.title || t("hero.title");
    const description = initialData?.description || t("hero.description");

    return (
        <div className="relative w-full h-screen">
            <Image
                src="/assets/images/heroimage.jpg"
                alt="Hero Image"
                fill
                priority
                className="object-cover"
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAcEQACAQUBAAAAAAAAAAAAAAAAAQIDBBEFITH/2gAMAwEAAhEDEQA/AJvBfkyfrm0eV8/pXdvZeHddGjHCgvhMW8CRCRYyj5y+QPOFfZvh1h2qjKFr9G6ehDCZWgSjp+S5WJYsGHDMPpgAAAAA=="
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
                        {title}
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}