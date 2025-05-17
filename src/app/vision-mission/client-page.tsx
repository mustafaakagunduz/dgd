"use client";

import VisionMissionClient from './VisionMissionClient';
import { getStaticVisionMissionData } from '@/lib/static-data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VisionMissionClientPage() {
    // Dil tercihini al
    const { language } = useLanguage();

    // Dil tercihi (language) değerine göre doğru statik veriyi getir
    const staticData = getStaticVisionMissionData(language as 'tr' | 'en');

    return (
        <VisionMissionClient initialData={staticData} />
    );
}