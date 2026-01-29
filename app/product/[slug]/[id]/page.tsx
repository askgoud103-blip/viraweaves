"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import products from "@/data/products.json";

// Standard normalizer for the "Related Products" links
const normalize = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

export default function SareeDetailPage() {
  const params = useParams();
  const categorySlug = params?.slug; 
  const productId = params?.id;      

  // 1. Find the current product
  const product = products.find((p) => String(p.id) === String(productId));

  // 2. Filter Related Products (Same category, different ID, limit to 4)
  const relatedProducts = products
    .filter((p) => normalize(p.category) === categorySlug && String(p.id) !== String(productId))
    .slice(0, 4);

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const phoneNumber = "7093430194"; 
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const message = `Hi Viraweaves! 🌸\n\nI'm interested in the "${product.title}".\nPrice: ₹${product.price}\n\nLink: ${currentUrl}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!product) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "160px 20px" }}>
          <h2 style={{ fontFamily: "serif" }}>Saree not found.</h2>
          <Link href="/" style={{ color: "#d14d72" }}>← Back to Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", paddingBottom: "100px" }}>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "140px 20px 60px" }}>
        
        {/* --- PRODUCT DETAIL SECTION --- */}
        <div style={{ marginBottom: "30px" }}>
          <Link href={`/category/${categorySlug}`} style={{ color: "#d14d72", textDecoration: "none", fontWeight: 600 }}>
            ← BACK TO {String(categorySlug).toUpperCase()}
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", marginBottom: "80px" }}>
          <div>
            <img src={product.images[0]} alt={product.title} style={{ width: "100%", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }} />
          </div>

          <div>
            <span style={{ color: "#d14d72", fontWeight: 700, letterSpacing: "2px", fontSize: "0.8rem" }}>{product.weave} • {product.fabric}</span>
            <h1 style={{ fontFamily: "serif", fontSize: "3rem", margin: "15px 0" }}>{product.title}</h1>
            <p style={{ fontSize: "2rem", color: "#d14d72", fontWeight: 700 }}>₹{product.price.toLocaleString('en-IN')}</p>
            <p style={{ lineHeight: "1.8", color: "#444", margin: "20px 0" }}>{product.description}</p>

            <button onClick={handleWhatsAppInquiry} style={{ width: "100%", padding: "20px", borderRadius: "16px", background: "#25D366", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>
              Order via WhatsApp
            </button>
          </div>
        </div>

        {/* --- RELATED PRODUCTS SECTION --- */}
        {relatedProducts.length > 0 && (
          <section style={{ borderTop: "1px solid #eee", paddingTop: "60px" }}>
            <h2 style={{ fontFamily: "serif", fontSize: "2rem", marginBottom: "30px", textAlign: "center" }}>You May Also Like</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "25px" }}>
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/product/${normalize(rp.category)}/${rp.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #f0f0f0" }}>
                    <img src={rp.images[0]} alt={rp.title} style={{ width: "100%", height: "280px", objectFit: "cover" }} />
                    <div style={{ padding: "15px", textAlign: "center" }}>
                      <h4 style={{ margin: "5px 0", fontSize: "1rem" }}>{rp.title}</h4>
                      <p style={{ color: "#d14d72", fontWeight: 700 }}>₹{rp.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
