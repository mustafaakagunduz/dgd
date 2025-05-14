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

// Vision Mission için interface (güncellenmiş - CTA eklendi)
export interface StaticVisionMissionData {
    pageTitle: string;
    pageDescription: string;
    vision: {
        title: string;
        content: string;
    };
    mission: {
        title: string;
        content: string;
    };
    cta: {
        title: string;
        description: string;
        button: string;
    };
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

// Vision Mission statik veri - Türkçe
export const staticVisionMissionDataTR: StaticVisionMissionData = {
    pageTitle: "Vizyon & Misyon",
    pageDescription: "DGD Global'in temel değerlerini ve gelecek vizyonunu keşfedin",
    vision: {
        title: "Vizyonumuz",
        content: "Çağdaş, güçlü ve yenilikçi bakış açısına sahip kuruluş temelleri olan, ülke ve tüm gezegen ölçeğinde insana ve doğaya saygılı, her düşünce ve yaklaşıma fırsat veren, ilkeli, rekabetçi ve etik değerler merkezli bir yapılanma sahibiyiz."
    },
    mission: {
        title: "Misyonumuz",
        content: "DGD Global Teknoloji A.Ş. çevre duyarlılığı odağında yerli üretim ekseninde yeşil ve biyo-döngüsel, sürdürülebilir bir yaşam modeli temelinde teknoloji ve bilgi danışmanlığı yanı sıra proje, ürün ve yatırım faaliyetleri yürüten bir şirkettir."
    },
    cta: {
        title: "Bizimle İletişime Geçin",
        description: "Sürdürülebilir geleceğin inşasında bizimle yer alın",
        button: "İletişime Geç"
    }
};

// Vision Mission statik veri - İngilizce
export const staticVisionMissionDataEN: StaticVisionMissionData = {
    pageTitle: "Vision & Mission",
    pageDescription: "Discover DGD Global's core values and future vision",
    vision: {
        title: "Our Vision",
        content: "We are an organization with contemporary, strong, and innovative foundational perspectives, respectful to humanity and nature on a national and planetary scale, providing opportunities for all ideas and approaches, principled, competitive, and centered on ethical values."
    },
    mission: {
        title: "Our Mission",
        content: "DGD Global Technology Inc. is a company that conducts project, product and investment activities, as well as technology and knowledge consulting, based on a green and bio-circular, sustainable life model focused on environmental sensitivity and domestic production."
    },
    cta: {
        title: "Contact Us",
        description: "Join us in building a sustainable future",
        button: "Get in Touch"
    }
};

// Dil bazında veri getirme fonksiyonu
export function getStaticHomeData(language: 'tr' | 'en'): StaticHomeData {
    return language === 'en' ? staticDataEN : staticDataTR;
}

export function getStaticVisionMissionData(language: 'tr' | 'en'): StaticVisionMissionData {
    return language === 'en' ? staticVisionMissionDataEN : staticVisionMissionDataTR;
}