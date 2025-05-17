"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface BioCircCardProps {
  imageSrc: string;
  imageAlt: string;
}

const BioCircCard: React.FC<BioCircCardProps> = ({ imageSrc, imageAlt }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-xl hover:shadow-green-500/20 transition-all duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Image */}
        <div className="relative h-64 md:h-full min-h-[300px] w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-transparent opacity-60" />
        </div>
        
        {/* Right side - Content */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-green-500/30 pb-4">
            {t("bioCircularProcess.title")}
          </h2>
          
          <p className="text-gray-200 leading-relaxed text-base md:text-lg">
            {t("bioCircularProcess.description")}
          </p>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/40 text-green-300 border border-green-500/20">
                {t("bioCircularProcess.tags.circular")}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-500/20">
                {t("bioCircularProcess.tags.innovative")}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-500/20">
                {t("bioCircularProcess.tags.sustainable")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BioCircCard;