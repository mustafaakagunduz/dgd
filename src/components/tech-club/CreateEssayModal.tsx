"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { createEssay, uploadEssayImage } from '@/lib/essays';

interface CreateEssayModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEssayCreated?: () => void;
}

const CreateEssayModal: React.FC<CreateEssayModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               onEssayCreated
                                                           }) => {
    const { t } = useLanguage();
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: ''
    });
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

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
            setError('Giriş yapmanız gerekiyor');
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
                image_url: imageUrl, // Resim URL'sini doğrudan ekle
            });

            if (!essayResult.success || !essayResult.essay) {
                setError(essayResult.error || 'Makale oluşturulamadı');
                setLoading(false);
                return;
            }

            // Başarılı, modalı kapat ve formu temizle
            onClose();
            setFormData({
                title: '',
                summary: '',
                content: ''
            });
            setImage(null);
            setImagePreview(null);

            // Parent component'e yeni makale oluşturulduğunu bildir
            if (onEssayCreated) {
                onEssayCreated();
            }
        } catch (error) {
            console.error('Error creating essay:', error);
            setError('Beklenmeyen bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl p-5 w-full max-w-lg max-h-[85vh] overflow-y-auto border border-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">
                        {t("createEssay.title")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={loading}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            {t("createEssay.titleField")}
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            {t("createEssay.summary")}
                        </label>
                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 resize-none"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Author (Gösterim amaçlı, değiştirilemez) */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Yazar
                        </label>
                        <input
                            type="text"
                            value={currentUser?.name || ''}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-gray-300 cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            {t("createEssay.image")}
                        </label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                            {imagePreview ? (
                                <div className="space-y-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-32 mx-auto rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImage(null);
                                            setImagePreview(null);
                                        }}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                        disabled={loading}
                                    >
                                        {t("createEssay.removeImage")}
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
                                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {t("createEssay.chooseImage")}
                                    </label>
                                    <p className="text-gray-400 text-sm mt-2">
                                        {t("createEssay.imageFormats")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            {t("createEssay.content")}
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            rows={8}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 resize-none"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                İşleniyor...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                {t("createEssay.create")}
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateEssayModal;