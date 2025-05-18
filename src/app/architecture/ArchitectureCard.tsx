// src/components/architecture/ArchitectureCard.tsx
"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArchitectureCardProps {
    translationKey: string;
    imagePath: string;
}

const ArchitectureCard: React.FC<ArchitectureCardProps> = ({
                                                               translationKey,
                                                               imagePath
                                                           }) => {
    const { t } = useLanguage();

    // Placeholder image URL - herhangi bir sorun olursa kullanılacak
    const placeholderImage = "https://via.placeholder.com/400x300/4b8224/FFFFFF?text=Architecture";

    return (
        <div className="cursor-pointer transition-all duration-300 h-full">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:border-blue-500/50 transition-all duration-300 h-full">
                {/* Basit resim kısmı */}
                <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
                    {/* Daha basit bir Image kullanımı, görüntü yoksa hata gösterme */}
                    <div className="relative h-full w-full">
                        <img
                            src={imagePath || placeholderImage}
                            alt={t(translationKey)}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                                // Resim yüklenemezse placeholder'a yönlendir
                                e.currentTarget.src = placeholderImage;
                            }}
                        />
                    </div>

                    {/* Gradient overlay - saydamlığı artırıldı */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-black/10 to-transparent" />
                </div>

                {/* Title */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white text-center hover:text-blue-400 transition-colors duration-300">
                        {t(translationKey)}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureCard;