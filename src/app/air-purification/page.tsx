"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import AirPurificationCard from '@/components/air-purification/AirPurificationCard';
import Link from 'next/link';

// Not: Client component'larda metadata export edilemez
// Metadata için ayrı bir metadata.ts dosyası oluşturuldu

export default function AirPurificationPage() {
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
            {t("airPurification.pageTitle")}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
            {t("airPurification.pageDescription")}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={fadeInUp} className="mb-16">
          <AirPurificationCard 
            imageSrc="/assets/images/air-purification.jpg" 
            imageAlt={t("airPurification.imageAlt")}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={fadeInUp} className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-6 border border-blue-500/20 text-center hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t("airPurification.stats.hourlyCapacity.title")}</h3>
            <div className="text-blue-300 text-3xl font-bold mb-2">450 m³</div>
            <p className="text-gray-300 text-sm">{t("airPurification.stats.hourlyCapacity.description")}</p>
          </div>
          
          {/* Stat 2 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-6 border border-blue-500/20 text-center hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t("airPurification.stats.largeArea.title")}</h3>
            <div className="text-blue-300 text-3xl font-bold mb-2">4500 m²</div>
            <p className="text-gray-300 text-sm">{t("airPurification.stats.largeArea.description")}</p>
          </div>
          
          {/* Stat 3 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-6 border border-blue-500/20 text-center hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t("airPurification.stats.purification.title")}</h3>
            <div className="text-blue-300 text-3xl font-bold mb-2">100%</div>
            <p className="text-gray-300 text-sm">{t("airPurification.stats.purification.description")}</p>
          </div>
          
          {/* Stat 4 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-6 border border-blue-500/20 text-center hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t("airPurification.stats.performance.title")}</h3>
            <div className="text-blue-300 text-3xl font-bold mb-2">100%</div>
            <p className="text-gray-300 text-sm">{t("airPurification.stats.performance.description")}</p>
          </div>
        </motion.div>

        {/* Applications Section */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {t("airPurification.applications.title")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Application 1 */}
              <div className="bg-blue-900/10 rounded-xl p-6 border border-blue-500/20 hover:bg-blue-900/20 transition-all duration-300 hover:border-blue-400/40">
                <div className="text-blue-400 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t("airPurification.applications.indoor.title")}</h3>
                <p className="text-gray-300">{t("airPurification.applications.indoor.description")}</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.indoor.items.offices")}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.indoor.items.hospitals")}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.indoor.items.schools")}
                  </li>
                </ul>
              </div>
              
              {/* Application 2 */}
              <div className="bg-blue-900/10 rounded-xl p-6 border border-blue-500/20 hover:bg-blue-900/20 transition-all duration-300 hover:border-blue-400/40">
                <div className="text-blue-400 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t("airPurification.applications.industrial.title")}</h3>
                <p className="text-gray-300">{t("airPurification.applications.industrial.description")}</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.industrial.items.factories")}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.industrial.items.warehouses")}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.industrial.items.foodProcessing")}
                  </li>
                </ul>
              </div>
              
              {/* Application 3 */}
              <div className="bg-blue-900/10 rounded-xl p-6 border border-blue-500/20 hover:bg-blue-900/20 transition-all duration-300 hover:border-blue-400/40">
                <div className="text-blue-400 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t("airPurification.applications.agriculture.title")}</h3>
                <p className="text-gray-300">{t("airPurification.applications.agriculture.description")}</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.agriculture.items.fruitProduction")}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.agriculture.items.greenhouses")}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("airPurification.applications.agriculture.items.storage")}
                  </li>
                </ul>
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
            href="/faaliyet-alanlarimiz"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
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
            {t("airPurification.backButton")}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}