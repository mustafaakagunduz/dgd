import { Metadata } from "next";

export const metadata: Metadata = {
  title: "InnoCore Teknolojileri | DGD Global",
  description: "InnoCore Teknolojileri, yaşamın doğal döngüsünü temel alan, çevreyle uyumlu ve yüksek etkili çözümler sunar. Arıcılık, tarım, sağlık ve enerji alanlarında sürdürülebilir teknolojiler.",
  keywords: [
    "InnoCore",
    "sürdürülebilir teknoloji",
    "Ar-Ge",
    "arıcılık teknolojileri",
    "nano teknoloji",
    "enerji verimliliği",
    "tarım teknolojileri",
    "temizlik teknolojileri",
    "biyoteknoloji",
    "infrared teknoloji",
    "DGD Global"
  ],
  openGraph: {
    title: "InnoCore Teknolojileri | DGD Global",
    description: "Yaşamın doğal döngüsünü temel alan, çevreyle uyumlu ve yüksek etkili teknoloji çözümleri. Arıcılık, tarım, sağlık ve enerji alanlarında bilimsel altyapıya dayalı ürünler.",
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    siteName: "DGD Global",
    images: [
      {
        url: "/assets/images/innocore/innocore-og.jpg",
        width: 1200,
        height: 630,
        alt: "InnoCore Teknolojileri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InnoCore Teknolojileri | DGD Global",
    description: "Sürdürülebilir yaşam için bilimsel çözümler. Arıcılık, tarım, sağlık ve enerji alanlarında yenilikçi teknolojiler.",
    images: ["/assets/images/innocore/innocore-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://dgdglobal.com.tr/inno-core",
    languages: {
      "tr": "https://dgdglobal.com.tr/inno-core",
      "en": "https://dgdglobal.com.tr/en/inno-core",
    },
  },
};