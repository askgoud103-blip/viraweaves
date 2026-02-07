export const dynamic = "force-dynamic";

"use client";

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

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Data safety check
  const allProducts = Array.isArray(productsData)
    ? productsData
    : (productsData as any).default || [];

  const slug = params?.slug ? String(params.slug).toLowerCase() : "all";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const getWhatsAppLink = (title: string, price: number) => {
    const phone = "7093430194";
    const text = `Hi Viraweaves! I'm interested in "${title}" (${formatPrice(price)}). Is this available?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const filteredItems = allProducts.filter((item: any) => {
    const isAll = slug === "all";
    const itemCategory = normalize(item?.category || "");
    const itemFabric = normalize(item?.fabric || "");
    const itemOccasion = normalize(item?.occasion || "");
    const itemTitle = item?.title?.toLowerCase() || "";
    const itemDesc = item?.description?.toLowerCase() || "";
    const searchTarget = slug.toLowerCase();

    // SMART MATCHING LOGIC
    let isMatch = isAll || 
                 itemCategory.includes(searchTarget) || 
                 itemFabric.includes(searchTarget) ||
                 itemOccasion.includes(searchTarget) ||
                 itemTitle.includes(searchTarget) ||
                 itemDesc.includes(searchTarget);

    // Fallback for "Fancy"
    if (searchTarget === "fancy") {
      if (itemOccasion.includes("party") || itemCategory.includes("designer") || itemTitle.includes("shimmer")) {
        isMatch = true;
      }
    }

    const price = Number(item.price);
    const minOk = minPrice ? price >= Number(minPrice) : true;
    const maxOk = maxPrice ? price <= Number(maxPrice) : true;

    return isMatch && minOk && maxOk;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fffafb", paddingBottom: "80px" }}>
      <Navbar />

      {/* --- HERO HEADER --- */}
      <section style={{ 
        padding: "160px 20px 40px", 
        textAlign: "center", 
        background: "linear-gradient(to bottom, #ffe4ec, #fffafb)" 
      }}>
        <h1 style={{ 
          fontFamily: "serif", 
          fontSize: "clamp(2.5rem, 6vw, 4rem)", 
          color: "#2d0b14", 
          textTransform: "capitalize",
          marginBottom: "10px"
        }}>
          {slug === "all" ? "Our Masterpieces" : slug.replace(/-/g, " ")}
        </h1>

        <p style={{ color: "#d14d72", fontWeight: 600, letterSpacing: "1px", marginBottom: "20px" }}>
          {filteredItems.length} {filteredItems.length === 1 ? "EXQUISITE WEAVE" : "EXQUISITE WEAVES"} DISCOVERED
        </p>

        <Link href="/" style={{ 
          color: "#888", 
          textDecoration: "none", 
          fontSize: "0.9rem",
          borderBottom: "1px solid #ddd",
          paddingBottom: "2px"
        }}>
          ← RETURN TO HOME
        </Link>
      </section>

      {/* --- FILTER BAR --- */}
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto 40px", 
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
        position: "sticky",
        top: "70px",
        zIndex: 10,
        backgroundColor: "rgba(255, 250, 251, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "0 0 20px 20px"
      }}>
        <label style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#555" }}>Filter By Price:</label>
        <select
          value={`${minPrice || ""}-${maxPrice || ""}`}
          onChange={(e) => {
            const val = e.target.value;
            const params = new URLSearchParams();
            if (val) {
              const [min, max] = val.split("-");
              if (min) params.set("minPrice", min);
              if (max) params.set("maxPrice", max);
            }
            router.push(`/category/${slug}?${params.toString()}`);
          }}
          style={{ 
            padding: "10px 15px", 
            borderRadius: "10px", 
            border: "1px solid #d14d72",
            outline: "none",
            cursor: "pointer",
            background: "white"
          }}
        >
          {PRICE_RANGES.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        <button
          onClick={() => router.push(`/category/${slug}`)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: "#d14d72",
            color: "white",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(209, 77, 114, 0.2)"
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* --- PRODUCT GRID --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {filteredItems.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "80px 20px", 
            background: "#fff", 
            borderRadius: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)" 
          }}>
            <h2 style={{ fontFamily: "serif", color: "#555" }}>Our looms are still working on this...</h2>
            <p style={{ color: "#888", marginBottom: "20px" }}>Try adjusting your price range or browse another category.</p>
            <Link href="/category/all" style={{ color: "#d14d72", fontWeight: "bold", textDecoration: "none" }}>
              EXPLORE ALL SAREES →
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
            gap: "35px" 
          }}>
            {filteredItems.map((item: any) => (
              <div 
                key={item.id} 
                className="product-card"
                style={{ 
                  background: "#fff", 
                  borderRadius: "24px", 
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
                  transition: "transform 0.3s ease"
                }}
              >
                <Link href={`/product/${normalize(item.category)}/${item.id}`}>
                  <div style={{ overflow: "hidden", height: "420px" }}>
                    <img 
                      src={item.images?.[0]} 
                      alt={item.title}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transition: "transform 0.5s ease" 
                      }}
                      className="product-img"
                    />
                  </div>
                </Link>

                <div style={{ padding: "20px", textAlign: "center" }}>
                  <h3 style={{ 
                    fontFamily: "serif", 
                    fontSize: "1.2rem", 
                    color: "#333", 
                    marginBottom: "8px",
                    height: "1.4em",
                    overflow: "hidden"
                  }}>{item.title}</h3>

                  <p style={{ color: "#d14d72", fontWeight: 800, fontSize: "1.5rem", marginBottom: "20px" }}>
                    {formatPrice(item.price)}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link
                      href={`/product/${normalize(item.category)}/${item.id}`}
                      style={{ 
                        background: "#fff0f3", 
                        color: "#d14d72", 
                        padding: "12px", 
                        borderRadius: "12px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "0.3s"
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
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        boxShadow: "0 4px 10px rgba(37, 211, 102, 0.2)"
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

      <style jsx global>{`
        .product-card:hover {
          transform: translateY(-10px);
        }
        .product-card:hover .product-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
