// src/app/architecture/page.tsx
import dynamic from "next/dynamic";

// Import client-side component with dynamic import to handle translations
const ArchitecturePageClient = dynamic(
    () => import("./ArchitecturePageClient"),
    { ssr: true }
);

// Metadata
export const metadata = {
    title: "DGD Global | Mimarlık Hizmetleri",
    description: "Bina tasarımı, cephe mühendisliği, dekorasyon ve enerji verimliliği çözümleri dahil kapsamlı mimarlık hizmetlerimizi keşfedin."
};

export default function ArchitecturePage() {
    return <ArchitecturePageClient />;
}