"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Comment, getCommentsByEssayId, createComment } from '@/lib/comments';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface CommentsProps {
    essayId: string;
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
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
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 font-semibold">
                            {comment.profiles?.name || 'Unknown User'}
                        </span>
                        <span className="text-gray-400 text-sm">
                            {new Date(comment.created_at).toLocaleDateString('tr-TR')}
                        </span>
                    </div>
                    <p className="text-gray-200">
                        {comment.content}
                    </p>
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
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400">{t("comments.empty")}</p>
                    </div>
                )}
            </div>

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
                        {error && (
                            <p className="text-red-400 text-sm mt-2">{error}</p>
                        )}
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