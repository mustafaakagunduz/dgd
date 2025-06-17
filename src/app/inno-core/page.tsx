"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import InnoCoreCard from "@/components/inno-core/InnoCoreCard";
import Image from "next/image";

interface Product {
    id: number;
    nameKey: string;
    descriptionKey: string;
    image: string;
    status: "proven" | "development";
    category: string;
}

const InnoCorePage = () => {
    const { t } = useLanguage();

    const products: Product[] = [
        {
            id: 1,
            nameKey: "innocore.products.oxygenBeeFeeder.name",
            descriptionKey: "innocore.products.oxygenBeeFeeder.description",
            image: "/assets/images/innocore/bee-feeder.jpg", // placeholder
            status: "proven", // "proven" or "development"
            category: "innocore.categories.beekeeping"
        },
        {
            id: 2,
            nameKey: "innocore.products.autoFrameMachine.name",
            descriptionKey: "innocore.products.autoFrameMachine.description",
            image: "/assets/images/innocore/frame-machine.jpg", // placeholder
            status: "development",
            category: "innocore.categories.smartBeekeeping"
        },
        {
            id: 3,
            nameKey: "innocore.products.smartQueenBox.name",
            descriptionKey: "innocore.products.smartQueenBox.description",
            image: "/assets/images/innocore/queen-box.jpg", // placeholder
            status: "development",
            category: "innocore.categories.digitalBeekeeping"
        },
        {
            id: 4,
            nameKey: "innocore.products.infraredHiveHeating.name",
            descriptionKey: "innocore.products.infraredHiveHeating.description",
            image: "/assets/images/innocore/hive-heating.jpg", // placeholder
            status: "development",
            category: "innocore.categories.energyEfficiency"
        },
        {
            id: 5,
            nameKey: "innocore.products.nanoHeatPaint.name",
            descriptionKey: "innocore.products.nanoHeatPaint.description",
            image: "/assets/images/innocore/heat-paint.jpg", // placeholder
            status: "development",
            category: "innocore.categories.nanoCoating"
        },
        {
            id: 6,
            nameKey: "innocore.products.hybridPanelRadiator.name",
            descriptionKey: "innocore.products.hybridPanelRadiator.description",
            image: "/assets/images/innocore/panel-radiator.jpg", // placeholder
            status: "development",
            category: "innocore.categories.smartHeating"
        },
        {
            id: 7,
            nameKey: "innocore.products.greenhouseHeatingPanel.name",
            descriptionKey: "innocore.products.greenhouseHeatingPanel.description",
            image: "/assets/images/innocore/greenhouse-panel.jpg", // placeholder
            status: "development",
            category: "innocore.categories.agriculturalHeating"
        },
        {
            id: 8,
            nameKey: "innocore.products.underDeskHeating.name",
            descriptionKey: "innocore.products.underDeskHeating.description",
            image: "/assets/images/innocore/desk-heating.jpg", // placeholder
            status: "development",
            category: "innocore.categories.portableHeating"
        },
        {
            id: 9,
            nameKey: "innocore.products.infraredDryingSystem.name",
            descriptionKey: "innocore.products.infraredDryingSystem.description",
            image: "/assets/images/innocore/drying-system.jpg", // placeholder
            status: "development",
            category: "innocore.categories.dryingTechnology"
        },
        {
            id: 10,
            nameKey: "innocore.products.physiotherapyUnit.name",
            descriptionKey: "innocore.products.physiotherapyUnit.description",
            image: "/assets/images/innocore/physiotherapy.jpg", // placeholder
            status: "development",
            category: "innocore.categories.veterinaryTech"
        },
        {
            id: 11,
            nameKey: "innocore.products.negativeIonAirCleaner.name",
            descriptionKey: "innocore.products.negativeIonAirCleaner.description",
            image: "/assets/images/innocore/air-cleaner.jpg", // placeholder
            status: "development",
            category: "innocore.categories.cleaningTech"
        },
        {
            id: 12,
            nameKey: "innocore.products.agriculturalWaterCleaner.name",
            descriptionKey: "innocore.products.agriculturalWaterCleaner.description",
            image: "/assets/images/innocore/water-cleaner.jpg", // placeholder
            status: "development",
            category: "innocore.categories.waterManagement"
        },
        {
            id: 13,
            nameKey: "innocore.products.antibacterialCleaningLiquid.name",
            descriptionKey: "innocore.products.antibacterialCleaningLiquid.description",
            image: "/assets/images/innocore/cleaning-liquid.jpg", // placeholder
            status: "proven",
            category: "innocore.categories.foodHygiene"
        },
        {
            id: 14,
            nameKey: "innocore.products.maklorozCream.name",
            descriptionKey: "innocore.products.maklorozCream.description",
            image: "/assets/images/innocore/makloz-cream.jpg", // placeholder
            status: "development",
            category: "innocore.categories.healthcare"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Dark header strip for navbar visibility */}
            <div className="bg-gray-900 h-20 w-full"></div>
            
            <div className="pt-8 pb-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        {/* InnoCore Logo */}
                        <div className="mb-3">
                            <Image
                                src="/assets/images/innocore/innocore-logo.png"
                                alt="InnoCore Logo"
                                width={400}
                                height={120}
                                className="mx-auto"
                                priority
                            />
                        </div>
                        
                        {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t("innocore.title")}
                        </h1> */}
                        <p className="text-xl text-gray-700 mb-8">
                            {t("innocore.subtitle")}
                        </p>
                        
                        {/* Introduction Card */}
                        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-8 md:p-10">
                            <div className="text-left space-y-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700 leading-relaxed">{t("innocore.intro.paragraph1")}</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700 leading-relaxed">{t("innocore.intro.paragraph2")}</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700 leading-relaxed">{t("innocore.intro.paragraph3")}</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700 leading-relaxed">{t("innocore.intro.paragraph4")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <InnoCoreCard
                                key={product.id}
                                id={product.id}
                                name={t(product.nameKey)}
                                description={t(product.descriptionKey)}
                                image={product.image}
                                status={product.status}
                                category={t(product.category)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnoCorePage;