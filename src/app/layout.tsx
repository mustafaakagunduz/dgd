import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext"; // ← Bu satırı ekleyin

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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
        <LanguageProvider>
            <AuthProvider> {/* ← Bu satırı ekleyin */}
                <Navbar />
                {children}
            </AuthProvider> {/* ← Bu satırı ekleyin */}
        </LanguageProvider>
        </body>
        </html>
    );
}