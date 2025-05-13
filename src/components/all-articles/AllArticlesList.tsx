"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getApprovedEssays, getPendingEssays, Essay, updateEssay, deleteEssay, updateEssayApproval } from '@/lib/essays';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Check, X } from "lucide-react";
import ArticleModal from './ArticleModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const AllArticlesList = () => {
    const { isAdmin } = useAuth();
    const { t } = useLanguage();
    const [allEssays, setAllEssays] = useState<Essay[]>([]);
    const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [essayToDelete, setEssayToDelete] = useState<Essay | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
    const [loading, setLoading] = useState(true);
    const [showOnlyPending, setShowOnlyPending] = useState(false);

    useEffect(() => {
        if (isAdmin) {
            loadAllEssays();
        }
    }, [isAdmin, showOnlyPending]);

    const loadAllEssays = async () => {
        try {
            let essays: Essay[];
            if (showOnlyPending) {
                essays = await getPendingEssays();
            } else {
                const [approved, pending] = await Promise.all([
                    getApprovedEssays(),
                    getPendingEssays()
                ]);
                essays = [...pending, ...approved].sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
            }
            setAllEssays(essays);
        } catch (error) {
            console.error('Error loading all essays:', error);
        } finally {
            setLoading(false);
        }
    };

    // Admin kontrolü
    if (!isAdmin) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-4">Erişim Reddedildi</h2>
                <p className="text-gray-300">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
            </div>
        );
    }

    const handleViewEssay = (essay: Essay) => {
        setSelectedEssay(essay);
        setModalMode('view');
        setShowModal(true);
    };

    const handleEditEssay = (essay: Essay) => {
        setSelectedEssay(essay);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleDeleteEssay = (essay: Essay) => {
        setEssayToDelete(essay);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!essayToDelete) return;

        try {
            const result = await deleteEssay(essayToDelete.id);
            if (result.success) {
                setAllEssays(prev => prev.filter(essay => essay.id !== essayToDelete.id));
                setShowDeleteModal(false);
                setEssayToDelete(null);
            } else {
                alert('Silme işlemi başarısız: ' + result.error);
            }
        } catch (error) {
            console.error('Error deleting essay:', error);
            alert('Silme işlemi sırasında bir hata oluştu');
        }
    };

    const handleApprovalToggle = async (essay: Essay) => {
        try {
            const result = await updateEssayApproval(essay.id, !essay.approved);
            if (result.success) {
                setAllEssays(prev => prev.map(e =>
                    e.id === essay.id ? { ...e, approved: !e.approved } : e
                ));
            } else {
                alert('Onay durumu güncellenemedi: ' + result.error);
            }
        } catch (error) {
            console.error('Error updating approval:', error);
            alert('Onay durumu güncellenirken bir hata oluştu');
        }
    };

    const handleSaveEssay = async (updatedEssay: Essay) => {
        try {
            const result = await updateEssay(updatedEssay.id, {
                title: updatedEssay.title,
                summary: updatedEssay.summary,
                content: updatedEssay.content
            });

            if (result.success) {
                setAllEssays(prev => prev.map(essay =>
                    essay.id === updatedEssay.id ? updatedEssay : essay
                ));
                setShowModal(false);
                setSelectedEssay(null);
            } else {
                alert('Güncelleme başarısız: ' + result.error);
            }
        } catch (error) {
            console.error('Error updating essay:', error);
            alert('Güncelleme sırasında bir hata oluştu');
        }
    };

    const getStatusBadge = (approved: boolean) => {
        if (approved) {
            return (
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    {t("allArticles.status.approved")}
                </span>
            );
        } else {
            return (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    {t("allArticles.status.pending")}
                </span>
            );
        }
    };

    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <div className="text-white">Tüm makaleler yükleniyor...</div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {t("allArticles.title")} ({allEssays.length})
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => setShowOnlyPending(false)}
                            className={`${!showOnlyPending ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-700 text-white`}
                        >
                            Tümü
                        </Button>
                        <Button
                            onClick={() => setShowOnlyPending(true)}
                            className={`${showOnlyPending ? 'bg-yellow-600' : 'bg-gray-600'} hover:bg-yellow-700 text-white`}
                        >
                            Bekleyenler
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/20">
                                <TableHead className="text-white font-medium">
                                    {t("allArticles.table.title")}
                                </TableHead>
                                <TableHead className="text-white font-medium">
                                    {t("allArticles.table.author")}
                                </TableHead>
                                <TableHead className="text-white font-medium">
                                    {t("allArticles.table.summary")}
                                </TableHead>
                                <TableHead className="text-white font-medium text-center">
                                    {t("allArticles.table.status")}
                                </TableHead>
                                <TableHead className="text-white font-medium text-center">
                                    {t("allArticles.table.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allEssays.map((essay) => (
                                <TableRow key={essay.id} className="border-white/20 hover:bg-white/5">
                                    <TableCell
                                        className="font-medium text-white cursor-pointer hover:text-green-400 transition-colors"
                                        onClick={() => handleViewEssay(essay)}
                                    >
                                        {essay.title}
                                    </TableCell>
                                    <TableCell className="text-gray-300">
                                        {essay.profiles?.name || 'Unknown'}
                                    </TableCell>
                                    <TableCell className="text-gray-300 max-w-xs truncate">
                                        {essay.summary}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {getStatusBadge(essay.approved)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewEssay(essay)}
                                                className="h-8 w-8 p-0 border-blue-500 hover:bg-blue-500/20 hover:border-blue-400"
                                                title={t("allArticles.view")}
                                            >
                                                <Eye className="h-4 w-4 text-blue-500" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEditEssay(essay)}
                                                className="h-8 w-8 p-0 border-yellow-500 hover:bg-yellow-500/20 hover:border-yellow-400"
                                                title={t("allArticles.edit")}
                                            >
                                                <Edit className="h-4 w-4 text-yellow-500" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleApprovalToggle(essay)}
                                                className={`h-8 w-8 p-0 ${essay.approved ? 'border-orange-500 hover:bg-orange-500/20 hover:border-orange-400' : 'border-green-500 hover:bg-green-500/20 hover:border-green-400'}`}
                                                title={essay.approved ? 'Onayı Kaldır' : 'Onayla'}
                                            >
                                                {essay.approved ? (
                                                    <X className="h-4 w-4 text-orange-500" />
                                                ) : (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                )}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeleteEssay(essay)}
                                                className="h-8 w-8 p-0 border-red-500 hover:bg-red-500/20 hover:border-red-400"
                                                title={t("allArticles.delete")}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Article Modal */}
            {selectedEssay && (
                <ArticleModal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedEssay(null);
                    }}
                    essay={selectedEssay}
                    mode={modalMode}
                    onSave={handleSaveEssay}
                    onDelete={() => {
                        setShowModal(false);
                        handleDeleteEssay(selectedEssay);
                    }}
                    onModeChange={(newMode) => setModalMode(newMode)}
                />
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setEssayToDelete(null);
                }}
                onConfirm={confirmDelete}
                essayTitle={essayToDelete?.title || ''}
            />
        </>
    );
};

export default AllArticlesList;