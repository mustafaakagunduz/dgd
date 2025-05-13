"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Essay } from '@/lib/essays';
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Save } from "lucide-react";
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface EssayModalProps {
    isOpen: boolean;
    onClose: () => void;
    essay: Essay;
    mode: 'view' | 'edit';
    onSave: (updatedEssay: Essay) => void;
    onDelete: () => void;
}

const EssayModal: React.FC<EssayModalProps> = ({
                                                   isOpen,
                                                   onClose,
                                                   essay,
                                                   mode,
                                                   onSave,
                                                   onDelete
                                               }) => {
    const { t } = useLanguage();
    const [editMode, setEditMode] = useState(mode);
    const [formData, setFormData] = useState({
        title: essay.title,
        summary: essay.summary,
        content: essay.content
    });

    if (!isOpen) return null;

    // Modal dışına tıklama handler'ı
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSave = () => {
        const updatedEssay: Essay = {
            ...essay,
            title: formData.title,
            summary: formData.summary,
            content: formData.content
        };
        onSave(updatedEssay);
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
                        {editMode === 'edit' ? t("myArticles.modal.edit") : t("myArticles.modal.title")}
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

                {/* Content */}
                <div className="p-6">
                    {editMode === 'edit' ? (
                        /* Edit Mode */
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    {t("myArticles.modal.editTitle")}
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
                                />
                            </div>

                            {/* Author - Read Only */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Yazar (Değiştirilemez)
                                </label>
                                <input
                                    type="text"
                                    value={essay.author}
                                    readOnly
                                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-gray-300 cursor-not-allowed"
                                />
                            </div>

                            {/* Summary */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    {t("myArticles.modal.editSummary")}
                                </label>
                                <textarea
                                    name="summary"
                                    value={formData.summary}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 resize-none"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    {t("myArticles.modal.editContent")}
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    rows={12}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 resize-none"
                                />
                            </div>
                        </div>
                    ) : (
                        /* View Mode */
                        <>
                            {/* Hero Image */}
                            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-6">
                                <Image
                                    src={essay.image}
                                    alt={essay.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
                                />
                            </div>

                            {/* Article Info */}
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold text-white">{essay.title}</h1>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {essay.author.split(' ').map(name => name[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-green-400 font-semibold">{essay.author}</p>
                                    </div>
                                </div>

                                <p className="text-gray-300 text-lg leading-relaxed">{essay.summary}</p>

                                {/* Article Content */}
                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-white mb-4">
                                        {t("myArticles.content")}:
                                    </h3>
                                    <div
                                        className="prose prose-invert max-w-none space-y-4"
                                        dangerouslySetInnerHTML={{
                                            __html: essay.content
                                                .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">')
                                                .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-white mt-6 mb-3">')
                                                .replace(/<p>/g, '<p class="text-gray-200 leading-relaxed mb-4">')
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between p-6 border-t border-white/20">
                    <div>
                        {editMode === 'view' && (
                            <Button
                                variant="outline"
                                onClick={() => setEditMode('edit')}
                                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/20 hover:border-yellow-400"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                {t("myArticles.edit")}
                            </Button>
                        )}
                    </div>

                    <div className="flex gap-3">
                        {editMode === 'edit' ? (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setEditMode('view');
                                        setFormData({
                                            title: essay.title,
                                            summary: essay.summary,
                                            content: essay.content
                                        });
                                    }}
                                    className="border-gray-500 text-gray-400 hover:bg-gray-500/20 hover:border-gray-400"
                                >
                                    İptal
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {t("myArticles.modal.save")}
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={onDelete}
                                className="border-red-500 text-red-500 hover:bg-red-500/20 hover:border-red-400"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                {t("myArticles.delete")}
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EssayModal;