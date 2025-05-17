"use client";

import React from 'react';
import ConstructionCard from "@/components/construction/ConstructionCard";
import { useLanguage } from "@/contexts/LanguageContext";

// Client-side component with translations
export default function ConstructionPageClient() {
  const { t } = useLanguage();

  // Construction categories with image paths
  const constructionCategories = [
    {
      key: "construction.categories.buildingConstruction",
      imagePath: "/assets/images/construction/building-construction.jpg"
    },
    {
      key: "construction.categories.infrastructure",
      imagePath: "/assets/images/construction/infrastructure.jpg"
    },
    {
      key: "construction.categories.industrialFacilities",
      imagePath: "/assets/images/construction/industrial-facilities.jpg"
    },
    {
      key: "construction.categories.urbanRenewal",
      imagePath: "/assets/images/construction/urban-renewal.jpg"
    },
    {
      key: "construction.categories.landscaping",
      imagePath: "/assets/images/construction/landscaping.jpg"
    },
    {
      key: "construction.categories.transportation",
      imagePath: "/assets/images/construction/transportation.jpg"
    },
    {
      key: "construction.categories.specializedSolutions",
      imagePath: "/assets/images/construction/specialized-solutions.jpg"
    },
    {
      key: "construction.categories.mechanicalSystems",
      imagePath: "/assets/images/construction/mechanical-systems.jpg"
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
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t("construction.title")}
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto px-4">
          {t("construction.description")}
        </p>
      </div>

      {/* Cards Grid without animations */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {constructionCategories.map((category, index) => (
            <ConstructionCard
              key={index}
              translationKey={category.key}
              imagePath={category.imagePath}
            />
          ))}
        </div>
      </div>
    </div>
  );
}