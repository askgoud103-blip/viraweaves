"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import productsData from "@/data/products.json";

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // --- DATA IMPORT FIX ---
  // This line ensures that even if Turbopack wraps your JSON, we find the array.
  const allProducts = Array.isArray(productsData) 
    ? productsData 
    : (productsData as any).default || (productsData as any).products || [];

  const slug = params?.slug ? String(params.slug).toLowerCase() : "all";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // WhatsApp Link Generator
  const getWhatsAppLink = (itemTitle: string, price: number) => {
    const phoneNumber = "7093430194"; // Your 10-digit number
    const text = `Hi Viraweaves! I'm interested in the "${itemTitle}" (₹${price}). Is this available?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  // Filter Logic
  const filteredItems = allProducts.filter((item: any) => {
    const isAll = slug === "all" || slug === "collection";
    
    // Use optional chaining to prevent crashes
    const itemCategory = item?.category?.toLowerCase() || "";
    const categoryMatch = isAll || itemCategory === slug;

    const price = Number(item.price);
    const matchesMin = minPrice ? price >= Number(minPrice) : true;
    const matchesMax = maxPrice ? price <= Number(maxPrice) : true;

    return categoryMatch && matchesMin && matchesMax;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffe4ec", paddingBottom: "100px" }}>
      <Navbar />

      <section style={{ padding: "140px 20px 40px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "serif", fontSize: "3rem", color: "#333", textTransform: "capitalize" }}>
          {slug === "all" ? "Our Full Collection" : slug}
        </h1>
        
        {/* Debug Info: Will help you see if data loaded at all */}
        <p style={{ color: "#d14d72", fontWeight: 700 }}>
          {allProducts.length === 0 
            ? "⚠️ DATA LOAD ERROR: Check products.json path" 
            : `${filteredItems.length} EXQUISITE WEAVES FOUND`}
        </p>

        <Link href="/" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem", marginTop: "10px", display: "inline-block" }}>
          ← BACK TO HOME
        </Link>
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "24px", border: "1px dashed #d14d72" }}>
            <p style={{ fontSize: "1.2rem", color: "#d14d72" }}>No sarees found in the "{slug}" category.</p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>Currently loaded total products: {allProducts.length}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px" }}>
            {filteredItems.map((item: any) => (
              <div key={item.id} style={{ 
                background: "#fff", 
                borderRadius: "24px", 
                overflow: "hidden", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease"
              }}>
                <Link href={`/product/${item.category}/${item.slug}`} style={{ cursor: "pointer" }}>
                  <div style={{ height: "420px", overflow: "hidden", position: "relative" }}>
                    <img 
                      src={item.images?.[0] || "/placeholder.jpg"} 
                      alt={item.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    <div style={{ 
                      position: "absolute", top: "15px", right: "15px", 
                      background: "white", padding: "5px 12px", 
                      borderRadius: "8px", color: "#d14d72", fontWeight: 800, fontSize: "0.7rem" 
                    }}>
                      {item.fabric?.toUpperCase()}
                    </div>
                  </div>
                </Link>

                <div style={{ padding: "25px", textAlign: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "#999", textTransform: "uppercase" }}>{item.weave}</span>
                  <h3 style={{ margin: "5px 0 15px", fontFamily: "serif", fontSize: "1.3rem", color: "#222" }}>{item.title}</h3>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <span style={{ color: "#d14d72", fontWeight: 800, fontSize: "1.6rem" }}>₹{item.price.toLocaleString("en-IN")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link href={`/product/${item.category}/${item.slug}`} style={{
                      background: "#ffe4ec", color: "#d14d72", padding: "12px", 
                      borderRadius: "12px", fontWeight: "700", textDecoration: "none"
                    }}>
                      VIEW DETAILS
                    </Link>
                    <a href={getWhatsAppLink(item.title, item.price)} target="_blank" rel="noopener noreferrer" style={{
                      background: "#25D366", color: "#fff", padding: "12px", 
                      borderRadius: "12px", fontWeight: "700", textDecoration: "none"
                    }}>
                      ORDER ON WHATSAPP
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
