import Link from "next/link";
import Image from "next/image";
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

interface PageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, id } = await params; // Awaiting params for Next.js 15+

  const typedProductsData: Product[] = productsData as Product[];

  const product = typedProductsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={{ padding: "140px 16px", textAlign: "center" }}>
        <h1>Product not found</h1>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  // Filter Related Products
  const relatedProducts = typedProductsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ minHeight: "100vh", padding: "140px 16px", backgroundColor: "#fff0f5" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Main Product Card */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
          <h1 style={{ textAlign: "center", fontSize: "2.2rem", fontWeight: 700, marginBottom: "30px", fontFamily: "serif" }}>
            {product.title}
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={product.title}
                  width={500}
                  height={600}
                  priority={index === 0}
                  style={{ width: "100%", borderRadius: "12px", objectFit: "cover", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
                />
              ))}
            </div>

            <div style={{ fontSize: "1.1rem" }}>
              <p style={{ fontSize: "1.8rem", color: "#ff1493", fontWeight: 700, marginBottom: "10px" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              {product.originalPrice && (
                <p style={{ textDecoration: "line-through", color: "#888", marginBottom: "20px" }}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </p>
              )}
              
              <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
                <p style={{ marginBottom: "10px" }}><strong>Fabric:</strong> {product.fabric}</p>
                <p style={{ marginBottom: "10px" }}><strong>Weave:</strong> {product.weave}</p>
                <p style={{ marginTop: "15px", color: "#555", lineHeight: "1.6" }}>{product.description}</p>
              </div>

              <div style={{ marginTop: "35px", display: "flex", flexWrap: "wrap", gap: "15px" }}>
                <Link 
                  href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`} 
                  style={{ flex: 1, minWidth: "150px", textAlign: "center", padding: "15px", borderRadius: "30px", border: "2px solid #ff69b4", color: "#ff69b4", textDecoration: "none", fontWeight: 600 }}
                >
                  Back to {product.category}
                </Link>
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=I am interested in ${encodeURIComponent(product.title)} (ID: ${product.id})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: 1, minWidth: "150px", textAlign: "center", padding: "15px", borderRadius: "30px", background: "#25D366", color: "#fff", textDecoration: "none", fontWeight: 700, boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)" }}
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "30px", fontFamily: "serif" }}>More from {product.category}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/product/${rp.slug}/${rp.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: "#fff", padding: "10px", borderRadius: "12px", textAlign: "center", transition: "transform 0.2s" }}>
                    <Image src={rp.images[0]} alt={rp.title} width={200} height={250} style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
                    <h3 style={{ fontSize: "1rem", marginTop: "10px" }}>{rp.title}</h3>
                    <p style={{ color: "#ff1493", fontWeight: 600 }}>₹{rp.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
