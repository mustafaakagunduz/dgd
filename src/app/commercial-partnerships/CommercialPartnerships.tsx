'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
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

    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-12 text-white">
                    {t('partnerships.title')}
                </h1>

                <div className="space-y-6">
                    {partners.map((partner) => (
                        <Card
                            key={partner.id}
                            className="overflow-hidden border border-gray-700 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-opacity-95 bg-opacity-90"
                            style={{
                                backgroundColor: 'rgba(229, 231, 235, 0.9)',
                                backdropFilter: 'blur(1px)',
                            }}
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3 bg-white/90 backdrop-blur-sm">
                                    <div className="relative h-64 md:h-full min-h-[250px]">
                                        <Image
                                            src={`/assets/images/${partner.logo}`}
                                            alt={partner.name}
                                            fill
                                            className="object-contain p-8"
                                        />
                                    </div>
                                </div>
                                <div className="md:w-2/3 p-6">
                                    <h2 className="text-2xl font-semibold mb-4 text-black">
                                        {partner.name}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {t(partner.descriptionKey)}
                                    </p>
                                    <Link
                                        href={partner.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <span>{partner.website}</span>
                                        <ExternalLink size={16} />
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}