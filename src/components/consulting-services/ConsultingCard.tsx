"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConsultingCardProps {
  translationKey: string;
  imagePath: string;
}

const ConsultingCard: React.FC<ConsultingCardProps> = ({ 
  translationKey, 
  imagePath 
}) => {
  const { t } = useLanguage();
  
  // Placeholder image URL - herhangi bir sorun olursa kullanılacak
  const placeholderImage = "https://via.placeholder.com/400x300/4b8224/FFFFFF?text=Consulting";

  return (
    <div className="cursor-pointer transition-all duration-300 h-full">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col">
        {/* Kare resim kısmı - aspect ratio 4/3 yaparak daha az uzun hale getirme */}
        <div className="relative h-79 w-full bg-gray-700 overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-black/10 to-transparent" />
        </div>

        {/* Title - flex-grow ile boş alanı doldur */}
        <div className="p-4 flex-grow flex items-center justify-center">
          <h3 className="text-lg font-bold text-white text-center hover:text-purple-400 transition-colors duration-300">
            {t(translationKey)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ConsultingCard;