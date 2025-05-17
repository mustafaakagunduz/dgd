"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { getStaticHomeData } from "@/lib/static-data";

// Resim verilerini bir sabit olarak tutuyoruz
const aboutImages = [
    {
        imageSrc: "/assets/images/dongusellik.png",
        altText: "Döngüsellik"
    },
    {
        imageSrc: "/assets/images/inovasyon.png",
        altText: "İnovasyon"
    },
    {
        imageSrc: "/assets/images/cozum-ortakligi.png",
        altText: "Çözüm Ortaklığı"
    }
];

const About: React.FC = () => {
    const { language, t } = useLanguage();
    const [expandedItems, setExpandedItems] = useState<boolean[]>([false, false, false]);
    const [content, setContent] = useState({
        sectionDescription: "",
        items: [] as {title: string, content: string}[]
    });
    const [mounted, setMounted] = useState(false);

    // Dil değiştiğinde içeriği güncelle
    useEffect(() => {
        setMounted(true);
        const data = getStaticHomeData(language as 'tr' | 'en');
        setContent({
            sectionDescription: data.about.sectionDescription,
            items: data.about.items
        });
    }, [language]);

    const toggleExpansion = (index: number) => {
        setExpandedItems(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    // Memoized text truncation
    const truncateText = useMemo(() => (text: string, maxLength: number) => {
        if (text.length <= maxLength) return { truncated: text, hasMore: false };

        const truncated = text.substr(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        const finalText = lastSpace > 0 ? truncated.substr(0, lastSpace) : truncated;

        return { truncated: finalText, hasMore: true };
    }, []);

    // Hydration mismatch önlemek için
    if (!mounted) {
        return null;
    }

    return (
        <section
            className="py-20"
            style={{
                background: 'linear-gradient(to bottom, #4b8224, #374151, #000000)'
            }}
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-white text-2xl font-bold max-w-full mx-auto">
                        {content.sectionDescription}
                    </p>
                </div>

                {/* Three Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {content.items.map((item, index) => {
                        const { truncated, hasMore } = truncateText(item.content, 300);
                        const isExpanded = expandedItems[index];
                        const imageData = aboutImages[index] || {
                            imageSrc: "/assets/images/placeholder.png",
                            altText: "Placeholder"
                        };

                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-green-800/80 to-green-900/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 shadow-lg border border-green-600/30"
                            >
                                {/* Image with priority loading for above-fold content */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={imageData.imageSrc}
                                        alt={imageData.altText}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0} // İlk resim için priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent opacity-60" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-4 flex justify-center">
                                        {item.title}
                                    </h3>

                                    <div className="relative">
                                        <div className="overflow-hidden transition-all duration-500 ease-in-out">
                                            <p className="text-gray-100 leading-relaxed">
                                                {isExpanded ? item.content : truncated}
                                                {hasMore && !isExpanded && <span className="text-green-400 ml-1">...</span>}
                                            </p>
                                        </div>

                                        {hasMore && (
                                            <button
                                                onClick={() => toggleExpansion(index)}
                                                className="mt-4 flex items-center justify-center w-full py-2 text-green-400 hover:text-green-300 transition-all duration-300 group"
                                                aria-label={isExpanded ? "Daha az göster" : "Daha fazla göster"}
                                            >
                                                <span className="mr-2 transform transition-transform duration-300 group-hover:translate-x-1">
                                                    {isExpanded ? t("about.showLess") : t("about.showMore")}
                                                </span>
                                                <div className="transform transition-transform duration-300 group-hover:translate-y-1">
                                                    {isExpanded ?
                                                        <ChevronUp
                                                            size={20}
                                                            className="transform transition-transform duration-300"
                                                            style={{
                                                                transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'
                                                            }}
                                                        /> :
                                                        <ChevronDown
                                                            size={20}
                                                            className="transform transition-transform duration-300"
                                                            style={{
                                                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                                            }}
                                                        />
                                                    }
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;