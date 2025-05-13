"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getPendingEssays, Essay } from '@/lib/essays';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";
import ArticleModal from './ArticleModal';

const WaitList = () => {
    const { isAdmin } = useAuth();
    const { t } = useLanguage();
    const [pendingArticles, setPendingArticles] = useState<Essay[]>(getPendingEssays());
    const [selectedArticle, setSelectedArticle] = useState<Essay | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Admin kontrolü
    if (!isAdmin) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-4">
                    {t("waitlist.noAccess.title")}
                </h2>
                <p className="text-gray-300">
                    {t("waitlist.noAccess.message")}
                </p>
            </div>
        );
    }

    const handleApprove = (essayId: string) => {
        // Essay onaylama logic'i burada olacak
        console.log('Approving tech-club:', essayId);
        setPendingArticles(prev => prev.filter(essay => essay.id !== essayId));
    };

    const handleReject = (essayId: string) => {
        // Essay reddetme logic'i burada olacak
        console.log('Rejecting tech-club:', essayId);
        setPendingArticles(prev => prev.filter(essay => essay.id !== essayId));
    };

    const handleViewArticle = (essay: Essay) => {
        setSelectedArticle(essay);
        setShowModal(true);
    };

    if (pendingArticles.length === 0) {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-4">
                    {t("waitlist.empty.title")}
                </h2>
                <p className="text-gray-300">
                    {t("waitlist.empty.message")}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                    {t("waitlist.title")} ({pendingArticles.length})
                </h2>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/20">
                                <TableHead className="text-white font-medium">
                                    {t("waitlist.table.title")}
                                </TableHead>
                                <TableHead className="text-white font-medium">
                                    {t("waitlist.table.author")}
                                </TableHead>
                                <TableHead className="text-white font-medium">
                                    {t("waitlist.table.summary")}
                                </TableHead>
                                <TableHead className="text-white font-medium text-center">
                                    {t("waitlist.table.actions")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingArticles.map((essay) => (
                                <TableRow key={essay.id} className="border-white/20 hover:bg-white/5">
                                    <TableCell
                                        className="font-medium text-white cursor-pointer hover:text-green-400 transition-colors"
                                        onClick={() => handleViewArticle(essay)}
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
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewArticle(essay)}
                                                className="h-8 w-8 p-0 border-blue-500 hover:bg-blue-500/20 hover:border-blue-400"
                                                title={t("waitlist.view")}
                                            >
                                                <Eye className="h-4 w-4 text-blue-500" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleApprove(essay.id)}
                                                className="h-8 w-8 p-0 border-green-500 hover:bg-green-500/20 hover:border-green-400"
                                                title={t("waitlist.approve")}
                                            >
                                                <Check className="h-4 w-4 text-green-500" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleReject(essay.id)}
                                                className="h-8 w-8 p-0 border-red-500 hover:bg-red-500/20 hover:border-red-400"
                                                title={t("waitlist.reject")}
                                            >
                                                <X className="h-4 w-4 text-red-500" />
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
            {selectedArticle && (
                <ArticleModal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedArticle(null);
                    }}
                    essay={selectedArticle}
                    onApprove={() => {
                        handleApprove(selectedArticle.id);
                        setShowModal(false);
                        setSelectedArticle(null);
                    }}
                    onReject={() => {
                        handleReject(selectedArticle.id);
                        setShowModal(false);
                        setSelectedArticle(null);
                    }}
                />
            )}
        </>
    );
};

export default WaitList;