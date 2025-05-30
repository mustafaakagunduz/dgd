"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { getEssayById, Essay } from '@/lib/essays';
import { useParams } from 'next/navigation';
import EssayComponent from '../../../components/tech-club-essayId/Essay';
import Comments from '../../../components/tech-club-essayId/Comments';
import { useLanguage } from '@/contexts/LanguageContext';

const EssayDetailPage = () => {
    const { t } = useLanguage();
    const params = useParams();
    const id = params.essayId as string;
    const [essay, setEssay] = useState<Essay | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEssay();
    }, [id]);

    const loadEssay = async () => {
        try {
            const fetchedEssay = await getEssayById(id);
            if (!fetchedEssay) {
                notFound();
                return;
            }
            setEssay(fetchedEssay);
        } catch (error) {
            console.error('Error loading essay:', error);
            notFound();
        } finally {
            setLoading(false);
        }
    };

    const staggerContainer = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    if (loading) {
        return (
            <div className="min-h-screen py-20 flex items-center justify-center">
                <div className="text-white text-xl">Makale yükleniyor...</div>
            </div>
        );
    }

    if (!essay) {
        notFound();
        return null;
    }

    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="min-h-screen py-20"
        >
            <div className="container mx-auto px-4 max-w-4xl space-y-8">
                {/* Essay Component */}
                <EssayComponent essay={essay} />

                {/* Comments Component */}
                <Comments essayId={id} />

                {/* Back Button */}
                <motion.div
                    variants={fadeInUp}
                    className="text-center"
                >
                    <a
                        href="/tech-club"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        {t("techClub.backButton")}
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default EssayDetailPage;