"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// İkonlar için basit SVG componentleri
const EyeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

// Ana component
const VisionMissionPage: React.FC = () => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 50,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header section */}
      <div className="text-center pt-24 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">{t('visionMission.pageTitle')}</h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          {t('visionMission.pageDescription')}
        </p>
      </div>

      {/* Cards Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 max-w-6xl"
      >
        {/* Vision Card */}
        <motion.div 
          variants={cardVariants}
          className="relative overflow-hidden"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 h-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-800/30 rounded-lg text-green-400 flex-shrink-0">
                <EyeIcon />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{t('visionMission.vision.title')}</h2>
                <div className="w-20 h-1 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed text-[16px]">
              {t('visionMission.vision.content')}
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300"></div>
          </div>
        </motion.div>

        {/* Mission Card */}
        <motion.div 
          variants={cardVariants}
          className="relative overflow-hidden"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 h-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-800/30 rounded-lg text-green-400 flex-shrink-0">
                <TargetIcon />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{t('visionMission.mission.title')}</h2>
                <div className="w-20 h-1 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed text-[16px]">
              {t('visionMission.mission.content')}
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VisionMissionPage;