// src/app/architecture/ArchitecturePageClient.tsx
"use client";

import React from 'react';
import ArchitectureCard from "@/app/architecture/ArchitectureCard";
import { useLanguage } from "@/contexts/LanguageContext";

// Client-side component with translations
export default function ArchitecturePageClient() {
    const { t } = useLanguage();

    // Architecture categories with image paths
    const architectureCategories = [
        {
            key: "architecture.categories.buildingDesign",
            imagePath: "/assets/images/architecture/1.jpg"
        },
        {
            key: "architecture.categories.urbanDesign",
            imagePath: "/assets/images/architecture/2.jpg"
        },
        {
            key: "architecture.categories.furnitureDesign",
            imagePath: "/assets/images/architecture/3.jpg"
        },
        {
            key: "architecture.categories.lightingDesign",
            imagePath: "/assets/images/architecture/4.jpg"
        },
        {
            key: "architecture.categories.decoration",
            imagePath: "/assets/images/architecture/5.jpg"
        },
        {
            key: "architecture.categories.restoration",
            imagePath: "/assets/images/architecture/6.jpg"
        },
        {
            key: "architecture.categories.facadeDesign",
            imagePath: "/assets/images/architecture/7.jpg"
        },
        {
            key: "architecture.categories.facadeEngineering",
            imagePath: "/assets/images/architecture/8.jpg"
        },
        {
            key: "architecture.categories.energyEfficiency",
            imagePath: "/assets/images/architecture/9.jpg"
        },
        {
            key: "architecture.categories.facadeSystems",
            imagePath: "/assets/images/architecture/10.jpg"
        },
        {
            key: "architecture.categories.facadeLighting",
            imagePath: "/assets/images/architecture/11.jpg"
        },
        {
            key: "architecture.categories.facadeRestoration",
            imagePath: "/assets/images/architecture/12.jpg"
        },
        {
            key: "architecture.categories.projectManagement",
            imagePath: "/assets/images/architecture/13.jpg"
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
                    {t("architecture.title")}
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto px-4">
                    {t("architecture.description")}
                </p>
            </div>

            {/* Cards Grid without animations */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {architectureCategories.map((category, index) => (
                        <ArchitectureCard
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