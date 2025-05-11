"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { ContactMap } from "./ContactMap";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Contact() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Tüm componentler aynı anda animasyon yapacak
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Hero Background Image */}
            <div className="fixed inset-0 w-full h-full">
                <Image
                    src="/assets/images/heroimage.jpg"
                    alt="Contact Background"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Dark overlay for better readability */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-24 pb-8 max-h-screen overflow-auto">
                <div className="container mx-auto px-4">
                    {/* Section Header - Animasyonlu */}
                    <div
                        className={`
                            text-center mb-6 transition-all duration-1000 ease-out
                            ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-20'
                        }
                        `}
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {t("contact.title")}
                        </h1>
                        <p className="text-gray-100 text-base max-w-2xl mx-auto">
                            {t("contact.description")}
                        </p>
                    </div>

                    {/* Layout: Form on left, Address and Map on right */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        {/* Contact Form - Sol yan animasyon */}
                        <div
                            className={`
                                h-full transition-all duration-1000 ease-out
                                ${isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-20'
                            }
                            `}
                        >
                            <ContactForm />
                        </div>

                        {/* Contact Info and Map - Sağ yan animasyon */}
                        <div className="flex flex-col gap-6 h-full">
                            <div
                                className={`
                                    min-h-[200px] transition-all duration-1000 ease-out
                                    ${isVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-20'
                                }
                                `}
                            >
                                <ContactInfo />
                            </div>
                            <div
                                className={`
                                    flex-1 min-h-[300px] transition-all duration-1000 ease-out
                                    ${isVisible
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-20'
                                }
                                `}
                            >
                                <ContactMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}