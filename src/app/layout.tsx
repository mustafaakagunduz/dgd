import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { geistSans, geistMono } from "@/lib/fonts";

// Components'i lazy load yap
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
    loading: () => null,
    ssr: true, // Server-side rendering için gerekli
});

// Provider'ları ayrı component'e çıkar
const Providers = dynamic(() => import("@/components/providers/Providers"), {
    ssr: true,
});

export const metadata: Metadata = {
    title: "DGD",
    description: "DGD Website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            style={{
                background: 'linear-gradient(to bottom, #4b8224, #374151, #000000)'
            }}
        >
        <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
            <Providers>
                <Navbar />
                {children}
            </Providers>
        </Suspense>
        </body>
        </html>
    );
}