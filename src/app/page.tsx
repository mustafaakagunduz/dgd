// src/app/page.tsx - Geliştirilmiş SSG versiyonu
import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import Newsletter from "@/components/homepage/Newsletter";
import { getStaticHomeData } from "@/lib/static-data";
import { Metadata } from "next";

// generateMetadata fonksiyonu - dinamik metadata
export async function generateMetadata(): Promise<Metadata> {
    // Burada statik verilerden metadata oluşturabilirsiniz
    const staticData = getStaticHomeData('tr'); // Default Türkçe

    return {
        title: "DGD Global Technology | Sürdürülebilir Teknoloji Çözümleri",
        description: staticData.hero.description,
        keywords: ["DGD Global", "sürdürülebilir teknoloji", "yeşil teknoloji", "biyo döngüsel", "çevre teknolojileri"],
        openGraph: {
            title: staticData.hero.title,
            description: staticData.hero.description,
            images: ['/assets/images/heroimage.jpg'],
            type: 'website',
            locale: 'tr_TR',
            alternateLocale: ['en_US'],
        },
        twitter: {
            card: 'summary_large_image',
            title: staticData.hero.title,
            description: staticData.hero.description,
            images: ['/assets/images/heroimage.jpg'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: 'your-google-verification-code', // Google Search Console
            // yandex: 'your-yandex-verification-code', // Yandex için
        },
    };
}

export default function Home() {
    // Statik verileri al (build time'da)
    const staticDataTR = getStaticHomeData('tr');
    const staticDataEN = getStaticHomeData('en');

    return (
        <main
            style={{
                background: 'linear-gradient(to bottom, #4b8224, #374151, #000000, #000000)'
            }}
        >
            <div className="relative">
                {/* Hero'ya statik veri geçir */}
                <Hero initialData={staticDataTR.hero} />
                <div
                    className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-10"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, transparent 90%, #4b8224)'
                    }}
                />
            </div>

            {/* About'a statik veri geçir */}
            <About initialData={staticDataTR.about} />

            {/* Newsletter component'i zaten optimize */}
            <Newsletter />

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "DGD Global Technology",
                        "description": staticDataTR.hero.description,
                        "url": "https://dgdglobal.com",
                        "logo": "https://dgdglobal.com/assets/images/logo.png",
                        "sameAs": [
                            // Sosyal medya hesapları
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Istanbul",
                            "addressCountry": "TR"
                        }
                    })
                }}
            />
        </main>
    );
}

// Bu sayfanın statik olduğunu belirt
export const dynamic = 'force-static';
export const revalidate = false; // Asla revalidate etme