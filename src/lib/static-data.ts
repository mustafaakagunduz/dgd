// src/lib/static-data.ts
// Ana sayfa için statik veriler

export interface StaticHomeData {
    hero: {
        title: string;
        description: string;
    };
    about: {
        sectionDescription: string;
        items: Array<{
            title: string;
            content: string;
        }>;
    };
    // Diğer bölümler için de eklenebilir
}

// Türkçe statik veriler
export const staticDataTR: StaticHomeData = {
    hero: {
        title: "DGD GLOBAL",
        description: "Çevre duyarlılığı odağında yerli üretim ekseninde yeşil ve biyo-döngüsel, sürdürülebilir yaşam modeli geliştiren teknoloji şirketidir."
    },
    about: {
        sectionDescription: "DGD Global'in temel değerlerini keşfedin.",
        items: [
            {
                title: "DÖNGÜSELLİK",
                content: "Başta iklim değişimleri olmak üzere küresel çapta yaşanan ve günden güne kendisini daha çok hissettiren çevre ve atmosfer sorunları, tüm gelişmiş ülkelerce başta karbon ayak izi yaklaşımı olmak üzere çok sayıda düzenleme ve yaptırımlarla başa çıkılmaya çalışılan; ancak yine de önüne geçilemeyen bir felaket senaryosu olarak karşımızda duruyor."
            },
            {
                title: "İNOVASYON",
                content: "Tüm faaliyet konularında geçerli olmak üzere yaşamın tüm sahalarında yenilikçi ve katma değerli ürün, hizmet ve teknolojileri temel kabul eden şirket politikamız, yaşadığımız çevreden başlayıp küresel çapta etkiler oluşturmak üzere yoğun çalışmalar yürütür."
            },
            {
                title: "ÇÖZÜM ORTAKLIĞI",
                content: "Gerek yeni nesil teknolojiler gerekse tam döngüsel atık yönetimi projelerini çözüm ortağı olduğu tüm inovatif teknoloji odakları ile yaptığı güçlü protokoller ve sözleşmeler ile kayıt altına alan DGD Global Teknoloji A.Ş."
            }
        ]
    }
};

// İngilizce statik veriler
export const staticDataEN: StaticHomeData = {
    hero: {
        title: "DGD GLOBAL",
        description: "A technology company focused on environmental awareness, developing green and bio-circular, sustainable life models based on domestic production."
    },
    about: {
        sectionDescription: "Discover DGD Global's core values.",
        items: [
            {
                title: "CIRCULARITY",
                content: "Environmental and atmospheric problems, especially climate change, which are experienced globally and felt more intensely day by day, are a disaster scenario that developed countries try to tackle through numerous regulations and sanctions, primarily with carbon footprint approaches."
            },
            {
                title: "INNOVATION",
                content: "Our company policy, which considers innovative and value-added products, services, and technologies as fundamental in all areas of life for all business fields, carries out intensive work to create global impacts starting from our immediate environment."
            },
            {
                title: "SOLUTION PARTNERSHIP",
                content: "DGD Global Technology Inc., which records both next-generation technologies and complete circular waste management projects through strong protocols and agreements with all innovative technology hubs it partners with."
            }
        ]
    }
};

// Dil bazında veri getirme fonksiyonu
export function getStaticHomeData(language: 'tr' | 'en'): StaticHomeData {
    return language === 'en' ? staticDataEN : staticDataTR;
}