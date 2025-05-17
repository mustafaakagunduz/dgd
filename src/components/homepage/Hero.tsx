"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { getStaticHomeData } from "@/lib/static-data";

interface HeroProps {
    initialData?: {
        title: string;
        description: string;
    };
}

export default function Hero({ initialData }: HeroProps) {
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [content, setContent] = useState({
        title: initialData?.title || "",
        description: initialData?.description || ""
    });

    useEffect(() => {
        setMounted(true);

        // Only fetch data if initialData is not provided
        if (!initialData) {
            const data = getStaticHomeData(language as 'tr' | 'en');
            setContent({
                title: data.hero.title,
                description: data.hero.description
            });
        }

        // Component yüklendikten kısa bir süre sonra animasyonu başlat
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [language, initialData]);

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
                        {content.title}
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                        {content.description}
                    </p>
                </div>
            </div>
        </div>
    );
}