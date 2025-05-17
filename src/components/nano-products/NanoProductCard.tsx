"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface NanoProductCardProps {
  imageSrc: string;
  imageAlt: string;
}

const NanoProductCard: React.FC<NanoProductCardProps> = ({ imageSrc, imageAlt }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent opacity-60" />
        </div>
        
        {/* Right side - Content */}
        <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-blue-500/30 pb-4">
            {t("nanoProducts.title")}
          </h2>
          
          <p className="text-gray-200 leading-relaxed text-base md:text-lg">
            {t("nanoProducts.description")}
          </p>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-500/20">
                {t("nanoProducts.tags.bioIsolation")}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/40 text-green-300 border border-green-500/20">
                {t("nanoProducts.tags.bioPolymer")}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-500/20">
                {t("nanoProducts.tags.bioCement")}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/40 text-cyan-300 border border-cyan-500/20">
                {t("nanoProducts.tags.bioGlass")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NanoProductCard;