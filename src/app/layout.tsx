// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { geistSans, geistMono } from "@/lib/fonts";

// Navbar dinamik olarak yükleyelim
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
    loading: () => null,
    ssr: true,
});

// Provider'ları ayrı component'e çıkaralım
const Providers = dynamic(() => import("@/components/providers/Providers"), {
    ssr: true,
});

export const metadata: Metadata = {
    title: "DGD",
    description: "DGD Website",
    icons: {
        icon: "/favicon.ico",
        apple: '/favicon.ico'
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body
            className="antialiased"
            style={{
                background: 'linear-gradient(to bottom, #6cbc34, #374151, #000000)'
            }}
        >
        <Providers>
            <Navbar />
            {children}
        </Providers>
        </body>
        </html>
    );
}