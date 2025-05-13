"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Comment, getCommentsByEssayId, createComment, updateComment, deleteComment } from '@/lib/comments';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface CommentsProps {
    essayId: string;
}

const CommentItem: React.FC<{
    comment: Comment;
    onEdit: (id: string, content: string) => void;
    onDelete: (id: string) => void;
    currentUserId?: string;
}> = ({ comment, onEdit, onDelete, currentUserId }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isOwner = currentUserId === comment.user_id;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setIsDropdownOpen(false);
    };

    const handleSaveEdit = () => {
        if (editContent.trim() && editContent !== comment.content) {
            onEdit(comment.id, editContent.trim());
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditContent(comment.content);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
            onDelete(comment.id);
        }
        setIsDropdownOpen(false);
    };

    return (
        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex gap-3">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {comment.profiles?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </span>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-green-400 font-semibold">
                                {comment.profiles?.name || 'Unknown User'}
                            </span>
                            <span className="text-gray-400 text-sm">
                                {new Date(comment.created_at).toLocaleDateString('tr-TR')}
                            </span>
                        </div>

                        {isOwner && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg z-10 overflow-hidden"
                                    >
                                        <button
                                            onClick={handleEdit}
                                            className="w-full px-4 py-2 text-left text-yellow-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Düzenle
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Sil
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>

                    {isEditing ? (
                        <div>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full bg-gray-800 text-white rounded-lg p-3 border border-white/20 focus:border-green-400 focus:outline-none resize-none"
                                rows={3}
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleSaveEdit}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors text-sm"
                                >
                                    Kaydet
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm"
                                >
                                    İptal
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-200">
                            {comment.content}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Comments: React.FC<CommentsProps> = ({ essayId }) => {
    const { t } = useLanguage();
    const { isLoggedIn, currentUser } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadComments();
    }, [essayId]);

    const loadComments = async () => {
        try {
            const fetchedComments = await getCommentsByEssayId(essayId);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error loading comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn || !currentUser) {
            setError('Yorum yapmak için giriş yapmalısınız');
            return;
        }

        if (!newComment.trim()) {
            setError('Yorum boş bırakılamaz');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const result = await createComment({
                essay_id: essayId,
                user_id: currentUser.id,
                content: newComment.trim()
            });

            if (result.success && result.comment) {
                setComments(prev => [...prev, result.comment!]);
                setNewComment('');
            } else {
                setError(result.error || 'Yorum gönderilemedi');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            setError('Beklenmeyen bir hata oluştu');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditComment = async (id: string, content: string) => {
        try {
            const result = await updateComment(id, content);
            if (result.success) {
                setComments(prev => prev.map(comment =>
                    comment.id === id
                        ? { ...comment, content }
                        : comment
                ));
            } else {
                setError(result.error || 'Yorum güncellenemedi');
            }
        } catch (error) {
            console.error('Error updating comment:', error);
            setError('Beklenmeyen bir hata oluştu');
        }
    };

    const handleDeleteComment = async (id: string) => {
        try {
            const result = await deleteComment(id);
            if (result.success) {
                setComments(prev => prev.filter(comment => comment.id !== id));
            } else {
                setError(result.error || 'Yorum silinemedi');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Beklenmeyen bir hata oluştu');
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 }
    };

    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <div className="text-center text-white">Yorumlar yükleniyor...</div>
            </div>
        );
    }

    return (
        <motion.div
            variants={fadeInUp}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8"
        >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {t("comments.title")} ({comments.length})
            </h2>

            {/* Comments List */}
            <div className="space-y-4 mb-8">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onEdit={handleEditComment}
                            onDelete={handleDeleteComment}
                            currentUserId={currentUser?.id}
                        />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400">{t("comments.empty")}</p>
                    </div>
                )}
            </div>

            {/* Global Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4"
                >
                    <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
            )}

            {/* Comment Form */}
            {isLoggedIn ? (
                <form onSubmit={handleSubmitComment}>
                    <div className="bg-white/5 rounded-lg p-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={t("comments.placeholder")}
                            className="w-full bg-transparent text-white placeholder-gray-400 resize-none rounded-lg p-3 border border-white/20 focus:border-green-400 focus:outline-none"
                            rows={3}
                            disabled={submitting}
                        />
                        <div className="flex justify-end mt-3">
                            <button
                                type="submit"
                                disabled={!newComment.trim() || submitting}
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Gönderiliyor...' : t("comments.submit")}
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-gray-400">
                        {t("comments.loginRequired")}
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default Comments;