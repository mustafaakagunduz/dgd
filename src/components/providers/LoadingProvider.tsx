"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface LoadingProviderProps {
    children: React.ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const { loading } = useAuth();

    // Sadece gerçekten uzun sürerse loading screen göster
    const [showLoading, setShowLoading] = React.useState(false);

    React.useEffect(() => {
        if (loading) {
            // 500ms bekle sonra loading screen göster
            const timer = setTimeout(() => {
                setShowLoading(true);
            }, 500);

            return () => clearTimeout(timer);
        } else {
            setShowLoading(false);
        }
    }, [loading]);

    if (loading && showLoading) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default LoadingProvider;