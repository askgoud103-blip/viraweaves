// app/product/[slug]/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import products from "@/data/products.json";
import { normalize, formatPrice } from "@/lib/utils";

export default function SareeDetailPage() {
  const params = useParams();
  
  // These names MUST match your [folder] names
  const categorySlug = params?.slug; 
  const productId = params?.id;      

  // --- DIAGNOSTIC LOGS ---
  // Open your browser console (F12) to see these!
  useEffect(() => {
    console.log("🔍 Viraweaves Diagnosis:");
    console.log("Current URL Category Slug:", categorySlug);
    console.log("Current URL Product ID:", productId);
  }, [categorySlug, productId]);

  // 1. Find the current product
  const product = products.find((p) => String(p.id) === String(productId));

  // 2. Gallery State
  const [activeImage, setActiveImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Set initial image once product is found
  useEffect(() => {
    if (product?.images?.length) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  // 3. Related Products (Matching the category slug)
  const relatedProducts = products
    .filter((p) => normalize(p.category) === categorySlug && String(p.id) !== String(productId))
    .slice(0, 4);

  // Modal Navigation
  const nextImage = useCallback(() => {
    if (product) setModalIndex((prev) => (prev + 1) % product.images.length);
  }, [product]);

  const prevImage = useCallback(() => {
    if (product) setModalIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  }, [product]);

  // Handle WhatsApp
  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const phoneNumber = "7093430194"; 
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const message = `Hi Viraweaves! 🌸\n\nI'm interested in the "${product.title}".\nPrice: ${formatPrice(product.price)}\n\nLink: ${currentUrl}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Error State: Product Not Found
  if (!product) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "160px 20px" }}>
          <h2 style={{ fontFamily: "serif", fontSize: "2rem", color: "#333" }}>Product Not Found</h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>The ID "{productId}" doesn't exist in your JSON.</p>
          <Link href="/" style={{ color: "#d14d72", fontWeight: 700 }}>← Back to Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", paddingBottom: "120px" }}>
      <Navbar />
      
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "140px 20px 60px" }}>
        
        {/* BREADCRUMB */}
        <div style={{ marginBottom: "30px" }}>
          <Link href={`/category/${categorySlug}`} style={{ color: "#d14d72", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
            ← BACK TO {String(categorySlug).toUpperCase().replace(/-/g, " ")}
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", marginBottom: "80px" }}>
          
          {/* LEFT: IMAGE GALLERY */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div 
              style={{ width: "100%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", cursor: "zoom-in" }}
              onClick={() => {
                setModalIndex(product.images.indexOf(activeImage));
                setIsModalOpen(true);
              }}
            >
              <img src={activeImage} alt={product.title} style={{ width: "100%", display: "block", objectFit: "cover" }} />
            </div>
            
            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px" }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: "80px", height: "100px", borderRadius: "12px", flexShrink: 0,
                    border: activeImage === img ? "2px solid #d14d72" : "2px solid #eee",
                    padding: 0, cursor: "pointer", overflow: "hidden", transition: "0.2s"
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div>
            <span style={{ color: "#d14d72", fontWeight: 700, letterSpacing: "2px", fontSize: "0.8rem", textTransform: "uppercase" }}>
               {product.fabric} • {product.category}
            </span>
            <h1 style={{ fontFamily: "serif", fontSize: "clamp(2rem, 5vw, 3rem)", margin: "15px 0", color: "#222" }}>
              {product.title}
            </h1>
            <p style={{ fontSize: "2.5rem", color: "#d14d72", fontWeight: 700, marginBottom: "20px" }}>
              {formatPrice(product.price)}
            </p>
            
            <div style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginBottom: "30px" }}>
                <p style={{ lineHeight: "1.8", color: "#444", fontSize: "1.1rem" }}>{product.description}</p>
            </div>

            {/* QUICK SPECS TABLE */}
            
            <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "16px", marginBottom: "30px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.9rem" }}>
                    <div style={{ color: "#666" }}>Weave Type:</div><div style={{ fontWeight: 600 }}>{product.weave || "Handloom"}</div>
                    <div style={{ color: "#666" }}>Occasion:</div><div style={{ fontWeight: 600 }}>{product.occasion || "Festive"}</div>
                    <div style={{ color: "#666" }}>Wash Care:</div><div style={{ fontWeight: 600 }}>Dry Clean Only</div>
                </div>
            </div>

            <button 
              onClick={handleWhatsAppInquiry} 
              className="whatsapp-btn"
              style={{ width: "100%", padding: "22px", borderRadius: "16px", background: "#25D366", color: "#fff", border: "none", fontWeight: 700, fontSize: "1.2rem", cursor: "pointer" }}
            >
              Order via WhatsApp
            </button>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section style={{ borderTop: "1px solid #eee", paddingTop: "60px" }}>
            <h2 style={{ fontFamily: "serif", fontSize: "2.2rem", marginBottom: "40px", textAlign: "center" }}>You May Also Like</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "30px" }}>
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/product/${normalize(rp.category)}/${rp.id}`} style={{ textDecoration: "none" }}>
                  <div className="product-card">
                    <img src={rp.images[0]} alt={rp.title} style={{ width: "100%", height: "320px", objectFit: "cover", borderRadius: "16px" }} />
                    <div style={{ padding: "15px", textAlign: "center" }}>
                      <h4 style={{ margin: "5px 0", color: "#333" }}>{rp.title}</h4>
                      <p style={{ color: "#d14d72", fontWeight: 700 }}>{formatPrice(rp.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MODAL / LIGHTBOX */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.9)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: "20px", right: "20px", fontSize: "2.5rem", color: "#fff", background: "none", border: "none", cursor: "pointer" }}>×</button>
          <button onClick={prevImage} style={{ position: "absolute", left: "20px", fontSize: "3rem", color: "#fff", background: "none", border: "none", cursor: "pointer" }}>‹</button>
          <img src={product.images[modalIndex]} alt="Large view" style={{ maxHeight: "85vh", maxWidth: "90vw", objectFit: "contain", borderRadius: "8px" }} />
          <button onClick={nextImage} style={{ position: "absolute", right: "20px", fontSize: "3rem", color: "#fff", background: "none", border: "none", cursor: "pointer" }}>›</button>
        </div>
      )}

      <style jsx global>{`
        .whatsapp-btn:hover { background: #1eb954 !important; transform: scale(1.02); transition: 0.3s; }
        .product-card { transition: transform 0.3s ease; }
        .product-card:hover { transform: translateY(-8px); }
      `}</style>
    </div>
  );
}
