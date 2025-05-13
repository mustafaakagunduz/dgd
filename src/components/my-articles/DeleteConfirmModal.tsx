"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    essayTitle: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
                                                                   isOpen,
                                                                   onClose,
                                                                   onConfirm,
                                                                   essayTitle
                                                               }) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    // Modal dışına tıklama handler'ı
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl max-w-md w-full border border-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/20">
                    <h2 className="text-xl font-bold text-white">
                        {t("myArticles.modal.delete.title")}
                    </h2>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-300 mb-4">
                        {t("myArticles.modal.delete.message")}
                    </p>
                    <div className="bg-gray-700 rounded-lg p-3 mb-6">
                        <p className="text-white font-medium text-center">"{essayTitle}"</p>
                    </div>
                    <p className="text-red-400 text-sm text-center font-medium">
                        Bu işlem geri alınamaz!
                    </p>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 p-6 border-t border-white/20">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-500 text-gray-400 hover:bg-gray-500/20 hover:border-gray-400"
                    >
                        {t("myArticles.modal.delete.cancel")}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {t("myArticles.modal.delete.confirm")}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default DeleteConfirmModal;