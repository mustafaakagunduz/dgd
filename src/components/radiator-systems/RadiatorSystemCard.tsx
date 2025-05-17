"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface RadiatorSystemCardProps {
  imageSrc: string;
  imageAlt: string;
}

const RadiatorSystemCard: React.FC<RadiatorSystemCardProps> = ({ imageSrc, imageAlt }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-xl hover:shadow-orange-500/20 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image (kare resim için daha iyi uyum) */}
        <div className="relative w-full md:w-1/3 h-64 md:h-auto md:aspect-square overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/40 to-transparent opacity-60" />
        </div>
        
        {/* Right side - Content */}
        <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-orange-500/30 pb-4">
            {t("radiatorSystems.title")}
          </h2>
          
          <p className="text-gray-200 leading-relaxed text-base md:text-lg">
            {t("radiatorSystems.description")}
          </p>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-900/40 text-orange-300 border border-orange-500/20">
                {t("radiatorSystems.tags.energyEfficient")}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/40 text-red-300 border border-red-500/20">
                {t("radiatorSystems.tags.fastHeating")}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-900/40 text-amber-300 border border-amber-500/20">
                {t("radiatorSystems.tags.noWater")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RadiatorSystemCard;