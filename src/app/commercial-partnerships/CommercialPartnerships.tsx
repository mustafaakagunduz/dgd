'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ExternalLink } from 'lucide-react'

const partners = [
    {
        id: 1,
        name: '7Cbasalia',
        logo: '7cbasalia.png',
        descriptionKey: 'partnerships.partners.7cbasalia.description',
        website: 'https://www.7cbasalia.com'
    },
    {
        id: 2,
        name: 'Alba Teknoloji',
        logo: 'alba.png',
        descriptionKey: 'partnerships.partners.alba.description',
        website: 'http://www.albateknoloji.com'
    },
    {
        id: 3,
        name: 'DC',
        logo: 'dc.png',
        descriptionKey: 'partnerships.partners.dc.description',
        website: 'https://decorcenter.com.tr'
    },
    {
        id: 4,
        name: 'DPS',
        logo: 'dps.png',
        descriptionKey: 'partnerships.partners.dps.description',
        website: 'https://dpsdekor.com'
    },
    {
        id: 5,
        name: 'Element Çevre',
        logo: 'element.png',
        descriptionKey: 'partnerships.partners.element.description',
        website: 'https://elementcevre.com.tr'
    },
    {
        id: 6,
        name: 'IQ Partners',
        logo: 'iq-partners.png',
        descriptionKey: 'partnerships.partners.iqPartners.description',
        website: 'https://iqpartners.com.tr'
    }
]

export default function CommercialPartnerships() {
    const { t } = useLanguage()

    // Motion variants tanımlamaları
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-4 py-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-12 text-white"
                >
                    {t('partnerships.title')}
                </motion.h1>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            variants={cardVariants}
                            className="relative overflow-hidden"
                        >
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:shadow-green-500/20">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-white/90 backdrop-blur-sm rounded-t-xl md:rounded-tr-none md:rounded-l-xl overflow-hidden">
                                        <div className="relative h-64 md:h-full min-h-[250px]">
                                            <Image
                                                src={`/assets/images/${partner.logo}`}
                                                alt={partner.name}
                                                fill
                                                className="object-contain p-8"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 p-6 md:p-8">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white mb-2">{partner.name}</h2>
                                                <div className="w-20 h-1 bg-green-500 rounded-full"></div>
                                            </div>
                                        </div>
                                        <p className="text-gray-200 leading-relaxed text-[16px] mb-6">
                                            {t(partner.descriptionKey)}
                                        </p>
                                        <Link
                                            href={partner.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                                        >
                                            <span>{partner.website}</span>
                                            <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300"></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}