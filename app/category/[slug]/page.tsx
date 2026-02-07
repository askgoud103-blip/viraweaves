

"use client"; // MUST be the first line
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import productsData from "@/data/products.json";
import { normalize, formatPrice } from "@/lib/utils";

const PRICE_RANGES = [
  { label: "All Prices", value: "" },
  { label: "Below ₹2K", value: "0-2000" },
  { label: "Below ₹5K", value: "0-5000" },
  { label: "₹10K – ₹15K", value: "10000-15000" },
  { label: "₹15K – ₹30K", value: "15000-30000" },
  { label: "₹30K – ₹45K", value: "30000-45000" },
  { label: "Above ₹45K", value: "45000-999999" },
];

// 1. Move your logic into a separate inner component
function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const allProducts = Array.isArray(productsData)
    ? productsData
    : (productsData as any).default || [];

  const slug = params?.slug ? String(params.slug).toLowerCase() : "all";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // ... (All your existing filteredItems logic and getWhatsAppLink)

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fffafb", paddingBottom: "80px" }}>
      {/* ... (All your existing JSX) */}
    </div>
  );
}

// 2. The default export just wraps the content in Suspense
export default function CategoryPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', fontFamily: 'serif' }}>Loading Collection...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
