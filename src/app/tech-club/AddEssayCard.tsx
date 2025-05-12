"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const AddEssayCard = () => {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300 w-full"
        >
            <div className="flex flex-col items-center space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-white">
                    {t("addEssay.title")}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-base">
                    {t("addEssay.description")}
                </p>

                {/* Add Button */}
                <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
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
                            d="M15.232 5.232l3.536 3.536M9 11l3 3 6-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    {t("addEssay.button")}
                </button>
            </div>
        </motion.div>
    );
};

export default AddEssayCard;