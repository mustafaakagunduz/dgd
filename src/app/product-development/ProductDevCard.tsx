"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductDevRDCardProps {
    imageSrc: string;
    name: string;
    title: string;
    bio: string;
    showMore: string;
    showLess: string;
}

const ProductDevRDCard = ({ imageSrc, name, title, bio, showMore, showLess }: ProductDevRDCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return { truncated: text, hasMore: false };
        // Kelime sınırlarını koruyarak kes
        const truncated = text.substr(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        const finalText = lastSpace > 0 ? truncated.substr(0, lastSpace) : truncated;
        return { truncated: finalText, hasMore: true };
    };

    const { truncated, hasMore } = truncateText(bio, 150); // Bio için 150 karakter limiti

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative h-80 w-full">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300"
                />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                <p className="text-md text-green-300 mb-4">{title}</p>
                <div className="relative">
                    <div className="overflow-hidden transition-all duration-500 ease-in-out">
                        <p className="text-gray-300 text-base leading-relaxed">
                            {isExpanded ? bio : truncated}
                            {hasMore && !isExpanded && <span className="text-green-400 ml-1">...</span>}
                        </p>
                    </div>
                    {hasMore && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-4 flex items-center justify-center w-full py-2 text-green-400 hover:text-green-300 transition-all duration-300 group"
                        >
                            <span className="mr-2 transform transition-transform duration-300 group-hover:translate-x-1">
                                {isExpanded ? showLess : showMore}
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
};

export default ProductDevRDCard;