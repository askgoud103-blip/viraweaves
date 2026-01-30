// app/category/slug]
"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import productsData from "@/data/products.json";
import { normalize, formatPrice } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // Ensuring data is handled correctly regardless of JSON structure
  const allProducts = Array.isArray(productsData)
    ? productsData
    : (productsData as any).default || (productsData as any).products || [];

  const slug = params?.slug ? String(params.slug).toLowerCase() : "all";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const getWhatsAppLink = (title: string, price: number) => {
    const phone = "7093430194";
    const text = `Hi Viraweaves! I'm interested in "${title}" (${formatPrice(price)}).`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const filteredItems = allProducts.filter((item: any) => {
    const isAll = slug === "all";
    const itemCategory = normalize(item?.category || "");
    const categoryMatch = isAll || itemCategory === slug;

    const price = Number(item.price);
    const minOk = minPrice ? price >= Number(minPrice) : true;
    const maxOk = maxPrice ? price <= Number(maxPrice) : true;

    return categoryMatch && minOk && maxOk;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffe4ec", paddingBottom: "100px" }}>
      <Navbar />

      {/* Header Section */}
      <section style={{ padding: "140px 20px 40px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "serif", fontSize: "3rem", textTransform: "capitalize", color: "#333" }}>
          {slug === "all" ? "Our Full Collection" : slug.replace(/-/g, " ")}
        </h1>

        <p style={{ color: "#d14d72", fontWeight: 700, margin: "10px 0" }}>
          {filteredItems.length} {filteredItems.length === 1 ? "EXQUISITE WEAVE" : "EXQUISITE WEAVES"} FOUND
        </p>

        <Link href="/" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem", borderBottom: "1px solid #ccc" }}>
          ← BACK TO HOME
        </Link>
      </section>

      {/* Product Grid Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <h2 style={{ color: "#555", fontFamily: "serif" }}>No sarees found in this selection.</h2>
            <p style={{ color: "#888", marginBottom: "20px" }}>Try adjusting your filters or explore our other collections.</p>
            <Link href="/category/all" style={{ color: "#d14d72", fontWeight: "bold", textDecoration: "none" }}>
              VIEW ALL COLLECTIONS →
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px" }}>
            {filteredItems.map((item: any) => (
              <div 
                key={item.id} 
                style={{ 
                  background: "#fff", 
                  borderRadius: "24px", 
                  overflow: "hidden", 
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease" 
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <Link href={`/product/${normalize(item.category)}/${item.id}`}>
                  <img 
                    src={item.images?.[0] || "/placeholder.jpg"} 
                    alt={item.title} 
                    style={{ width: "100%", height: "420px", objectFit: "cover" }} 
                  />
                </Link>

                <div style={{ padding: "25px", textAlign: "center" }}>
                  <h3 style={{ fontFamily: "serif", fontSize: "1.3rem", margin: "0 0 10px", color: "#222", height: "1.6em", overflow: "hidden" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#d14d72", fontWeight: 800, fontSize: "1.5rem", margin: "0 0 20px" }}>
                    {formatPrice(item.price)}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link 
                      href={`/product/${normalize(item.category)}/${item.id}`}
                      style={{
                        background: "#ffe4ec",
                        color: "#d14d72",
                        padding: "12px",
                        borderRadius: "12px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        transition: "0.2s"
                      }}
                    >
                      VIEW DETAILS
                    </Link>

                    <a 
                      href={getWhatsAppLink(item.title, item.price)} 
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#25D366",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "12px",
                        fontWeight: "bold",
                        textDecoration: "none"
                      }}
                    >
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
