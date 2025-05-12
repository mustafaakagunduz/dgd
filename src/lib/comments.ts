export interface Comment {
    id: string;
    essayId: string;
    author: string;
    content: string;
}

export const comments: Comment[] = [
    // Yapay Zeka ve Geleceğin Teknolojileri (essayId: "1")
    {
        id: "c1",
        essayId: "1",
        author: "Zeynep Yücel",
        content: "Yapay zeka konusundaki bu analiz gerçekten çok kapsamlı. Özellikle günlük hayata olan etkileri bölümü çok düşündürücü."
    },
    {
        id: "c2",
        essayId: "1",
        author: "Emre Karagöz",
        content: "GPT modelleri hakkındaki kısmı çok beğendim. Gelecekteki etik sorunlar konusunda da daha detaylı bilgi alabilir miyiz?"
    },
    {
        id: "c3",
        essayId: "1",
        author: "Aylin Özdemir",
        content: "Bu makale yapay zeka alanında çalışan herkesin okuması gereken bir kaynak. Paylaştığınız için teşekkürler."
    },

    // Yeşil Teknoloji İnovasyonları (essayId: "2")
    {
        id: "c4",
        essayId: "2",
        author: "Oğuz Serdar",
        content: "Sürdürülebilir teknolojiler konusunda çok bilgilendirici bir yazı. Özellikle yenilenebilir enerji kısmı harika."
    },
    {
        id: "c5",
        essayId: "2",
        author: "Selin Aktaş",
        content: "Rüzgar enerjisi konusundaki veriler çok güncel. Türkiye'deki potansiyel hakkında da bilgi alabilir miyiz?"
    },

    // Blockchain Teknolojisi ve Uygulamaları (essayId: "3")
    {
        id: "c6",
        essayId: "3",
        author: "Mustafa Demir",
        content: "Blockchain'in finans sektörü dışındaki uygulamaları gerçekten etkileyici. DeFi konusunda da makale bekliyoruz!"
    },
    {
        id: "c7",
        essayId: "3",
        author: "Gizem Çelik",
        content: "Smart contract'lar konusunda daha detaylı örnekler verebilir misiniz? Çok ilginç geliyor."
    },

    // IoT ve Akıllı Şehirler (essayId: "4")
    {
        id: "c8",
        essayId: "4",
        author: "Kaan Yılmaz",
        content: "Akıllı şehir projeleri konusunda Istanbul'dan örnekler paylaşır mısınız? Çok merak ediyorum."
    },
    {
        id: "c9",
        essayId: "4",
        author: "Berrak Özkan",
        content: "IoT sensörlerinin güvenlik açısından riskleri neler? Bu konuda endişelerim var."
    },

    // Kuantum Bilgisayarlar ve Kriptografi (essayId: "5")
    {
        id: "c10",
        essayId: "5",
        author: "Cem Karahan",
        content: "Kuantum bilgisayarların mevcut kriptografi algoritmalarını nasıl etkileyeceği konusu gerçekten kritik."
    },
    {
        id: "c11",
        essayId: "5",
        author: "Nilay Şahin",
        content: "IBM ve Google'ın kuantum bilgisayar yarışı hakkında ne düşünüyorsunuz? Hangisi önde?"
    }
];

// Belirli bir essay için yorumları getiren helper fonksiyon
export const getCommentsByEssayId = (essayId: string): Comment[] => {
    return comments.filter(comment => comment.essayId === essayId);
};

// Yorum sayısını getiren helper fonksiyon
export const getCommentCount = (essayId: string): number => {
    return getCommentsByEssayId(essayId).length;
};