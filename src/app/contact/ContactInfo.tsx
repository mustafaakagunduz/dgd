// ContactInfo.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactInfo() {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-br from-green-800/80 to-green-900/90 backdrop-blur-sm rounded-lg p-4 border border-green-600/30">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-green-600/30 pb-3">
                {t("contact.getInTouch")}
            </h2>

            <div className="space-y-5">
                <div className="group w-full">
                    <div className="flex items-start space-x-4 transition-all duration-300 w-full">
                        <div className="bg-green-800/60 p-3 rounded group-hover:bg-green-700/60 transition-colors shrink-0">
                            <MapPin className="text-green-400" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-base mb-1">{t("contact.address.title")}</h3>
                            <p className="text-gray-200 text-sm leading-relaxed">
                                {t("contact.address.line1")}<br />
                                {t("contact.address.line2")}<br />
                                {t("contact.address.city")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group w-full">
                    <div className="flex items-start space-x-4 transition-all duration-300 w-full">
                        <div className="bg-green-800/60 p-3 rounded group-hover:bg-green-700/60 transition-colors shrink-0">
                            <Phone className="text-green-400" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-base mb-1">{t("contact.phone.title")}</h3>
                            <a href={`tel:${t("contact.phone.number")}`} className="text-gray-200 text-sm hover:text-green-300 transition-colors duration-200">
                                {t("contact.phone.number")}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="group w-full">
                    <div className="flex items-start space-x-4 transition-all duration-300 w-full">
                        <div className="bg-green-800/60 p-3 rounded group-hover:bg-green-700/60 transition-colors shrink-0">
                            <Mail className="text-green-400" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-base mb-1">{t("contact.email.title")}</h3>
                            <a href={`mailto:${t("contact.email.address")}`} className="text-gray-200 text-sm hover:text-green-300 transition-colors duration-200">
                                {t("contact.email.address")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}