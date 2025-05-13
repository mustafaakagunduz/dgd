"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getEssaysByUserId, Essay } from '@/lib/essays';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
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
    const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

    // useEffect ile currentUser değiştiğinde essays'leri yeniden yükle
    useEffect(() => {
        if (currentUser) {
            setUserEssays(getEssaysByUserId(currentUser.id));
        } else {
            setUserEssays([]);
        }
    }, [currentUser]);

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

    const confirmDelete = () => {
        if (essayToDelete) {
            // Essay silme logic'i burada olacak
            console.log('Deleting tech-club:', essayToDelete.id);
            setUserEssays(prev => prev.filter(essay => essay.id !== essayToDelete.id));
            setShowDeleteModal(false);
            setEssayToDelete(null);
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
                                                onClick={() => handleEditEssay(essay)}
                                                className="h-8 w-8 p-0 border-yellow-500 hover:bg-yellow-500/20 hover:border-yellow-400"
                                                title={t("myArticles.edit")}
                                            >
                                                <Edit className="h-4 w-4 text-yellow-500" />
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
                    mode={modalMode}
                    onSave={(updatedEssay) => {
                        // Essay güncelleme logic'i burada olacak
                        console.log('Updating tech-club:', updatedEssay);
                        setUserEssays(prev => prev.map(essay =>
                            essay.id === updatedEssay.id ? updatedEssay : essay
                        ));
                        setShowModal(false);
                        setSelectedEssay(null);
                    }}
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