"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import EssayList from '../../../components/my-articles/EssayList';

const MyArticlesPage = () => {
    const { t } = useLanguage();

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="min-h-screen py-20"
        >
            <div className="container mx-auto px-4 max-w-6xl space-y-8">
                {/* Header */}
                <motion.div
                    variants={fadeInUp}
                    className="text-center"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t("myArticles.title")}
                    </h1>
                    <p className="text-gray-200">
                        {t("myArticles.description")}
                    </p>
                </motion.div>

                {/* EssayList Component */}
                <motion.div variants={fadeInUp}>
                    <EssayList />
                </motion.div>

                {/* Back Button */}
                <motion.div
                    variants={fadeInUp}
                    className="text-center"
                >
                    <a
                        href="/tech-club"
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
                        {t("myArticles.backToArticles")}
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MyArticlesPage;