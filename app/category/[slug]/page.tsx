// app/category/[slug]/page.tsx
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../data/products.json"; // import JSON

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { slug } = use(params);
  const safeSlug = slug || "unknown";

  // Get products for this category from JSON
  const products = productsData[safeSlug] || [];

  const title = safeSlug.replace(/-/g, " ").toUpperCase();

  return (
    <div style={{ minHeight: "100vh", padding: "140px 16px", backgroundColor: "#fff0f5" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700, marginBottom: "30px" }}>
        {title} COLLECTION
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {products.map((product) => (
          <Link key={product.id} href={`/product/${safeSlug}/${product.id}`} style={{ textDecoration: "none", color: "#000" }}>
            <div style={{ overflow: "hidden", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", transition: "transform 0.25s ease, box-shadow 0.25s ease", cursor: "pointer" }}>
              <Image
                src={product.image}
                width={300}
                height={300}
                alt={`${product.design} Saree`}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div style={{ padding: "10px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "6px" }}>{product.design}</h2>
                <p style={{ fontSize: "0.9rem", marginBottom: "4px" }}><strong>Fabric:</strong> {product.fabric}</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

