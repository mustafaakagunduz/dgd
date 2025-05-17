"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from "@/components/authorization/AuthModal";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AddEssayCardProps {
    onEssayCreated?: () => void;
}

const AddEssayCard: React.FC<AddEssayCardProps> = ({ onEssayCreated }) => {
    const { t } = useLanguage();
    const { isLoggedIn, logout, isAdmin } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const router = useRouter();

    const handleCreateArticle = () => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
        } else {
            router.push('/tech-club/new-article');
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-300 w-full"
            >
                <div className="flex flex-col items-center space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white">
                        {t("addEssay.title")}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-base">
                        {t("addEssay.description")}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3 flex-wrap justify-center">
                        {/* Add Button */}
                        <button
                            onClick={handleCreateArticle}
                            className="px-8 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center gap-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536M9 11l3 3 6-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {t("addEssay.button")}
                        </button>

                        {/* My Articles Button - Tüm login olan kullanıcılar için */}
                        {isLoggedIn && (
                            <Link
                                href="/tech-club/my-articles"
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                {t("myArticles.button")}
                            </Link>
                        )}

                        {/* Admin: All Articles Button */}
                        {isLoggedIn && isAdmin && (
                            <Link
                                href="/tech-club/all-articles"
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all duration-300 flex items-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                                {t("admin.allArticles")}
                            </Link>
                        )}

                        {/* Logout Button - sadece login olduysa göster */}
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-400 hover:to-red-500 transition-all duration-300 flex items-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                {t("auth.logout")}
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};

export default AddEssayCard;