"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import products from "@/data/products.json";

export default function SareeDetailPage() {
  const params = useParams();
  
  // Capturing the specific ID from the nested path: /product/[slug]/[id]
  const categorySlug = params?.slug; 
  const productId = params?.id;      

  // Find the product in your JSON that matches the ID or the Slug
  const product = products.find((p) => p.id === productId || p.slug === productId);

  // WhatsApp Inquiry Handler
  const handleWhatsAppInquiry = () => {
    if (!product) return;
    
    const phoneNumber = "7093430194"; 
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    
    const message = `Hi Viraweaves! 🌸\n\nI'm interested in the "${product.title}".\nPrice: ₹${product.price}\n\nLink: ${currentUrl}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  // Error State: Product Not Found
  if (!product) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "160px 20px" }}>
          <h2 style={{ fontFamily: "serif", fontSize: "2rem" }}>Saree not found.</h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>The product might have been moved.</p>
          <Link href="/" style={{ color: "#d14d72", fontWeight: 600, textDecoration: "none" }}>
            ← Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", paddingBottom: "100px" }}>
      <Navbar />
      
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "140px 20px 60px" }}>
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: "30px" }}>
          <Link href={`/category/${categorySlug}`} style={{ color: "#d14d72", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
            ← Back to {String(categorySlug).toUpperCase()}
          </Link>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "60px" 
        }}>
          
          {/* LEFT: Image Section */}
          <div style={{ position: "sticky", top: "140px", height: "fit-content" }}>
            <img 
              src={product.images[0]} 
              alt={product.title} 
              style={{ 
                width: "100%", 
                borderRadius: "24px", 
                boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                objectFit: "cover"
              }} 
            />
          </div>

          {/* RIGHT: Product Details Section */}
          <div style={{ padding: "10px" }}>
            <span style={{ 
              color: "#d14d72", 
              fontWeight: 700, 
              letterSpacing: "3px", 
              fontSize: "0.75rem", 
              textTransform: "uppercase" 
            }}>
              {product.weave} • {product.fabric}
            </span>

            <h1 style={{ 
              fontFamily: "serif", 
              fontSize: "clamp(2.2rem, 5vw, 3rem)", 
              margin: "15px 0", 
              color: "#222",
              lineHeight: 1.1 
            }}>
              {product.title}
            </h1>
            
            <div style={{ display: "flex", alignItems: "center", gap: "15px", margin: "25px 0" }}>
              <span style={{ fontSize: "2.2rem", color: "#d14d72", fontWeight: 700 }}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span style={{ textDecoration: "line-through", color: "#999", fontSize: "1.2rem" }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p style={{ lineHeight: "1.8", color: "#444", fontSize: "1.1rem", marginBottom: "30px" }}>
              {product.description}
            </p>

            {/* Product Specifications Card */}
            <div style={{ 
              background: "#fdf2f5", 
              padding: "25px", 
              borderRadius: "20px", 
              border: "1px solid #ffe4ec",
              marginBottom: "40px"
            }}>
              <h4 style={{ margin: "0 0 15px 0", fontSize: "1rem", color: "#333", borderBottom: "1px solid #ffb6c1", paddingBottom: "10px" }}>
                Product Specifications
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "1rem", color: "#555" }}>
                <li style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                  <strong>Fabric:</strong> <span>{product.fabric}</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                  <strong>Weave:</strong> <span>{product.weave}</span>
                </li>
                <li style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                  <strong>Length:</strong> <span>{product.length || "5.5 meters"}</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Blouse Piece:</strong> <span>{product.blousePiece || "Yes"}</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={handleWhatsAppInquiry}
              style={{
                width: "100%",
                padding: "22px",
                borderRadius: "16px",
                border: "none",
                background: "#25D366",
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                boxShadow: "0 10px 25px rgba(37, 211, 102, 0.3)"
              }}
            >
              Order via WhatsApp
            </button>
            
            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#999", marginTop: "15px" }}>
              Typically responds within 1 hour
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
