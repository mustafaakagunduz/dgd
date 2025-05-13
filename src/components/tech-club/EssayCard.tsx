"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Essay } from '@/lib/essays';

interface EssayCardProps {
    essay: Essay;
    index: number;
}

const EssayCard: React.FC<EssayCardProps> = ({ essay, index }) => {
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6,
                delay: index * 0.1
            }
        }
    };

    // Author name'i güvenli şekilde al
    const authorName = essay.profiles?.name || 'Unknown Author';

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
            }}
            className="group cursor-pointer"
        >
            <Link href={`/tech-club/${essay.id}`} className="block h-full">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 h-full">
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={essay.image_url || '/api/placeholder/400/300'}
                            alt={essay.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
                            {essay.title}
                        </h3>

                        <p className="text-green-400 text-sm mb-3 font-medium">
                            {authorName}
                        </p>

                        <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">
                            {essay.summary}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default EssayCard;