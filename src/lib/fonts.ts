import { Geist, Geist_Mono } from "next/font/google";

// Font'ları ayrı ayrı yükle
export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    preload: true,
    display: "swap", // Font yüklenene kadar sistem fontunu kullan
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    preload: false, // Sadece gerektiğinde yükle
    display: "swap",
});