// src/app/construction/metadata.ts
import { Metadata } from "next";

// Default metadata for Turkish language
export const trMetadata: Metadata = {
  title: "DGD Global | İnşaat Hizmetleri",
  description: "Bina inşaatı, altyapı, endüstriyel tesisler, kentsel dönüşüm projeleri ve özel inşaat çözümleri dahil kapsamlı inşaat hizmetlerimizi keşfedin.",
  keywords: [
    "DGD Global inşaat", 
    "bina inşaatı", 
    "altyapı inşaatı", 
    "endüstriyel yapılar", 
    "kentsel dönüşüm", 
    "peyzaj",
    "ulaşım projeleri",
    "özel inşaat çözümleri",
    "mekanik sistemler"
  ],
  openGraph: {
    title: "DGD Global | İnşaat Hizmetleri",
    description: "Bina inşaatı, altyapı, endüstriyel tesisler, kentsel dönüşüm projeleri ve özel inşaat çözümleri dahil kapsamlı inşaat hizmetlerimizi keşfedin.",
    images: ["/assets/images/construction/og-image.jpg"],
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "DGD Global | İnşaat Hizmetleri",
    description: "Bina inşaatı, altyapı, endüstriyel tesisler, kentsel dönüşüm projeleri ve özel inşaat çözümleri dahil kapsamlı inşaat hizmetlerimizi keşfedin.",
    images: ["/assets/images/construction/og-image.jpg"],
  },
};

// Metadata for English language
export const enMetadata: Metadata = {
  title: "DGD Global | Construction Services",
  description: "Explore our comprehensive construction services including building construction, infrastructure, industrial facilities, urban renewal projects, and specialized construction solutions.",
  keywords: [
    "DGD Global construction", 
    "building construction", 
    "infrastructure construction", 
    "industrial facilities", 
    "urban renewal", 
    "landscaping",
    "transportation projects",
    "specialized construction solutions",
    "mechanical systems"
  ],
  openGraph: {
    title: "DGD Global | Construction Services",
    description: "Explore our comprehensive construction services including building construction, infrastructure, industrial facilities, urban renewal projects, and specialized construction solutions.",
    images: ["/assets/images/construction/og-image.jpg"],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DGD Global | Construction Services",
    description: "Explore our comprehensive construction services including building construction, infrastructure, industrial facilities, urban renewal projects, and specialized construction solutions.",
    images: ["/assets/images/construction/og-image.jpg"],
  },
};

// Dynamic metadata generator based on locale
export function generateMetadata({ params }: { params: { locale: string } }) {
  // Return metadata based on locale
  return params.locale === "en" ? enMetadata : trMetadata;
}