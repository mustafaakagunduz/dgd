"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { essays, Essay } from '@/lib/essays';
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
import ArticleModal from './ArticleModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const AllArticlesList = () => {
    const { isAdmin } = useAuth();
    const { t } = useLanguage();
    const [allEssays, setAllEssays] = useState<Essay[]>(essays);
    const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [essayToDelete, setEssayToDelete] = useState<Essay | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

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

    const confirmDelete = () => {
        if (essayToDelete) {
            // Essay silme logic'i burada olacak
            console.log('Deleting tech-club:', essayToDelete.id);
            setAllEssays(prev => prev.filter(essay => essay.id !== essayToDelete.id));
            setShowDeleteModal(false);
            setEssayToDelete(null);
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

    if (allEssays.length === 0) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-4">
                    {t("allArticles.empty.title")}
                </h2>
                <p className="text-gray-300">
                    {t("allArticles.empty.message")}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                    {t("allArticles.title")} ({allEssays.length})
                </h2>

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
                                        {essay.author}
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
                    onSave={(updatedEssay) => {
                        // Essay güncelleme logic'i burada olacak
                        console.log('Updating tech-club:', updatedEssay);
                        setAllEssays(prev => prev.map(essay =>
                            essay.id === updatedEssay.id ? updatedEssay : essay
                        ));
                        setShowModal(false);
                        setSelectedEssay(null);
                    }}
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