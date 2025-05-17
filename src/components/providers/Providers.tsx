// src/components/providers/Providers.tsx
"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingOverlay from "@/components/providers/LoadingOverlay";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <LanguageProvider>
            <AuthProvider>
                <LoadingOverlay>
                    {children}
                </LoadingOverlay>
            </AuthProvider>
        </LanguageProvider>
    );
}