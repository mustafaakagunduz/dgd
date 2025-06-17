"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import HistoryCard from "@/app/history/HistoryCard";

const HistoryPage = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-8xl mx-auto">
                <h1 className="mt-8 text-3xl md:text-4xl font-bold text-white text-center mb-14">
                    {t("history.title")}
                </h1>

                {/* Tek paragraf tarihçe kartı */}
                <HistoryCard
                    content={t("history.content")}
                />
            </div>
        </div>
    );
};

export default HistoryPage;