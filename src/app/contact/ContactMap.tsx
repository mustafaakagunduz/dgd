// ContactMap.tsx
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactMap() {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-br from-green-800/80 to-green-900/90 backdrop-blur-sm rounded-lg p-2 border border-green-600/30 flex flex-col h-full">
            <div className="flex-1 relative overflow-hidden rounded min-h-[200px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.0426936116847!2d29.01947557579118!3d41.10628281293177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5a36c56e5f3%3A0xf7a7e5b2f3c6c5e5!2zxLBzdGFuYnVsIFRla25payDDnG5pdmVyc2l0ZXNp!5e0!3m2!1str!2str!4v1703123456789!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded h-full"
                    title="DGD Global Technology Inc. Istanbul Technical University"
                ></iframe>
            </div>

            {/* Map caption */}
            <div className="mt-2 text-center">
                <p className="text-xs text-gray-200">
                    Istanbul Technical University Campus
                </p>
            </div>
        </div>
    );
}