"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import RadiatorSystemCard from '@/components/radiator-systems/RadiatorSystemCard';
import Link from 'next/link';

// Not: Client component'larda metadata export edilemez
// Metadata için ayrı bir metadata.ts dosyası oluşturuldu

export default function RadiatorSystemsPage() {
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
            {t("radiatorSystems.pageTitle")}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
            {t("radiatorSystems.pageDescription")}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={fadeInUp} className="mb-16">
          <RadiatorSystemCard 
            imageSrc="/assets/images/radiator-systems.jpg" 
            imageAlt={t("radiatorSystems.imageAlt")}
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Feature 1 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-orange-500/30 hover:bg-white/10">
            <div className="w-12 h-12 bg-orange-800/40 rounded-full flex items-center justify-center mb-4 border border-orange-500/20">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("radiatorSystems.features.efficiency.title")}</h3>
            <p className="text-gray-300">{t("radiatorSystems.features.efficiency.description")}</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-orange-500/30 hover:bg-white/10">
            <div className="w-12 h-12 bg-red-800/40 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("radiatorSystems.features.installation.title")}</h3>
            <p className="text-gray-300">{t("radiatorSystems.features.installation.description")}</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-orange-500/30 hover:bg-white/10">
            <div className="w-12 h-12 bg-amber-800/40 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("radiatorSystems.features.materials.title")}</h3>
            <p className="text-gray-300">{t("radiatorSystems.features.materials.description")}</p>
          </div>
        </motion.div>

        {/* Applications Section */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/20 pb-4">
              {t("radiatorSystems.applications.title")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Application 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t("radiatorSystems.applications.residential.title")}</h3>
                  <p className="text-gray-300">{t("radiatorSystems.applications.residential.description")}</p>
                </div>
              </div>
              
              {/* Application 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t("radiatorSystems.applications.commercial.title")}</h3>
                  <p className="text-gray-300">{t("radiatorSystems.applications.commercial.description")}</p>
                </div>
              </div>
              
              {/* Application 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t("radiatorSystems.applications.industrial.title")}</h3>
                  <p className="text-gray-300">{t("radiatorSystems.applications.industrial.description")}</p>
                </div>
              </div>
              
              {/* Application 4 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t("radiatorSystems.applications.retrofit.title")}</h3>
                  <p className="text-gray-300">{t("radiatorSystems.applications.retrofit.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          variants={fadeInUp}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-400 hover:to-red-500 transition-all duration-300 transform hover:scale-105"
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
            {t("radiatorSystems.backButton")}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}