import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";

interface Product {
  id: string;
  category: string;
  slug: string;
  title: string;
  price: number;
  originalPrice?: number;
  fabric: string;
  weave: string;
  description: string;
  images: string[];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  // 1. Await params for Next.js 15
  const { id } = await params;

  // 2. Find the product
  const product = (productsData as Product[]).find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  // 3. WHATSAPP LOGIC
  const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // <-- CHANGE THIS to your actual number
  const message = encodeURIComponent(
    `Namaste Viraweaves! 🙏\n\nI am interested in this saree:\n*Product:* ${product.title}\n*Price:* ₹${product.price.toLocaleString("en-IN")}\n*ID:* ${product.id}\n\nIs this available?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff0f5", padding: "120px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        
        {/* Left: Product Images */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {product.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={product.title}
              width={500}
              height={700}
              priority={idx === 0}
              style={{ width: "100%", height: "auto", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
            />
          ))}
        </div>

        {/* Right: Product Details */}
        <div style={{ position: "sticky", top: "140px", height: "fit-content" }}>
          <Link href={`/category/all`} 
                style={{ color: "#ff69b4", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
            ← BACK TO COLLECTION
          </Link>
          
          <h1 style={{ fontSize: "2.5rem", fontFamily: "serif", margin: "10px 0", color: "#333" }}>
            {product.title}
          </h1>

          <div style={{ margin: "20px 0" }}>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: "#ff1493" }}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>

          <div style={{ borderTop: "1px solid #ffb6c1", borderBottom: "1px solid #ffb6c1", padding: "20px 0", margin: "20px 0" }}>
            <p style={{ marginBottom: "10px" }}><strong>Fabric:</strong> {product.fabric}</p>
            <p style={{ marginBottom: "10px" }}><strong>Weave:</strong> {product.weave}</p>
            <p style={{ lineHeight: "1.6", color: "#555" }}>{product.description}</p>
          </div>

          {/* WHATSAPP INQUIRY BUTTON */}
          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              padding: "18px",
              backgroundColor: "#25D366", // Official WhatsApp Green
              color: "white",
              textAlign: "center",
              borderRadius: "30px",
              fontSize: "1.1rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 5px 15px rgba(37,211,102,0.4)",
            }}
          >
            Inquiry on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
