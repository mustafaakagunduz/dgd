"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import AdvisorCard from "@/app/advisors/AdvisorCard";

const AdvisorsPage = () => {
    const { t } = useLanguage();

    const advisors = [
        {
            key: "advisor1",
            imageSrc: "/assets/images/ece-balcan.jpg",
            nameKey: "advisors.advisor1.name",
            titleKey: "advisors.advisor1.title",

        },
        {
            key: "advisor2",
            imageSrc: "/assets/images/metin-balcan.jpg",
            nameKey: "advisors.advisor2.name",
            titleKey: "advisors.advisor2.title",

        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="mt-8 text-3xl md:text-4xl font-bold text-white text-center mb-14">
                    {t("advisors.title")}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                    {advisors.map((advisor) => (
                        <AdvisorCard
                            key={advisor.key}
                            imageSrc={advisor.imageSrc}
                            name={t(advisor.nameKey)}
                            title={t(advisor.titleKey)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvisorsPage;