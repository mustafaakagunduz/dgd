// src/components/architecture/ArchitectureCard.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { hasSubcategories, architectureSubcategories } from '@/app/architecture/data';

interface ArchitectureCardProps {
    translationKey: string;
    categoryKey: string;
    imagePath: string;
}

type SubcategoriesType = typeof architectureSubcategories;
type CategoryKeyType = keyof SubcategoriesType;

const ArchitectureCard: React.FC<ArchitectureCardProps> = ({
                                                               translationKey,
                                                               categoryKey,
                                                               imagePath
                                                           }) => {
    const { t, language } = useLanguage();
    const [isFlipped, setIsFlipped] = useState(false);
    const [translations, setTranslations] = useState<{[key: string]: string}>({});

    const hasSubcats = hasSubcategories(categoryKey);
    const placeholderImage = "https://via.placeholder.com/400x300/4b8224/FFFFFF?text=Architecture";

    // Çevirileri manuel olarak hazırlayan fonksiyon
    useEffect(() => {
        if (categoryKey in architectureSubcategories) {
            const manualTranslations: {[key: string]: string} = {};

            // Türkçe çeviriler
            if (language === 'tr') {
                manualTranslations["facadeEngineering.subcategories.structuralCalculations"] = "Taşıyıcı Sistem Hesapları";
                manualTranslations["facadeEngineering.subcategories.insulation"] = "Isı, Su ve Ses Yalıtımları";

                manualTranslations["energyEfficiency.subcategories.sunControlSystems"] = "Güneş Kontrol Sistemleri";
                manualTranslations["energyEfficiency.subcategories.smartFacadeSystems"] = "Akıllı Cephe Sistemleri";
                manualTranslations["energyEfficiency.subcategories.naturalVentilation"] = "Doğal Havalandırma ve Işıklandırma";

                manualTranslations["facadeSystems.subcategories.ventilatedFacadeSystems"] = "Havalandırmalı Cephe Sistemleri";
                manualTranslations["facadeSystems.subcategories.glassFacadeSystems"] = "Cam Cephe Sistemleri";
                manualTranslations["facadeSystems.subcategories.prefabFacadeElements"] = "Prefabrik Cephe Elemanları";

                manualTranslations["facadeLighting.subcategories.nightLighting"] = "Gece Aydınlatması";
                manualTranslations["facadeLighting.subcategories.aestheticLighting"] = "Estetik Aydınlatma";

                manualTranslations["facadeRestoration.subcategories.facadeRenovation"] = "Cephe Yenileme";
                manualTranslations["facadeRestoration.subcategories.historicFacadeRestoration"] = "Tarihi Yapı Cephe Restorasyonu";

                manualTranslations["projectManagement.subcategories.projectManagement"] = "Proje Yönetimi";
                manualTranslations["projectManagement.subcategories.materialSupply"] = "Malzeme Tedariği";
                manualTranslations["projectManagement.subcategories.implementationConsulting"] = "Uygulama Danışmanlığı";
            }
            // İngilizce çeviriler
            else {
                manualTranslations["facadeEngineering.subcategories.structuralCalculations"] = "Structural System Calculations";
                manualTranslations["facadeEngineering.subcategories.insulation"] = "Heat, Water and Sound Insulation";

                manualTranslations["energyEfficiency.subcategories.sunControlSystems"] = "Sun Control Systems";
                manualTranslations["energyEfficiency.subcategories.smartFacadeSystems"] = "Smart Facade Systems";
                manualTranslations["energyEfficiency.subcategories.naturalVentilation"] = "Natural Ventilation and Lighting";

                manualTranslations["facadeSystems.subcategories.ventilatedFacadeSystems"] = "Ventilated Facade Systems";
                manualTranslations["facadeSystems.subcategories.glassFacadeSystems"] = "Glass Facade Systems";
                manualTranslations["facadeSystems.subcategories.prefabFacadeElements"] = "Prefabricated Facade Elements";

                manualTranslations["facadeLighting.subcategories.nightLighting"] = "Night Lighting";
                manualTranslations["facadeLighting.subcategories.aestheticLighting"] = "Aesthetic Lighting";

                manualTranslations["facadeRestoration.subcategories.facadeRenovation"] = "Facade Renovation";
                manualTranslations["facadeRestoration.subcategories.historicFacadeRestoration"] = "Historic Building Facade Restoration";

                manualTranslations["projectManagement.subcategories.projectManagement"] = "Project Management";
                manualTranslations["projectManagement.subcategories.materialSupply"] = "Material Supply";
                manualTranslations["projectManagement.subcategories.implementationConsulting"] = "Implementation Consulting";
            }

            setTranslations(manualTranslations);
        }
    }, [categoryKey, language]);

    // Kartı ya da badge'i tıkladığımızda flip işlemini yap
    const handleFlip = (e: React.MouseEvent) => {
        e.stopPropagation(); // Etkinliğin üst elemana gitmesini engelle
        if (hasSubcats) {
            setIsFlipped(!isFlipped);
        }
    };

    const backButtonText = language === 'tr' ? 'Geri' : 'Back';

    return (
        <div className="cursor-pointer transition-all duration-300 h-full" onClick={handleFlip} style={{ perspective: '1000px' }}>
            {/* Ana kart konteyneri */}
            <div
                className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:border-blue-500/50 h-full transition-all duration-500 ${isFlipped ? 'opacity-10' : 'opacity-100'}`}
            >
                {/* Resim ve Başlık Bölümü */}
                <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
                    <div className="relative h-full w-full">
                        <img
                            src={imagePath || placeholderImage}
                            alt={t(translationKey)}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                                e.currentTarget.src = placeholderImage;
                            }}
                        />
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-black/10 to-transparent" />

                    {/* Badge */}
                    {hasSubcats && (
                        <div
                            className="absolute top-3 right-3 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer z-10 transition-all duration-300 animate-[pulse_0.7s_ease-in-out_infinite] bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500"
                            onClick={handleFlip}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Başlık */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white text-center hover:text-blue-400 transition-colors duration-300">
                        {t(translationKey)}
                    </h3>
                </div>
            </div>

            {/* Alt Başlıklar Popup - Animasyonlu olarak gösterilir */}
            <div
                className={`absolute inset-0 bg-blue-900/95 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 z-20 transition-all duration-500 ${
                    isFlipped
                        ? 'opacity-100 transform translate-y-0 rotate-y-0'
                        : 'opacity-0 transform -translate-y-8 rotate-y-90 pointer-events-none'
                }`}
                style={{
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(90deg)'
                }}
            >
                <h3 className="text-xl font-bold text-white text-center mb-4 pb-2 border-b border-white/20">
                    {t(translationKey)}
                </h3>

                <ul className="space-y-3 mt-4">
                    {categoryKey in architectureSubcategories &&
                        architectureSubcategories[categoryKey as CategoryKeyType].map((subcategoryKey: string, index: number) => (
                            <li
                                key={index}
                                className="text-white hover:text-blue-300 transition-colors duration-200 flex items-center"
                            >
                                <span className="mr-2 text-blue-300">•</span>
                                {/* Manuel çevirileri kullan */}
                                {translations[subcategoryKey] || subcategoryKey}
                            </li>
                        ))}
                </ul>

                <button
                    className="absolute bottom-4 right-4 text-blue-300 hover:text-white text-sm flex items-center gap-1 transition-colors duration-200 bg-blue-900/70 px-3 py-1 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                    }}
                >
                    <span>{backButtonText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ArchitectureCard;