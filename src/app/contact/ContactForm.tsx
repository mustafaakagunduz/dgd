// ContactForm.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    message: string;
    kvkApproval: boolean;
}

export function ContactForm() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        kvkApproval: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showKvkModal, setShowKvkModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Mail gönderilemedi");
            }

            setSubmitted(true);
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                message: "",
                kvkApproval: false
            });

            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleKvkClose = () => {
        setShowKvkModal(false);
    };

    return (
        <div className="bg-gradient-to-br from-green-800/80 to-green-900/90 backdrop-blur-sm rounded-lg p-4 border border-green-600/30 h-full flex flex-col">
            <h2 className="text-lg font-bold text-white mb-4">
                {t("contact.form.title")}
            </h2>

            {submitted && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded">
                    <p className="text-green-300 text-center text-sm">
                        {t("contact.form.successMessage")}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-white text-sm mb-1">
                            {t("contact.form.fullName")} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 text-sm rounded bg-green-900/40 border border-green-600/30 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                            placeholder={t("contact.form.placeholders.fullName")}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white text-sm mb-1">
                            {t("contact.form.email")} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 text-sm rounded bg-green-900/40 border border-green-600/30 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                            placeholder={t("contact.form.placeholders.email")}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-white text-sm mb-1">
                            {t("contact.form.phone")} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 text-sm rounded bg-green-900/40 border border-green-600/30 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                            placeholder={t("contact.form.placeholders.phone")}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-white text-sm mb-1">
                            {t("contact.form.message")}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2.5 text-sm rounded bg-green-900/40 border border-green-600/30 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors resize-none"
                            placeholder={t("contact.form.placeholders.message")}
                        />
                    </div>

                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="kvkApproval"
                            name="kvkApproval"
                            checked={formData.kvkApproval}
                            onChange={handleChange}
                            required
                            className="mt-1 w-4 h-4 accent-green-500 bg-green-900/40 border-green-600/30 rounded focus:ring-green-300 focus:ring-offset-0"
                        />
                        <label htmlFor="kvkApproval" className="text-white text-sm leading-relaxed">
                            <button
                                type="button"
                                onClick={() => setShowKvkModal(true)}
                                className="text-green-300 hover:text-green-200 underline focus:outline-none"
                            >
                                {t("contact.form.kvkText")}
                            </button> {t("contact.form.kvkAgreement")} <span className="text-red-400">*</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !formData.kvkApproval}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-700/50 disabled:opacity-50 text-white font-medium py-3 px-4 rounded transition-all duration-300 flex items-center justify-center space-x-2 mt-6"
                >
                    {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <Send size={16} />
                            <span className="text-sm">{t("contact.form.submit")}</span>
                        </>
                    )}
                </button>
            </form>

            {/* KVK Modal */}
            <Dialog open={showKvkModal} onOpenChange={setShowKvkModal}>
                <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-green-800 to-green-900 border-green-600 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white text-lg">
                            {t("kvk.modal.title")}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription asChild>
                        <div className="space-y-4 text-white text-base max-h-[60vh] overflow-y-auto pr-2">
                            <p>{t("kvk.modal.introduction")}</p>
                            <p>{t("kvk.modal.dataTypes")}</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("kvk.modal.purposes.communication")}</li>
                                <li>{t("kvk.modal.purposes.support")}</li>
                                <li>{t("kvk.modal.purposes.response")}</li>
                            </ul>
                            <p>{t("kvk.modal.dataSharing")}</p>
                            <p>{t("kvk.modal.rights")}</p>
                            <p>{t("kvk.modal.consentStatement")}</p>
                        </div>
                    </DialogDescription>
                    <DialogFooter>
                        <button
                            onClick={handleKvkClose}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded transition-all duration-300"
                        >
                            Okudum, Anladım
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}