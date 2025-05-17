// src/lib/fonts.ts
import { Geist, Geist_Mono } from "next/font/google";

// Fontları optimize edelim
export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    preload: true,
    display: "swap", // Fontlar yüklenirken sistem fontunu kullan
    adjustFontFallback: false, // Bu, fallback fontların ayarlanmasını önler
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    preload: false, // Sadece gerektiğinde yükle
    display: "swap",
    adjustFontFallback: false,
});