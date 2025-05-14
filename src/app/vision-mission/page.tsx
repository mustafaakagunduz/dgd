// src/app/vision-mission/page.tsx - Fixed SSG version
import VisionMissionClient from './VisionMissionClient';
import { getStaticVisionMissionData } from '@/lib/static-data';
import { Metadata } from 'next';

// SSG için gerekli exportlar
export const dynamic = 'force-static';
export const revalidate = false;

// Metadata generation - Server Component'te kalmalı
export async function generateMetadata(): Promise<Metadata> {
  // Build time'da statik veriden metadata oluştur
  const staticData = getStaticVisionMissionData('tr');

  return {
    title: `${staticData.pageTitle} | DGD Global Technology`,
    description: staticData.pageDescription,
    keywords: ["DGD Global", "vizyon", "misyon", "sürdürülebilir teknoloji", "çevre duyarlılığı"],
    openGraph: {
      title: `${staticData.pageTitle} | DGD Global Technology`,
      description: staticData.pageDescription,
      type: 'website',
      locale: 'tr_TR',
      alternateLocale: ['en_US'],
    },
    twitter: {
      card: 'summary',
      title: `${staticData.pageTitle} | DGD Global Technology`,
      description: staticData.pageDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Server Component - statik veri ile render
export default function VisionMissionPage() {
  // Build time'da statik verileri al
  const staticDataTR = getStaticVisionMissionData('tr');
  const staticDataEN = getStaticVisionMissionData('en');

  return (
      <VisionMissionClient
          initialData={staticDataTR}
          // Eğer çoklu dil desteği gerekiyorsa, burada language prop'u da ekleyebilirsiniz
      />
  );
}