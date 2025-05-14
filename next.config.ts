// next.config.ts - Static Export için optimizasyon
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // SSG optimizasyonları
    // output: 'export', // Bu satırı kaldırdık - sadece tam statik site gerekirse aktif et
    trailingSlash: true,

    // İmaj optimizasyonları
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cmodbevnqegapdtvtywd.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
        // Static export için unoptimized: true, normal SSG için false
        unoptimized: false,
        // Görsel formatları
        formats: ['image/webp', 'image/avif'],
        // Responsive breakpoint'ler
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Performans optimizasyonları
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['framer-motion', 'lucide-react'],
    },

    // Compiler optimizasyonları
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Environment variables
    env: {
        ENABLE_SSG: 'true',
    },
};

export default nextConfig;