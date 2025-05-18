// src/app/consulting-services/page.tsx
import dynamic from "next/dynamic";

// Import client-side component with dynamic import to handle translations
const ConsultingServicesPageClient = dynamic(
  () => import("./ConsultingServicesPageClient"),
  { ssr: true }
);

// Metadata
export const metadata = {
  title: "DGD Global | Danışmanlık Hizmetleri",
  description: "Sürdürülebilirlik raporları, ÇED raporları, kalite yönetimi ve diğer danışmanlık hizmetlerimizi keşfedin."
};

export default function ConsultingServicesPage() {
  return <ConsultingServicesPageClient />;
}