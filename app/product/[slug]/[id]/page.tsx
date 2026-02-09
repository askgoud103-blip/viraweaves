"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import products from "@/data/products.json";
import { normalize, formatPrice } from "@/lib/utils";
import { COLORS } from "@/lib/colors";

export default function SareeDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const productId = params?.id ? String(params.id) : "";

  // 1. Memoize the product lookup
  const product = useMemo(() => {
    return products.find((p) => String(p.id) === productId);
  }, [productId]);

  // 2. Memoize valid images to prevent unnecessary array re-creation
  const validImages = useMemo(
    () => product?.images?.filter(Boolean) || [],
    [product]
  );

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");

  // Sync active image when product loads
  useEffect(() => {
    if (validImages.length > 0) {
      setActiveImage(validImages[0]);
    }
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [validImages]);

  // 3. Related Products Logic
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (p) => 
          normalize(p.category) === normalize(product.category) && 
          String(p.id) !== productId
      )
      .slice(0, 4);
  }, [product, productId]);

  // Modal navigation (Dependencies now stable thanks to useMemo)
  const nextImage = useCallback(() => {
    if (validImages.length === 0) return;
    setModalIndex((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const prevImage = useCallback(() => {
    if (validImages.length === 0) return;
    setModalIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const phoneNumber = "917093430194"; 
    const message = `Hi Viraweaves! 🌸\n\nI'm interested in the "${product.title}".\nPrice: ${formatPrice(product.price)}\n\nLink: ${currentUrl}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "160px 20px" }}>
          <h2 style={{ fontFamily: "serif", fontSize: "2rem", color: COLORS.maroon }}>Product Not Found</h2>
          <Link href="/" style={{ color: COLORS.maroon, fontWeight: 700 }}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: COLORS.cream || "#fff", paddingBottom: "120px" }}>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "140px 20px 60px" }}>
        <div style={{ marginBottom: "30px" }}>
          <button
            onClick={() => router.back()}
            style={{ background: "none", border: "none", color: COLORS.maroon, fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}
          >
            ← BACK TO COLLECTION
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", marginBottom: "80px" }}>
          
          {/* GALLERY */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {activeImage && (
              <div
                style={{ width: "100%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", cursor: "zoom-in" }}
                onClick={() => {
                  setModalIndex(validImages.indexOf(activeImage));
                  setIsModalOpen(true);
                }}
              >
                <img src={activeImage} alt={product.title} style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "3/4" }} />
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "10px" }}>
              {validImages.map((img, idx) => (
                <button
                  key={`${product.id}-thumb-${idx}`}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: "80px", height: "100px", borderRadius: "12px", flexShrink: 0,
                    border: activeImage === img ? `2px solid ${COLORS.maroon}` : "2px solid #eee",
                    cursor: "pointer", overflow: "hidden"
                  }}
                >
                  <img src={img} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <span style={{ color: COLORS.gold, fontWeight: 700, letterSpacing: "2px", fontSize: "0.85rem", textTransform: "uppercase" }}>
              {product.fabric} • {product.category}
            </span>
            <h1 style={{ fontFamily: "serif", fontSize: "2.8rem", margin: "15px 0", color: COLORS.maroon }}>{product.title}</h1>
            <p style={{ fontSize: "2.2rem", color: "#333", fontWeight: 700, marginBottom: "20px" }}>{formatPrice(product.price)}</p>
            <p style={{ lineHeight: "1.8", color: "#555", marginBottom: "30px" }}>{product.description}</p>

            <div style={{ background: "#fdfdfd", padding: "24px", borderRadius: "16px", marginBottom: "30px", border: "1px solid #f0f0f0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "10px", fontSize: "0.95rem" }}>
                <span style={{ color: "#888" }}>Weave:</span> <strong>{product.weave}</strong>
                <span style={{ color: "#888" }}>Occasion:</span> <strong>{product.occasion}</strong>
                <span style={{ color: "#888" }}>Care:</span> <strong>Dry Clean Only</strong>
              </div>
            </div>

            <button onClick={handleWhatsAppInquiry} className="whatsapp-btn" style={{ width: "100%", padding: "20px", borderRadius: "16px", background: "#25D366", color: "#fff", border: "none", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>
              Order via WhatsApp
            </button>
          </div>
        </div>

        {/* RELATED SECTION */}
        {relatedProducts.length > 0 && (
          <section style={{ borderTop: "1px solid #eee", paddingTop: "60px" }}>
            <h2 style={{ fontFamily: "serif", fontSize: "2rem", marginBottom: "40px", textAlign: "center", color: COLORS.maroon }}>More Like This</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "30px" }}>
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/product/${normalize(rp.category)}/${rp.id}`} style={{ textDecoration: "none" }}>
                  <img src={rp.images[0]} style={{ width: "100%", height: "340px", objectFit: "cover", borderRadius: "16px" }} alt="" />
                  <div style={{ textAlign: "center", padding: "10px" }}>
                    <h4 style={{ color: "#333", margin: "5px 0" }}>{rp.title}</h4>
                    <p style={{ color: COLORS.gold, fontWeight: 700 }}>{formatPrice(rp.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* LIGHTBOX */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.9)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: "20px", right: "20px", color: "#fff", fontSize: "2rem", background: "none", border: "none" }}>×</button>
          <button onClick={prevImage} style={{ position: "absolute", left: "20px", color: "#fff", fontSize: "3rem", background: "none", border: "none" }}>‹</button>
          <img src={validImages[modalIndex]} alt="Zoom" style={{ maxHeight: "85vh", maxWidth: "90vw", objectFit: "contain" }} />
          <button onClick={nextImage} style={{ position: "absolute", right: "20px", color: "#fff", fontSize: "3rem", background: "none", border: "none" }}>›</button>
        </div>
      )}

      <style jsx global>{`
        .whatsapp-btn:hover { background: #1eb954 !important; }
      `}</style>
    </div>
  );
}
