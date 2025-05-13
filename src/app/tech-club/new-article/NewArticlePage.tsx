"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {createEssayWithImage, Essay} from '@/lib/essays';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Debounce hook
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

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
    const [progress, setProgress] = useState(0);

    // Debounced values to prevent excessive re-renders
    const debouncedTitle = useDebounce(formData.title, 300);
    const debouncedSummary = useDebounce(formData.summary, 300);
    const debouncedContent = useDebounce(formData.content, 500);

    // Memoized form validation
    const isFormValid = useMemo(() => {
        return debouncedTitle.trim() &&
            debouncedSummary.trim() &&
            debouncedContent.trim() &&
            currentUser;
    }, [debouncedTitle, debouncedSummary, debouncedContent, currentUser]);

    // Optimized input change handler
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Optimized image change handler with preview
    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate image size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Resim boyutu 5MB\'dan küçük olmalıdır');
                return;
            }

            // Validate image type
            if (!file.type.startsWith('image/')) {
                setError('Sadece resim dosyaları desteklenir');
                return;
            }

            setImage(file);
            setError('');

            // Create preview with cleanup
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    // Cleanup preview URL
    React.useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // Optimized submit handler with progress tracking
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) {
            setError('Lütfen tüm zorunlu alanları doldurun');
            return;
        }

        setError('');
        setLoading(true);
        setProgress(10);

        console.log('=== ESSAY SUBMIT ===');
        console.log('Form Data:', {
            titleLength: formData.title.length,
            summaryLength: formData.summary.length,
            contentLength: formData.content.length,
            image: image ? `${(image.size / 1024 / 1024).toFixed(2)}MB` : 'Yok',
            currentUserId: currentUser?.id
        });

        try {
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 1000);

            const start = Date.now();

            const result = await createEssayWithImage({
                title: formData.title.trim(),
                summary: formData.summary.trim(),
                content: formData.content.trim(),
                author_id: currentUser!.id,
                image: image || undefined,
            });

            clearInterval(progressInterval);
            setProgress(100);

            console.log(`Essay creation took ${Date.now() - start}ms`);

            if (!result.success) {
                console.error('Essay creation failed:', result.error);
                setError(result.error || t("newArticle.createError"));
                setLoading(false);
                setProgress(0);
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            router.push('/tech-club');
        } catch (error) {
            console.error('Unexpected error:', error);
            setError(t("newArticle.unexpectedError"));
            setProgress(0);
            setLoading(false);
        }
    }, [isFormValid, formData, currentUser, image, router, t]);

    // Remove image handler
    const handleRemoveImage = useCallback(() => {
        setImage(null);
        setImagePreview(null);
    }, []);

    return (
        <div className="min-h-screen pt-28 pb-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Progress Bar */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-sm"
                    >
                        <div className="h-2 bg-gray-700">
                            <motion.div
                                className="h-full bg-gradient-to-r from-green-500 to-green-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <div className="text-center py-2">
                            <span className="text-white text-sm">
                                {progress < 50 ? 'Makale oluşturuluyor...' :
                                    progress < 90 ? 'Resim yükleniyor...' :
                                        'Tamamlanıyor...'}
                            </span>
                        </div>
                    </motion.div>
                )}

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
                                {t("newArticle.titleField")} *
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
                                maxLength={200}
                            />
                            <div className="text-xs text-gray-400 mt-1">
                                {formData.title.length}/200
                            </div>
                        </div>

                        {/* Summary */}
                        <div>
                            <label className="block text-gray-200 text-base font-medium mb-2">
                                {t("newArticle.summary")} *
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
                                maxLength={500}
                            />
                            <div className="text-xs text-gray-400 mt-1">
                                {formData.summary.length}/500
                            </div>
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

                        {/* Image Upload */}
                        <div className="flex-1">
                            <label className="block text-gray-200 text-base font-medium mb-2">
                                {t("newArticle.image")}
                            </label>
                            <div className="h-[200px] border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-green-400 transition-colors backdrop-blur-sm bg-black/10 flex flex-col justify-center">
                                {imagePreview ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-2"
                                    >
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-h-36 mx-auto rounded-lg object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="text-red-400 hover:text-red-300 text-sm transition-colors"
                                            disabled={loading}
                                        >
                                            {t("newArticle.removeImage")}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif,image/webp"
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
                                            {t("newArticle.imageFormats")} (Max 5MB)
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
                                {t("newArticle.content")} *
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                className="w-full h-[calc(100%-3rem)] px-3 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg text-white text-base focus:outline-none focus:border-green-400 resize-none transition-colors placeholder-gray-400"
                                required
                                disabled={loading}
                                placeholder={t("newArticle.contentPlaceholder")}
                            />
                            <div className="text-xs text-gray-400">
                                {formData.content.length} karakter
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-500/20 border border-red-500 rounded-lg backdrop-blur-sm"
                            >
                                <p className="text-red-400 text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
                            <Link
                                href="/tech-club"
                                className={`px-6 py-3 border border-white/20 text-gray-200 font-semibold text-base rounded-lg hover:bg-black/20 transition-all duration-300 backdrop-blur-sm text-center ${loading ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                {t("newArticle.cancel")}
                            </Link>
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !isFormValid}
                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-base rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {progress < 50 ? t("newArticle.processing") : 'Yükleniyor...'}
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