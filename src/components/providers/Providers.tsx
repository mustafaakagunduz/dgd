// src/components/providers/Providers.tsx (güncelleme)
"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingProvider from "@/components/providers/LoadingProvider";
import LoadingOverlay from "@/components/providers/LoadingOverlay";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <LanguageProvider>
            <AuthProvider>
                <LoadingProvider>
                    <LoadingOverlay>
                        {children}
                    </LoadingOverlay>
                </LoadingProvider>
            </AuthProvider>
        </LanguageProvider>
    );
}