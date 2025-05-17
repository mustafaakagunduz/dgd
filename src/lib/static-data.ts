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
                content: "Başta iklim değişiklikleri olmak üzere küresel çapta yaşanan ve her geçen gün etkisini daha fazla hissettiren çevre ve atmosfer sorunları, gelişmiş ülkeler tarafından karbon ayak izi yaklaşımı başta olmak üzere çeşitli düzenleme ve yaptırımlarla kontrol altına alınmaya çalışılmaktadır. Ancak tüm bu çabalara rağmen bu sorunların önüne geçilememektedir ve bu durum, insanlık için bir felaket senaryosu olarak karşımızda durmaktadır.\n" +
                    "DGD Global Teknoloji A.Ş., işte tam da bu noktada, özellikle atık yönetimi politikalarını kökten değiştirmeye yönelik cesur adımlarıyla öne çıkmaktadır. 7C Basalia tam döngüsel atık yönetimi ve ürün bazlı döngüsel teknolojileri yaşama kazandırma projeleri ile, yaşamın her alanına etki edecek oyun değiştirici stratejilerini sizlerle birlikte hayata geçirmektedir."
            },
            {
                title: "İNOVASYON",
                content: "Tüm faaliyet alanlarında, yaşamın her sahasında yenilikçi ve katma değerli ürün, hizmet ve teknolojileri temel kabul eden şirket politikamız; yaşadığımız çevreden başlayıp küresel ölçekte etkiler oluşturmayı amaçlayan yoğun çalışmalar yürütmektedir.\n" +
                    "İnovatif yaklaşımımızı yalnızca belirli bir ürün ya da branşla sınırlı tutmadan, farklı sektörlere yayılmış konseptler halinde sunarak; bu stratejiyi ülkesel kalkınma politikalarına dönüştürmek, buna yönelik mevzuatlar oluşturulmasını sağlamak ve sonunda küresel etkiler yaratmak hedefindeyiz. Bu stratejiye katılımınızı memnuniyetle bekliyoruz."
            },
            {
                title: "ÇÖZÜM ORTAKLIĞI",
                content: "Gerek yeni nesil teknolojiler gerekse tam döngüsel atık yönetimi projelerinde, çözüm ortağı olduğu tüm inovatif teknoloji odakları ile yaptığı güçlü protokoller ve sözleşmelerle iş birliklerini kayıt altına alan DGD Global Teknoloji A.Ş., hem kendi bünyesinde hem de tam paylaşımcılık ilkesi çerçevesinde çalışmaktadır.\n" +
                    "Gerek bilgi birikimi (know-how) gerekse girişimci kimliğiyle; bu süreçlere katılım sağlamak isteyen tüm kişi, firma ve kurumlarla ortak insani değerler ve toplumsal-ekonomik kazanımlar doğrultusunda birlikte çalışmaktan onur duyar."
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
                content: "Environmental and atmospheric problems—especially climate change—are increasingly making their presence felt on a global scale. Developed countries are trying to manage these crises through various regulations and sanctions, particularly focusing on reducing carbon footprints. However, despite all efforts, these issues persist as a looming disaster scenario.\n" +
                    "At this critical juncture, DGD Global Teknoloji A.Ş. stands out with bold steps aimed at fundamentally transforming waste management policies. Through its 7C Basalia full circular waste management and product-based circular technology projects, it brings game-changing strategies to all areas of life—together with you."
            },
            {
                title: "INNOVATION",
                content: "In all areas of operation, our company policy is based on offering innovative and value-added products, services, and technologies across all aspects of life. Starting from our immediate environment and aiming to create global impact, we carry out intensive work driven by this principle.\n" +
                    "We do not confine our innovative approach to a single product or field. Instead, we present it through sectorally diverse concepts that cover all aspects of life. Our goal is to transform this strategy into a national development policy, contribute to the creation of relevant legislation, and ultimately achieve global influence. We are happy to invite you to be part of this vision."
            },
            {
                title: "SOLUTION PARTNERSHIP",
                content: "In both next-generation technologies and fully circular waste management projects, DGD Global Teknoloji A.Ş. formalizes its collaborations through strong protocols and agreements with its innovative technology partners.\n" +
                    "Operating within its own structure and under the principle of full cooperation, the company takes pride in working together with individuals, companies, and institutions interested in participating—whether through know-how or entrepreneurial contribution—towards shared human values and collective social and economic benefits."
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