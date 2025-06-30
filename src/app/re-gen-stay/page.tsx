"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Page() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dark header strip for navbar visibility */}
      <div className="bg-gray-900 h-22 w-full"></div>
      
      <div className="flex items-start justify-center pt-8" style={{minHeight: 'calc(100vh - 80px)'}}>
        <div className="text-center">
          {/* Regen-stay Logo */}
          <div className="mb-4">
            <Image
              src="/assets/images/regen-stay/regen-stay.jpeg"
              alt="Regen-stay Logo"
              width={400}
              height={120}
              className="mx-auto"
              priority
            />
          </div>
          
          {/* Existing card */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.678-2.153-1.415-3.414l5-5A2 2 0 009 9.172V5L8 4z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("development.title")}
            </h1>
            <p className="text-gray-600">
              {t("development.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}