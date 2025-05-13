export interface Essay {
    id: string;
    title: string;
    summary: string;
    author: string;
    image: string;
    content: string;
    userId: string; // Hangi kullanıcının essayi
    approved: boolean; // Admin onayı
}

export const essays: Essay[] = [
    {
        id: "1",
        title: "Yapay Zeka ve Geleceğin Teknolojileri",
        summary: "Yapay zeka teknolojilerinin gelişimi ve günlük hayatımıza olan etkileri üzerine kapsamlı bir analiz.",
        author: "Dr. Mehmet Yılmaz",
        image: "/assets/images/yapay-zeka.jpg",
        content: `
      <h2>Giriş</h2>
      <p>Yapay zeka, modern teknolojinin en önemli gelişmelerinden biri haline geldi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      
      <h3>Ana Gelişmeler</h3>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      
      <h3>Gelecek Öngörüleri</h3>
      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>`,
        userId: "1", // Dr. Mehmet Yılmaz (admin)
        approved: true // Admin kendi makalelerini otomatik onaylar
    },
    {
        id: "2",
        title: "Yeşil Teknoloji İnovasyonları",
        summary: "Sürdürülebilir kalkınma için yeşil teknolojilerin rolü ve güncel yenilikler.",
        author: "Prof. Ayşe Demir",
        image: "/assets/images/yesil-teknoloji.jpg",
        content: `
      <h2>Sürdürülebilir Teknolojilerin Önemi</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec auctor blandit quam, sit amet cursus magna tincidunt nec.</p>
      
      <h3>Yenilenebilir Enerji</h3>
      <p>Mauris condimentum, erat sit amet convallis pellentesque, nulla turpis tempus libero, vel cursus orci massa et magna. Praesent in fermentum dui.</p>
      
      <h3>Gelecek Planları</h3>
      <p>Fusce vitae mauris nec massa sodales eleifend. Cras quis lectus et leo tempor sodales. Quisque vehicula massa vel elit vehicula, vel bibendum erat tincidunt.</p>`,
        userId: "2", // Prof. Ayşe Demir
        approved: true // Admin tarafından onaylanmış
    },
    {
        id: "3",
        title: "Blockchain Teknolojisi ve Uygulamaları",
        summary: "Blockchain teknolojisinin çeşitli sektörlerdeki potansiyel kullanım alanları.",
        author: "Mühendis Can Özkan",
        image: "/assets/images/blockchain.jpg",
        content: `
      <h2>Blockchain Nedir?</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
      
      <h3>Sektörel Uygulamalar</h3>
      <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.</p>
      
      <h3>Avantajları ve Dezavantajları</h3>
      <p>Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>`,
        userId: "3", // Mühendis Can Özkan
        approved: true // Admin tarafından onaylanmış
    },
    {
        id: "4",
        title: "IoT ve Akıllı Şehirler",
        summary: "Nesnelerin interneti teknolojisinin akıllı şehir projelerindeki uygulamaları.",
        author: "Dr. Zehra Aktaş",
        image: "/assets/images/iot.jpg",
        content: `
      <h2>Akıllı Şehir Kavramı</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      
      <h3>IoT Sensörleri</h3>
      <p>Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.</p>
      
      <h3>Çevresel Etkiler</h3>
      <p>Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</p>`,
        userId: "4", // Dr. Zehra Aktaş
        approved: true // Admin tarafından onaylanmış
    },
    {
        id: "5",
        title: "Kuantum Bilgisayarlar ve Kriptografi",
        summary: "Kuantum bilgisayarların gelişimi ve güvenlik teknolojilerine potansiyel etkileri.",
        author: "Prof. Dr. Ali Kaya",
        image: "/assets/images/kuantum-comp.jpg",
        content: `
      <h2>Kuantum Teknolojisinin Temelleri</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Sed pretium, leo sit amet congue sagittis, urna ipsum porttitor.</p>
      
      <h3>Güvenlik Etkileri</h3>
      <p>Morbi tempor congue justo, vel sodales mauris tempus ut. Nulla facilisi. Sed dictum lacus ac nibh pellentesque, eget varius purus vehicula.</p>
      
      <h3>Gelecekteki Uygulamalar</h3>
      <p>Curabitur dignissim blandit turpis, sit amet rhoncus nisi congue ut. Integer in dolor ut lorem vehicula gravida non eget nulla.</p>`,
        userId: "5", // Prof. Dr. Ali Kaya
        approved: true // Admin tarafından onaylanmış
    },
    // Onaylanmamış makale örneği
    {
        id: "6",
        title: "Yeni Makale - Onay Bekliyor",
        summary: "Bu makale henüz admin tarafından onaylanmamış ve görüntülenmiyor.",
        author: "Zeynep Yücel",
        image: "/assets/images/pending.jpg",
        content: "<p>Bu makale içeriği henüz admin tarafından incelenmemiş.</p>",
        userId: "6", // Zeynep Yücel
        approved: false // Onay bekliyor
    }
];

// Sadece onaylanmış tech-club'leri getiren helper fonksiyon
export const getApprovedEssays = (): Essay[] => {
    return essays.filter(essay => essay.approved);
};

// Onay bekleyen tech-club'leri getiren helper fonksiyon (admin için)
export const getPendingEssays = (): Essay[] => {
    return essays.filter(essay => !essay.approved);
};

// Belirli bir kullanıcının tech-club'lerini getiren helper fonksiyon
export const getEssaysByUserId = (userId: string): Essay[] => {
    return essays.filter(essay => essay.userId === userId);
};

// Belirli bir kullanıcının onaylanmış tech-club'lerini getiren helper fonksiyon
export const getApprovedEssaysByUserId = (userId: string): Essay[] => {
    return essays.filter(essay => essay.userId === userId && essay.approved);
};