"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Essay } from '@/lib/essays';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface EssayModalProps {
    isOpen: boolean;
    onClose: () => void;
    essay: Essay;
    onSave: (updatedEssay: Essay) => void;
    onDelete: () => void;
}

const EssayModal: React.FC<EssayModalProps> = ({
                                                   isOpen,
                                                   onClose,
                                                   essay,
                                                   onSave,
                                                   onDelete
                                               }) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    // Modal dışına tıklama handler'ı
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Author bilgisini güvenli şekilde al
    const authorName = essay.profiles?.name || 'Unknown Author';
    const authorInitials = authorName.split(' ').map((name: string) => name[0]).join('');

    // Metin içeriğini düzenle - tüm metni beyaz yap
    const formatContent = (content: string) => {
        // Önce temel stillerle başlayalım
        let formattedContent = content
            .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">')
            .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-white mt-6 mb-3">')
            .replace(/<p>/g, '<p class="text-gray-200 leading-relaxed mb-4">');

        // Diğer içerik türlerini de beyaza çevirelim
        formattedContent = formattedContent
            .replace(/<span/g, '<span class="text-white" ')
            .replace(/<li/g, '<li class="text-white" ')
            .replace(/<ul/g, '<ul class="text-white list-disc pl-5 mb-4 space-y-2" ')
            .replace(/<ol/g, '<ol class="text-white list-decimal pl-5 mb-4 space-y-2" ')
            .replace(/<a /g, '<a class="text-green-400 hover:underline" ');

        return formattedContent;
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
                className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/20">
                    <h2 className="text-2xl font-bold text-white">
                        {t("myArticles.modal.title")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content - View Mode Only */}
                <div className="p-6">
                    {/* Hero Image */}
                    {essay.image_url && (
                        <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-6">
                            <Image
                                src={essay.image_url}
                                alt={essay.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
                            />
                        </div>
                    )}

                    {/* Article Info */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-white">{essay.title}</h1>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {authorInitials}
                                </span>
                            </div>
                            <div>
                                <p className="text-green-400 font-semibold">{authorName}</p>
                            </div>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed">{essay.summary}</p>

                        {/* Article Content */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                {t("myArticles.content")}:
                            </h3>
                            <div
                                className="prose prose-invert max-w-none space-y-4 essay-content text-white"
                                dangerouslySetInnerHTML={{
                                    __html: formatContent(essay.content)
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Actions - Only Delete Button */}
                <div className="flex justify-end p-6 border-t border-white/20">
                    <Button
                        variant="outline"
                        onClick={onDelete}
                        className="border-red-500 text-red-500 hover:bg-red-500/20 hover:border-red-400"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t("myArticles.delete")}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default EssayModal;