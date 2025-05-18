"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import AgricultureGreenhouseCard from '@/components/agriculture-greenhouse/AgricultureGreenhouseCard';
import Link from 'next/link';

// Not: Client component'larda metadata export edilemez
// Metadata için ayrı bir metadata.ts dosyası oluşturuldu

export default function AgricultureGreenhousePage() {
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
            {t("agricultureGreenhouse.pageTitle")}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
            {t("agricultureGreenhouse.pageDescription")}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={fadeInUp} className="mb-16">
          <AgricultureGreenhouseCard 
            imageSrc="/assets/images/agriculture-greenhouse.jpg" 
            imageAlt={t("agricultureGreenhouse.imageAlt")}
          />
        </motion.div>

        {/* Benefits Section */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {t("agricultureGreenhouse.benefits.title")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1 */}
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-6 border border-green-500/20 text-center hover:border-green-400/40 transition-all duration-300 hover:bg-green-800/20">
                <div className="w-16 h-16 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t("agricultureGreenhouse.benefits.infrared.title")}</h3>
                <p className="text-gray-300">{t("agricultureGreenhouse.benefits.infrared.description")}</p>
                <div className="mt-4 text-green-400 font-bold text-lg">
                  {t("agricultureGreenhouse.benefits.infrared.stat")}
                </div>
              </div>
              
              {/* Benefit 2 */}
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-6 border border-green-500/20 text-center hover:border-green-400/40 transition-all duration-300 hover:bg-green-800/20">
                <div className="w-16 h-16 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t("agricultureGreenhouse.benefits.productivity.title")}</h3>
                <p className="text-gray-300">{t("agricultureGreenhouse.benefits.productivity.description")}</p>
                <div className="mt-4 text-green-400 font-bold text-lg">
                  {t("agricultureGreenhouse.benefits.productivity.stat")}
                </div>
              </div>
              
              {/* Benefit 3 */}
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-6 border border-green-500/20 text-center hover:border-green-400/40 transition-all duration-300 hover:bg-green-800/20">
                <div className="w-16 h-16 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t("agricultureGreenhouse.benefits.humidity.title")}</h3>
                <p className="text-gray-300">{t("agricultureGreenhouse.benefits.humidity.description")}</p>
                <div className="mt-4 text-green-400 font-bold text-lg">
                  {t("agricultureGreenhouse.benefits.humidity.stat")}
                </div>
              </div>
              
              {/* Benefit 4 */}
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-6 border border-green-500/20 text-center hover:border-green-400/40 transition-all duration-300 hover:bg-green-800/20">
                <div className="w-16 h-16 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14c1 1.5 5 1.5 6 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t("agricultureGreenhouse.benefits.prevention.title")}</h3>
                <p className="text-gray-300">{t("agricultureGreenhouse.benefits.prevention.description")}</p>
                <div className="mt-4 text-green-400 font-bold text-lg">
                  {t("agricultureGreenhouse.benefits.prevention.stat")}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {t("agricultureGreenhouse.comparison.title")}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-900/30 border-b border-white/10">
                    <th className="py-4 px-6 text-left text-white">{t("agricultureGreenhouse.comparison.feature")}</th>
                    <th className="py-4 px-6 text-center text-white">{t("agricultureGreenhouse.comparison.traditional")}</th>
                    <th className="py-4 px-6 text-center text-white bg-green-800/20">{t("agricultureGreenhouse.comparison.our")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-4 px-6 text-white">{t("agricultureGreenhouse.comparison.rows.heating.feature")}</td>
                    <td className="py-4 px-6 text-center text-gray-300">{t("agricultureGreenhouse.comparison.rows.heating.traditional")}</td>
                    <td className="py-4 px-6 text-center text-green-300 bg-green-800/10">{t("agricultureGreenhouse.comparison.rows.heating.our")}</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-4 px-6 text-white">{t("agricultureGreenhouse.comparison.rows.humidity.feature")}</td>
                    <td className="py-4 px-6 text-center text-gray-300">{t("agricultureGreenhouse.comparison.rows.humidity.traditional")}</td>
                    <td className="py-4 px-6 text-center text-green-300 bg-green-800/10">{t("agricultureGreenhouse.comparison.rows.humidity.our")}</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-4 px-6 text-white">{t("agricultureGreenhouse.comparison.rows.mold.feature")}</td>
                    <td className="py-4 px-6 text-center text-gray-300">{t("agricultureGreenhouse.comparison.rows.mold.traditional")}</td>
                    <td className="py-4 px-6 text-center text-green-300 bg-green-800/10">{t("agricultureGreenhouse.comparison.rows.mold.our")}</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-4 px-6 text-white">{t("agricultureGreenhouse.comparison.rows.yield.feature")}</td>
                    <td className="py-4 px-6 text-center text-gray-300">{t("agricultureGreenhouse.comparison.rows.yield.traditional")}</td>
                    <td className="py-4 px-6 text-center text-green-300 bg-green-800/10">{t("agricultureGreenhouse.comparison.rows.yield.our")}</td>
                  </tr>
                </tbody>
              </table>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105"
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
            {t("agricultureGreenhouse.backButton")}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}