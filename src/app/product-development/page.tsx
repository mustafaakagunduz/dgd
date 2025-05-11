"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductDevRDCard from "./ProductDevCard";

const ProductDevRDPage = () => {
    const { t } = useLanguage();

    const teamMembers = [
        {
            key: "gurhan",
            imageSrc: "/assets/images/gurhan-dural.jpg",
            nameKey: "team.gurhan.name",
            titleKey: "team.gurhan.title",
            bioKey: "team.gurhan.bio"
        },
        {
            key: "ferkan",
            imageSrc: "/assets/images/ferkan-celik.jpg",
            nameKey: "team.ferkan.name",
            titleKey: "team.ferkan.title",
            bioKey: "team.ferkan.bio"
        },
        {
            key: "mucahit",
            imageSrc: "/assets/images/mucahit-unal.jpg",
            nameKey: "team.mucahit.name",
            titleKey: "team.mucahit.title",
            bioKey: "team.mucahit.bio"
        },
        {
            key: "baris",
            imageSrc: "/assets/images/baris-dincer.jpg",
            nameKey: "team.baris.name",
            titleKey: "team.baris.title",
            bioKey: "team.baris.bio"
        },
        {
            key: "ugur",
            imageSrc: "/assets/images/ugur-aksoy.jpg",
            nameKey: "team.ugur.name",
            titleKey: "team.ugur.title",
            bioKey: "team.ugur.bio"
        },
        {
            key: "ahmet",
            imageSrc: "/assets/images/ahmet-fidanci.jpg",
            nameKey: "team.ahmet.name",
            titleKey: "team.ahmet.title",
            bioKey: "team.ahmet.bio"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                    {t("team.title")}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <ProductDevRDCard
                            key={member.key}
                            imageSrc={member.imageSrc}
                            name={t(member.nameKey)}
                            title={t(member.titleKey)}
                            bio={t(member.bioKey)}
                            showMore={t("about.showMore")}
                            showLess={t("about.showLess")}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDevRDPage;