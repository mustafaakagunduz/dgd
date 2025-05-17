// src/app/vision-mission/page.tsx - Fixed SSG version
import { getStaticVisionMissionData } from '@/lib/static-data';
import { Metadata } from 'next';
import ClientPage from './client-page';

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

// Server Component - Client bileşenini render ediyor
export default function VisionMissionPage() {
  return <ClientPage />;
}