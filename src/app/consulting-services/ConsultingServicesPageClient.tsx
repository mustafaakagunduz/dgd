"use client";

import React from 'react';
import ConsultingCard from "@/components/consulting-services/ConsultingCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from 'framer-motion';

// Client-side component with translations
export default function ConsultingServicesPageClient() {
  const { t } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Consulting categories with image paths
  const consultingCategories = [
    {
      key: "consultingServices.categories.sustainabilityReports",
      imagePath: "/assets/images/consulting/sustainability-reports.jpg"
    },
    {
      key: "consultingServices.categories.environmentalImpact",
      imagePath: "/assets/images/consulting/environmental-impact.jpg"
    },
    {
      key: "consultingServices.categories.qualityManagement",
      imagePath: "/assets/images/consulting/quality-management.jpg"
    },
    {
      key: "consultingServices.categories.informationTechnology",
      imagePath: "/assets/images/consulting/information-technology.jpg"
    },
    {
      key: "consultingServices.categories.communicationConsulting",
      imagePath: "/assets/images/consulting/communication-consulting.jpg"
    }
  ];

  return (
    <div 
      className="min-h-screen py-20"
      style={{
        background: 'linear-gradient(to bottom, #4b8224, #374151, #000000)'
      }}
    >
      {/* Header Section with translations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="mt-8 text-3xl md:text-4xl font-bold text-white text-center mb-6">
          {t("consultingServices.title")}
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto px-4">
          {t("consultingServices.description")}
        </p>
      </motion.div>

      {/* Cards Grid with specific layout (3 in top row, 2 in bottom row) */}
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 md:gap-8"
        >
          {/* Top row - 3 cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto w-full"
          >
            {consultingCategories.slice(0, 3).map((category, index) => (
              <ConsultingCard
                key={index}
                translationKey={category.key}
                imagePath={category.imagePath}
              />
            ))}
          </motion.div>

          {/* Bottom row - 2 cards centered */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto w-full"
          >
            {consultingCategories.slice(3, 5).map((category, index) => (
              <ConsultingCard
                key={index + 3}
                translationKey={category.key}
                imagePath={category.imagePath}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}