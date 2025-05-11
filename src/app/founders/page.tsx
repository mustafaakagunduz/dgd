"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import FounderCard from "@/app/founders/FounderCard";

const FoundersPage = () => {
    const { t } = useLanguage();

    const founders = [
        {
            key: "dilek",
            imageSrc: "/assets/images/dilek-koca.jpg",
            nameKey: "founders.dilek.name",
            titleKey: "founders.dilek.title",
            bioKey: "founders.dilek.bio"
        },
        {
            key: "devir",
            imageSrc: "/assets/images/devir-dincer.jpg",
            nameKey: "founders.devir.name",
            titleKey: "founders.devir.title",
            bioKey: "founders.devir.bio"
        },
        {
            key: "gokhan",
            imageSrc: "/assets/images/gokhan-celik.jpg",
            nameKey: "founders.gokhan.name",
            titleKey: "founders.gokhan.title",
            bioKey: "founders.gokhan.bio"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                    {t("founders.title")}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {founders.map((founder) => (
                        <FounderCard
                            key={founder.key}
                            imageSrc={founder.imageSrc}
                            name={t(founder.nameKey)}
                            title={t(founder.titleKey)}
                            bio={t(founder.bioKey)}
                            showMore={t("about.showMore")}
                            showLess={t("about.showLess")}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoundersPage;