"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import NanoProductCard from '@/components/nano-products/NanoProductCard';
import Link from 'next/link';

// Not: Client component'larda metadata export edilemez
// Metadata için ayrı bir metadata.ts dosyası oluşturuldu

export default function NanoProductsPage() {
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
            {t("nanoProducts.pageTitle")}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
            {t("nanoProducts.pageDescription")}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={fadeInUp} className="mb-16">
          <NanoProductCard 
            imageSrc="/assets/images/nano-products.jpg" 
            imageAlt={t("nanoProducts.imageAlt")}
          />
        </motion.div>

        {/* Product Showcase */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Product 1 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10 h-full flex flex-col">
            <div className="w-12 h-12 bg-blue-800/40 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("nanoProducts.products.bioIsolation.title")}</h3>
            <p className="text-gray-300 flex-grow">{t("nanoProducts.products.bioIsolation.description")}</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 rounded-md text-sm font-medium">
                {t("nanoProducts.products.bioIsolation.feature")}
              </span>
            </div>
          </div>
          
          {/* Product 2 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-green-500/30 hover:bg-white/10 h-full flex flex-col">
            <div className="w-12 h-12 bg-green-800/40 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("nanoProducts.products.bioPolymer.title")}</h3>
            <p className="text-gray-300 flex-grow">{t("nanoProducts.products.bioPolymer.description")}</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="inline-block px-3 py-1 bg-green-900/30 text-green-300 rounded-md text-sm font-medium">
                {t("nanoProducts.products.bioPolymer.feature")}
              </span>
            </div>
          </div>
          
          {/* Product 3 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 h-full flex flex-col">
            <div className="w-12 h-12 bg-purple-800/40 rounded-full flex items-center justify-center mb-4 border border-purple-500/20">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("nanoProducts.products.bioCement.title")}</h3>
            <p className="text-gray-300 flex-grow">{t("nanoProducts.products.bioCement.description")}</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 rounded-md text-sm font-medium">
                {t("nanoProducts.products.bioCement.feature")}
              </span>
            </div>
          </div>
          
          {/* Product 4 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/10 h-full flex flex-col">
            <div className="w-12 h-12 bg-cyan-800/40 rounded-full flex items-center justify-center mb-4 border border-cyan-500/20">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{t("nanoProducts.products.bioGlass.title")}</h3>
            <p className="text-gray-300 flex-grow">{t("nanoProducts.products.bioGlass.description")}</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="inline-block px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-md text-sm font-medium">
                {t("nanoProducts.products.bioGlass.feature")}
              </span>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
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
            {t("nanoProducts.backButton")}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}