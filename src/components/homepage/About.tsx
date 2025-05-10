"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface AboutItem {
    imageSrc: string;
    titleKey: string;
    contentKey: string;
    altText: string;
}

const aboutItems: AboutItem[] = [
    {
        imageSrc: "/assets/images/dongusellik.png",
        titleKey: "about.circulation.title",
        contentKey: "about.circulation.content",
        altText: "Döngüsellik"
    },
    {
        imageSrc: "/assets/images/inovasyon.png",
        titleKey: "about.innovation.title",
        contentKey: "about.innovation.content",
        altText: "İnovasyon"
    },
    {
        imageSrc: "/assets/images/cozum-ortakligi.png",
        titleKey: "about.partnership.title",
        contentKey: "about.partnership.content",
        altText: "Çözüm Ortaklığı"
    }
];

export default function About() {
    const { t } = useLanguage();
    const [expandedItems, setExpandedItems] = useState<boolean[]>([false, false, false]);

    const toggleExpansion = (index: number) => {
        setExpandedItems(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return { truncated: text, hasMore: false };

        // Kelime sınırlarını koruyarak kes
        const truncated = text.substr(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        const finalText = lastSpace > 0 ? truncated.substr(0, lastSpace) : truncated;

        return { truncated: finalText, hasMore: true };
    };

    return (
        <section
            className="py-20"
            style={{
                background: 'linear-gradient(to bottom, #4b8224, #374151, #000000)'
            }}
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-white text-2xl font-bold max-w-full mx-auto">
                        {t("about.sectionDescription")}
                    </p>
                </div>

                {/* Three Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {aboutItems.map((item, index) => {
                        const content = t(item.contentKey);
                        const { truncated, hasMore } = truncateText(content, 300);
                        const isExpanded = expandedItems[index];

                        return (
                            <div
                                key={item.titleKey}
                                className="bg-gradient-to-br from-green-800/80 to-green-900/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 border border-green-600/30"
                            >
                                {/* Image */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.altText}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent opacity-60" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-4 flex justify-center">
                                        {t(item.titleKey)}
                                    </h3>

                                    <div className="relative">
                                        <div className="overflow-hidden transition-all duration-500 ease-in-out">
                                            <p className="text-gray-100 leading-relaxed">
                                                {isExpanded ? content : truncated}
                                                {hasMore && !isExpanded && <span className="text-green-400 ml-1">...</span>}
                                            </p>
                                        </div>

                                        {hasMore && (
                                            <button
                                                onClick={() => toggleExpansion(index)}
                                                className="mt-4 flex items-center justify-center w-full py-2 text-green-400 hover:text-green-300 transition-all duration-300 group"
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
}