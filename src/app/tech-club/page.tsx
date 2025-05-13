"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { getApprovedEssays } from '@/lib/essays';
import EssayCard from "@/components/tech-club/EssayCard";
import AddEssayCard from "@/components/tech-club/AddEssayCard";
import { useLanguage } from '@/contexts/LanguageContext';

const TechClubPage = () => {
    const { t } = useLanguage();
    const approvedEssays = getApprovedEssays(); // Sadece onaylanmış makaleleri al

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen py-20">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {t("techClub.title")}
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto px-4">
                    {t("techClub.description")}
                </p>
            </div>

            {/* Essays Grid */}
            <div className="container mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {approvedEssays.map((essay, index) => (
                        <EssayCard
                            key={essay.id}
                            essay={essay}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* Add Essay Section */}
                <div className="mt-16">
                    <AddEssayCard />
                </div>
            </div>
        </div>
    );
};

export default TechClubPage;