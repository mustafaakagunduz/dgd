"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from "@/components/authorization/AuthModal";
import CreateEssayModal from "@/components/essay/CreateEssayModal";

const AddEssayCard = () => {
    const { t } = useLanguage();
    const { isLoggedIn, logout } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreateArticle = () => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
        } else {
            setShowCreateModal(true);
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
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300 w-full"
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
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
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

                        {/* Logout Button - sadece login olduysa göster */}
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-400 hover:to-red-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
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

            <CreateEssayModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />
        </>
    );
};

export default AddEssayCard;