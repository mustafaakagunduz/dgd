"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import BioCircCard from '@/components/bio-circ-process/BioCircCard';
import Link from 'next/link';

// Not: Client component'larda metadata export edilemez
// Metadata için ayrı bir metadata.ts dosyası oluşturulmalı

export default function BioCircularProcessPage() {
  const { t } = useLanguage();
  
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen py-32"
      style={{
        background: 'linear-gradient(to bottom, #4b8224, #374151, #000000)'
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("bioCircularProcess.pageTitle")}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
            {t("bioCircularProcess.pageDescription")}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={fadeInUp} className="mb-16">
          <BioCircCard 
            imageSrc="/assets/images/bio-circular-process.jpg" 
            imageAlt={t("bioCircularProcess.imageAlt")}
          />
        </motion.div>

        {/* Additional Info Panels */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Panel 1 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-green-500/30 hover:bg-white/10">
            <div className="w-12 h-12 bg-green-800/40 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("bioCircularProcess.advantages.noProcessing.title")}</h3>
            <p className="text-gray-300">{t("bioCircularProcess.advantages.noProcessing.description")}</p>
          </div>
          
          {/* Panel 2 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-green-500/30 hover:bg-white/10">
            <div className="w-12 h-12 bg-blue-800/40 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("bioCircularProcess.advantages.efficiency.title")}</h3>
            <p className="text-gray-300">{t("bioCircularProcess.advantages.efficiency.description")}</p>
          </div>
          
          {/* Panel 3 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-green-500/30 hover:bg-white/10">
            <div className="w-12 h-12 bg-purple-800/40 rounded-full flex items-center justify-center mb-4 border border-purple-500/20">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("bioCircularProcess.advantages.scalable.title")}</h3>
            <p className="text-gray-300">{t("bioCircularProcess.advantages.scalable.description")}</p>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          variants={fadeInUp}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("bioCircularProcess.backButton")}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}