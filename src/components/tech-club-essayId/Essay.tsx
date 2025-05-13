"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Essay } from '@/lib/essays';

interface EssayProps {
    essay: Essay;
}

const EssayComponent: React.FC<EssayProps> = ({ essay }) => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    // Author bilgisini güvenli şekilde al
    const authorName = essay.profiles?.name || 'Unknown Author';
    const authorInitials = authorName.split(' ').map((name: string) => name[0]).join('');

    return (
        <>
            {/* Hero Image */}
            {essay.image_url && (
                <motion.div
                    variants={fadeInUp}
                    className="relative h-64 md:h-80 lg:h-96 w-full rounded-2xl overflow-hidden mb-8"
                >
                    <Image
                        src={essay.image_url}
                        alt={essay.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
            )}

            {/* Article Content */}
            <motion.article
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 md:p-12"
            >
                {/* Title */}
                <motion.h1
                    variants={fadeInUp}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                >
                    {essay.title}
                </motion.h1>

                {/* Meta Information */}
                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-white/20"
                >
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                                {authorInitials}
                            </span>
                        </div>
                        <div>
                            <p className="text-green-400 font-semibold">
                                {authorName}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Article Content */}
                <motion.div
                    variants={fadeInUp}
                    className="max-w-none"
                >
                    <div
                        className="space-y-4"
                        dangerouslySetInnerHTML={{
                            __html: essay.content
                                .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">')
                                .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-white mt-6 mb-3">')
                                .replace(/<p>/g, '<p style="color: white !important" class="leading-relaxed mb-4">')
                        }}
                    />
                </motion.div>
            </motion.article>
        </>
    );
};

export default EssayComponent;