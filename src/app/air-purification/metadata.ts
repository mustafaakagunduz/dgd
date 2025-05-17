import { Metadata } from 'next';

// Türkçe ve İngilizce karma metadata oluşturuyoruz.
// Bu yaklaşım hem Türkçe hem de İngilizce SEO için faydalı olacaktır
export const metadata: Metadata = {
  title: 'Nano Hava Temizleme Teknolojisi | Yeni Nesil Hava Temizleme Sistemleri | DGD Global',
  description: 'Saatte 450 m3 alanı dezenfekte edebilen ve alan genişlemesinde performans kaybı olmadan 4500 m2 alanı tüm virüs ve diğer kirlilik faktörlerinden temizleyen nano hava temizleme teknolojimiz.',
  keywords: ['hava temizleme', 'nano teknoloji', 'oksijen dengesi', 'virüs dezenfektasyonu', 'meyve verimliliği', 'air purification', 'nano technology', 'oxygen balance', 'virus disinfection', 'fruit yield', 'DGD Global'],
  alternates: {
    languages: {
      'tr-TR': '/air-purification',
      'en-US': '/en/air-purification'
    },
  },
  openGraph: {
    title: 'Nano Hava Temizleme Teknolojisi | Next-Gen Air Purification Systems | DGD Global',
    description: 'Saatte 450 m3 alanı dezenfekte edebilen ve 4500 m2 alanı tüm virüs ve kirlilik faktörlerinden temizleyen teknoloji | Technology capable of purifying 450 m3 per hour, cleansing 4500 m2 area from all virus and pollution factors.',
    images: ['/assets/images/air-purification.jpg'],
    locale: 'tr_TR',
    alternateLocale: ['en_US'],
  },
  // Twitter kartı ekleyerek sosyal medya görünürlüğünü artırıyoruz
  twitter: {
    card: 'summary_large_image',
    title: 'Nano Hava Temizleme Teknolojisi | DGD Global',
    description: 'Saatte 450 m3 alanı dezenfekte edebilen ve 4500 m2 alanı tüm virüs ve kirlilik faktörlerinden temizleyen nano teknoloji.',
    images: ['/assets/images/air-purification.jpg']
  },
  // Yerel iş bilgisi ekleyerek yerel aramalarda öne çıkmayı sağlıyoruz
  verification: {
    google: 'your-google-verification-code',
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
  other: {
    'yandex-verification': 'yandex-verification-code', // Yandex için
    'format-detection': 'telephone=no', // Telefon numaralarını otomatik algılamayı engeller
    'geo.region': 'TR', // Türkiye bölgesi
    'geo.placename': 'Istanbul', // İstanbul
  }
};