// src/app/construction/page.tsx
import dynamic from "next/dynamic";

// Import client-side component with dynamic import to handle translations
const ConstructionPageClient = dynamic(
  () => import("./ConstructionPageClient"),
  { ssr: true }
);

// Metadata
export const metadata = {
  title: "DGD Global | İnşaat Hizmetleri",
  description: "Bina inşaatı, altyapı, endüstriyel tesisler ve daha fazlası için kapsamlı inşaat hizmetlerimizi keşfedin."
};

export default function ConstructionPage() {
  return <ConstructionPageClient />;
}