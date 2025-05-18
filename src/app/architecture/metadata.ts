// src/app/architecture/metadata.ts
import { Metadata } from "next";

// Default metadata for Turkish language
export const trMetadata: Metadata = {
    title: "DGD Global | Mimarlık Hizmetleri",
    description: "Bina tasarımı, cephe mühendisliği, dekorasyon ve enerji verimliliği çözümleri dahil kapsamlı mimarlık hizmetlerimizi keşfedin.",
    keywords: [
        "DGD Global mimarlık",
        "bina tasarımı",
        "cephe tasarımı",
        "cephe mühendisliği",
        "enerji verimliliği",
        "kentsel tasarım",
        "aydınlatma tasarımı",
        "restorasyon",
        "proje yönetimi"
    ],
    openGraph: {
        title: "DGD Global | Mimarlık Hizmetleri",
        description: "Bina tasarımı, cephe mühendisliği, dekorasyon ve enerji verimliliği çözümleri dahil kapsamlı mimarlık hizmetlerimizi keşfedin.",
        images: ["/assets/images/architecture/og-image.jpg"],
        type: "website",
        locale: "tr_TR",
    },
    twitter: {
        card: "summary_large_image",
        title: "DGD Global | Mimarlık Hizmetleri",
        description: "Bina tasarımı, cephe mühendisliği, dekorasyon ve enerji verimliliği çözümleri dahil kapsamlı mimarlık hizmetlerimizi keşfedin.",
        images: ["/assets/images/architecture/og-image.jpg"],
    },
};

// Metadata for English language
export const enMetadata: Metadata = {
    title: "DGD Global | Architectural Services",
    description: "Explore our comprehensive architectural services including building design, facade engineering, decoration and energy efficiency solutions.",
    keywords: [
        "DGD Global architecture",
        "building design",
        "facade design",
        "facade engineering",
        "energy efficiency",
        "urban design",
        "lighting design",
        "restoration",
        "project management"
    ],
    openGraph: {
        title: "DGD Global | Architectural Services",
        description: "Explore our comprehensive architectural services including building design, facade engineering, decoration and energy efficiency solutions.",
        images: ["/assets/images/architecture/og-image.jpg"],
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "DGD Global | Architectural Services",
        description: "Explore our comprehensive architectural services including building design, facade engineering, decoration and energy efficiency solutions.",
        images: ["/assets/images/architecture/og-image.jpg"],
    },
};

// Dynamic metadata generator based on locale
export function generateMetadata({ params }: { params: { locale: string } }) {
    // Return metadata based on locale
    return params.locale === "en" ? enMetadata : trMetadata;
}