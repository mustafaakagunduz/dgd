"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { createEssay, uploadEssayImage } from '@/lib/essays';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NewArticlePage = () => {
    const { t } = useLanguage();
    const { currentUser } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: ''
    });
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!currentUser) {
            setError(t("newArticle.loginRequired"));
            setLoading(false);
            return;
        }

        try {
            let imageUrl: string | undefined;

            // Önce resim varsa onu yükle
            if (image) {
                // Geçici bir ID oluştur resim yükleme için
                const tempId = Date.now().toString();
                const imageResult = await uploadEssayImage(image, tempId);

                if (imageResult.success && imageResult.url) {
                    imageUrl = imageResult.url;
                }
            }

            // Essay'i resim URL'si ile birlikte oluştur
            const essayResult = await createEssay({
                title: formData.title,
                summary: formData.summary,
                content: formData.content,
                author_id: currentUser.id,
                image_url: imageUrl,
            });

            if (!essayResult.success || !essayResult.essay) {
                setError(essayResult.error || t("newArticle.createError"));
                setLoading(false);
                return;
            }

            // Başarılı olursa tech-club sayfasına yönlendir
            router.push('/tech-club');
        } catch (error) {
            console.error('Error creating essay:', error);
            setError(t("newArticle.unexpectedError"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-9rem)]"
                >
                    {/* Sol Sütun - Form Fields */}
                    <div className="lg:col-span-5 space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-200 text-base font-medium mb-2">
                                {t("newArticle.titleField")}
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg text-white text-base focus:outline-none focus:border-green-400 transition-colors placeholder-gray-400"
                                required
                                disabled={loading}
                                placeholder={t("newArticle.titlePlaceholder")}
                            />
                        </div>

                        {/* Summary */}
                        <div>
                            <label className="block text-gray-200 text-base font-medium mb-2">
                                {t("newArticle.summary")}
                            </label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg text-white text-base focus:outline-none focus:border-green-400 resize-none transition-colors placeholder-gray-400"
                                required
                                disabled={loading}
                                placeholder={t("newArticle.summaryPlaceholder")}
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-gray-200 text-base font-medium mb-2">
                                {t("newArticle.author")}
                            </label>
                            <input
                                type="text"
                                value={currentUser?.name || ''}
                                className="w-full px-3 py-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 text-base cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        {/* Image Upload - Sol taraftaki son element */}
                        <div className="flex-1">
                            <label className="block text-gray-200 text-base font-medium mb-2">
                                {t("newArticle.image")}
                            </label>
                            <div className="h-[200px] border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-green-400 transition-colors backdrop-blur-sm bg-black/10 flex flex-col justify-center">
                                {imagePreview ? (
                                    <div className="space-y-2">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-h-36 mx-auto rounded-lg object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImage(null);
                                                setImagePreview(null);
                                            }}
                                            className="text-red-400 hover:text-red-300 text-sm transition-colors"
                                            disabled={loading}
                                        >
                                            {t("newArticle.removeImage")}
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="image-upload"
                                            disabled={loading}
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg hover:bg-black/30 transition-colors text-white text-base border border-white/10"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {t("newArticle.chooseImage")}
                                        </label>
                                        <p className="text-gray-300 text-sm mt-2">
                                            {t("newArticle.imageFormats")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sağ Sütun - Content & Buttons */}
                    <div className="lg:col-span-7 flex flex-col h-full">
                        {/* Content Textarea */}
                        <div className="flex-1 space-y-2">
                            <label className="block text-gray-200 text-base font-medium">
                                {t("newArticle.content")}
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                className="w-full h-[calc(100%-2rem)] px-3 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg text-white text-base focus:outline-none focus:border-green-400 resize-none transition-colors placeholder-gray-400"
                                required
                                disabled={loading}
                                placeholder={t("newArticle.contentPlaceholder")}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg backdrop-blur-sm">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
                            <Link
                                href="/tech-club"
                                className="px-6 py-3 border border-white/20 text-gray-200 font-semibold text-base rounded-lg hover:bg-black/20 transition-all duration-300 backdrop-blur-sm text-center"
                            >
                                {t("newArticle.cancel")}
                            </Link>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-base rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {t("newArticle.processing")}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        {t("newArticle.create")}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NewArticlePage;