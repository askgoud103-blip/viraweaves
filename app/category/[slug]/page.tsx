"use client";

import { Suspense, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import productsData from "@/data/products.json";
import { normalize, formatPrice } from "@/lib/utils";
import { COLORS } from "@/lib/colors";

function CategoryContent() {
  const params = useParams();
  const slug = params?.slug ? String(params.slug).toLowerCase() : "all";

  // Simplified Filtering Logic: Only filter by Category
  const filteredItems = useMemo(() => {
    return productsData.filter((product) => {
      return slug === "all" || normalize(product.category ?? "") === slug;
    });
  }, [slug]);

  const getWhatsAppLink = (product: any) => {
    const message = `Hi Viraweaves, I'm interested in the ${product.title} (${product.id}) from the ${product.category} collection. Price: ${formatPrice(product.price)}.`;
    return `https://api.whatsapp.com/send?phone=917093430194&text=${encodeURIComponent(message)}`;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: COLORS.cream || "#fffafb" }}>
      <Navbar />

      <header style={{ padding: "40px 20px", textAlign: "center", background: "#fff", borderBottom: "1px solid #eee" }}>
        <h1 style={{ fontFamily: "serif", fontSize: "2.5rem", color: COLORS.maroon, textTransform: "capitalize" }}>
          {slug.replace(/-/g, " ")} Collection
        </h1>
        <p style={{ color: "#666", marginTop: "10px" }}>{filteredItems.length} Exquisite Pieces Found</p>
      </header>

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
          <div key={product.id} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
            <Link href={`/product/${normalize(product.category ?? "")}/${product.id}`}>
              <img 
                src={product.images[0]} 
                alt={product.title} 
                style={{ width: "100%", height: "400px", objectFit: "cover" }} 
              />
            </Link>
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "serif", fontSize: "1.2rem", marginBottom: "8px" }}>{product.title}</h3>
              <p style={{ color: COLORS.gold || "#D4AF37", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "15px" }}>
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
          <p style={{ fontSize: "1.2rem", color: "#666" }}>No products found in this collection.</p>
          <Link href="/category/all" style={{ color: COLORS.maroon, textDecoration: "underline", marginTop: "10px", display: "inline-block" }}>
            View All Collections
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
