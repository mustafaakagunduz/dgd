"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingProvider from "@/components/providers/LoadingProvider";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <LanguageProvider>
            <AuthProvider>
                <LoadingProvider>
                    {children}
                </LoadingProvider>
            </AuthProvider>
        </LanguageProvider>
    );
}