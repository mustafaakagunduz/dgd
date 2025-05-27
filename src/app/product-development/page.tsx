"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductDevRDCard from "./ProductDevCard";

const ProductDevRDPage = () => {
    const { t } = useLanguage();

    const teamMembers = [
        {
            key: "aydemir",
            imageSrc: "/assets/images/aydemir-oz.jpg",
            nameKey: "team.aydemir.name",
            titleKey: "team.aydemir.title",

        },
        {
            key: "ferkan",
            imageSrc: "/assets/images/ferkan-celik.jpg",
            nameKey: "team.ferkan.name",
            titleKey: "team.ferkan.title",

        },
        {
            key: "samed",
            imageSrc: "/assets/images/samed-kizilhan.jpg",
            nameKey: "team.samed.name",
            titleKey: "team.samed.title",

        },
        {
            key: "baris",
            imageSrc: "/assets/images/baris-dincer.jpg",
            nameKey: "team.baris.name",
            titleKey: "team.baris.title",

        },
        {
            key: "ugur",
            imageSrc: "/assets/images/ugur-aksoy.jpg",
            nameKey: "team.ugur.name",
            titleKey: "team.ugur.title",

        },
        {
            key: "ahmet",
            imageSrc: "/assets/images/ahmet-fidanci.jpg",
            nameKey: "team.ahmet.name",
            titleKey: "team.ahmet.title",

        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                    {t("team.title")}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {teamMembers.map((member) => (
                        <ProductDevRDCard
                            key={member.key}
                            imageSrc={member.imageSrc}
                            name={t(member.nameKey)}
                            title={t(member.titleKey)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDevRDPage;