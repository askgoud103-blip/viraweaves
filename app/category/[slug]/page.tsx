"use client";

import { Suspense, useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import productsData from "@/data/products.json";
import { normalize, formatPrice } from "@/lib/utils";
import { COLORS } from "@/lib/colors";

const PRICE_RANGES = [
  { label: "All Prices", value: "" },
  { label: "Below ₹2K", value: "0-2000" },
  { label: "Below ₹5K", value: "0-5000" },
  { label: "₹10K – ₹15K", value: "10000-15000" },
  { label: "₹15K – ₹30K", value: "15000-30000" },
  { label: "₹30K – ₹45K", value: "30000-45000" },
  { label: "Above ₹45K", value: "45000-999999" },
];

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = params?.slug ? String(params.slug).toLowerCase() : "all";
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return productsData.filter((product) => {
      const categoryMatch =
  slug === "all" || normalize(product.category ?? "") === slug;

      
      const price = product.price;
      const min = minPriceParam ? parseInt(minPriceParam) : 0;
      const max = maxPriceParam ? parseInt(maxPriceParam) : Infinity;
      const priceMatch = price >= min && price <= max;

      return categoryMatch && priceMatch;
    });
  }, [slug, minPriceParam, maxPriceParam]);

  const handlePriceChange = (rangeValue: string) => {
    if (!rangeValue) {
      router.push(`/category/${slug}`);
      return;
    }
    const [min, max] = rangeValue.split("-");
    router.push(`/category/${slug}?minPrice=${min}&maxPrice=${max}`);
  };

  const getWhatsAppLink = (product: any) => {
    const message = `Hi Viraweaves, I'm interested in the ${product.title} (${product.id}) from the ${product.category} collection. Price: ${formatPrice(product.price)}.`;
    return `https://api.whatsapp.com/send?phone=917093430194&text=${encodeURIComponent(message)}`;

  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: COLORS.cream || "#fffafb" }}>
      <Navbar />

      <header style={{ padding: "40px 20px", textAlign: "center", background: "#fff" }}>
        <h1 style={{ fontFamily: "serif", fontSize: "2.5rem", color: COLORS.maroon, textTransform: "capitalize" }}>
          {slug.replace(/-/g, " ")} Collection
        </h1>
        <p style={{ color: "#666", marginTop: "10px" }}>{filteredItems.length} Exquisite Pieces Found</p>
      </header>

      {/* Filter Bar */}
      <div style={{ padding: "20px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", position: "sticky", top: "0", zIndex: 10, background: "#fff", borderBottom: "1px solid #eee" }}>
        {PRICE_RANGES.map((range) => (
          <button
            key={range.label}
            onClick={() => handlePriceChange(range.value)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: `1px solid ${COLORS.maroon}`,
              background: (minPriceParam + "-" + maxPriceParam) === range.value ? COLORS.maroon : "transparent",
              color: (minPriceParam + "-" + maxPriceParam) === range.value ? "#white" : COLORS.maroon,
              cursor: "pointer",
              fontSize: "0.85rem",
              transition: "0.3s"
            }}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
        gap: "30px", 
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {filteredItems.map((product) => (
          <div key={product.id} className="product-card" style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
           <Link href={`/product/${normalize(product.category ?? "")}/${product.id}`}>
              <img 
                src={product.images[0]} 
                alt={product.title} 
                style={{ width: "100%", height: "400px", objectFit: "cover" }} 
              />
            </Link>
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "serif", fontSize: "1.2rem", marginBottom: "8px" }}>{product.title}</h3>
              <p style={{ color: COLORS.gold, fontWeight: "bold", fontSize: "1.1rem", marginBottom: "15px" }}>
                {formatPrice(product.price)}
              </p>
              <a 
                href={getWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: "block", 
                  padding: "12px", 
                  background: "#25D366", 
                  color: "#fff", 
                  textDecoration: "none", 
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "0.9rem"
                }}
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>No products found in this price range.</p>
          <Link href={`/category/${slug}`} style={{ color: COLORS.maroon, textDecoration: "underline", marginTop: "10px", display: "inline-block" }}>
            Clear Filters
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', fontFamily: 'serif' }}>Loading Collection...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
