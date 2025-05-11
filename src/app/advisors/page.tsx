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
            bioKey: "advisors.advisor1.bio"
        },
        {
            key: "advisor2",
            imageSrc: "/assets/images/metin-balcan.jpg",
            nameKey: "advisors.advisor2.name",
            titleKey: "advisors.advisor2.title",
            bioKey: "advisors.advisor2.bio"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                    {t("advisors.title")}
                </h1>

                {/* İki danışman için ortalanmış grid */}
                <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                    {advisors.map((advisor) => (
                        <div key={advisor.key} className="w-full sm:w-auto sm:max-w-[350px]">
                            <AdvisorCard
                                imageSrc={advisor.imageSrc}
                                name={t(advisor.nameKey)}
                                title={t(advisor.titleKey)}
                                bio={t(advisor.bioKey)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvisorsPage;