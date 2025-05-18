// src/app/consulting-services/metadata.ts
import { Metadata } from "next";

// Default metadata for Turkish language
export const trMetadata: Metadata = {
  title: "DGD Global | Danışmanlık Hizmetleri",
  description: "Sürdürülebilirlik raporları, ÇED raporları, kalite yönetim sistemleri, bilgi teknolojileri ve iletişim alanlarında kapsamlı danışmanlık hizmetlerimizi keşfedin.",
  keywords: [
    "DGD Global danışmanlık", 
    "sürdürülebilirlik raporları", 
    "ÇED raporları", 
    "kalite yönetim sistemleri", 
    "bilgi teknolojileri danışmanlığı", 
    "iletişim danışmanlığı"
  ],
  openGraph: {
    title: "DGD Global | Danışmanlık Hizmetleri",
    description: "Sürdürülebilirlik raporları, ÇED raporları, kalite yönetim sistemleri, bilgi teknolojileri ve iletişim alanlarında kapsamlı danışmanlık hizmetlerimizi keşfedin.",
    images: ["/assets/images/consulting/og-image.jpg"],
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "DGD Global | Danışmanlık Hizmetleri",
    description: "Sürdürülebilirlik raporları, ÇED raporları, kalite yönetim sistemleri, bilgi teknolojileri ve iletişim alanlarında kapsamlı danışmanlık hizmetlerimizi keşfedin.",
    images: ["/assets/images/consulting/og-image.jpg"],
  },
};

// Metadata for English language
export const enMetadata: Metadata = {
  title: "DGD Global | Consulting Services",
  description: "Explore our comprehensive consulting services in sustainability reports, environmental impact assessments, quality management systems, information technology, and communication.",
  keywords: [
    "DGD Global consulting", 
    "sustainability reports", 
    "environmental impact assessments", 
    "quality management systems", 
    "IT consulting", 
    "communication consulting"
  ],
  openGraph: {
    title: "DGD Global | Consulting Services",
    description: "Explore our comprehensive consulting services in sustainability reports, environmental impact assessments, quality management systems, information technology, and communication.",
    images: ["/assets/images/consulting/og-image.jpg"],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DGD Global | Consulting Services",
    description: "Explore our comprehensive consulting services in sustainability reports, environmental impact assessments, quality management systems, information technology, and communication.",
    images: ["/assets/images/consulting/og-image.jpg"],
  },
};

// Dynamic metadata generator based on locale
export function generateMetadata({ params }: { params: { locale: string } }) {
  // Return metadata based on locale
  return params.locale === "en" ? enMetadata : trMetadata;
}