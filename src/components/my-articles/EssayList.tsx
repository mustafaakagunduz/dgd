"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getEssaysByUserId, Essay, updateEssay, deleteEssay } from '@/lib/essays';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import EssayModal from './EssayModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const EssayList = () => {
    const { currentUser } = useAuth();
    const { t } = useLanguage();
    const [userEssays, setUserEssays] = useState<Essay[]>([]);
    const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [essayToDelete, setEssayToDelete] = useState<Essay | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            loadUserEssays();
        } else {
            setUserEssays([]);
            setLoading(false);
        }
    }, [currentUser]);

    const loadUserEssays = async () => {
        if (!currentUser) return;

        try {
            const essays = await getEssaysByUserId(currentUser.id);
            setUserEssays(essays);
        } catch (error) {
            console.error('Error loading user essays:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewEssay = (essay: Essay) => {
        setSelectedEssay(essay);
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
                setUserEssays(prev => prev.filter(essay => essay.id !== essayToDelete.id));
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

    const handleSaveEssay = async (updatedEssay: Essay) => {
        try {
            const result = await updateEssay(updatedEssay.id, {
                title: updatedEssay.title,
                summary: updatedEssay.summary,
                content: updatedEssay.content
            });

            if (result.success) {
                setUserEssays(prev => prev.map(essay =>
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
                    {t("myArticles.status.approved")}
                </span>
            );
        } else {
            return (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    {t("myArticles.status.pending")}
                </span>
            );
        }
    };

    if (loading) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <div className="text-white">Makaleler yükleniyor...</div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-4">Giriş Gerekli</h2>
                <p className="text-gray-300">Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir.</p>
            </div>
        );
    }

    if (userEssays.length === 0) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-4">
                    {t("myArticles.empty.title")}
                </h2>
                <p className="text-gray-300">
                    {t("myArticles.empty.message")}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                    {t("myArticles.title")} ({userEssays.length})
                </h2>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/20">
                                <TableHead className="text-white font-medium">
                                    {t("myArticles.table.title")}
                                </TableHead>
                                <TableHead className="text-white font-medium">
                                    {t("myArticles.table.summary")}
                                </TableHead>
                                <TableHead className="text-white font-medium text-center">
                                    {t("myArticles.table.status")}
                                </TableHead>
                                <TableHead className="text-white font-medium text-center">
                                    {t("myArticles.table.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userEssays.map((essay) => (
                                <TableRow key={essay.id} className="border-white/20 hover:bg-white/5">
                                    <TableCell
                                        className="font-medium text-white cursor-pointer hover:text-green-400 transition-colors"
                                        onClick={() => handleViewEssay(essay)}
                                    >
                                        {essay.title}
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
                                                title={t("myArticles.view")}
                                            >
                                                <Eye className="h-4 w-4 text-blue-500" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeleteEssay(essay)}
                                                className="h-8 w-8 p-0 border-red-500 hover:bg-red-500/20 hover:border-red-400"
                                                title={t("myArticles.delete")}
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

            {/* Essay Modal */}
            {selectedEssay && (
                <EssayModal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedEssay(null);
                    }}
                    essay={selectedEssay}
                    onSave={handleSaveEssay}
                    onDelete={() => {
                        setShowModal(false);
                        handleDeleteEssay(selectedEssay);
                    }}
                />
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
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

export default EssayList;