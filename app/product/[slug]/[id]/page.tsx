import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, id } = await params;

  const imageSrc = `/categories/${slug}/${id}.jpg`;
  const title = slug.replace(/-/g, " ").toUpperCase();

  const productInfo: Record<
    string,
    { price: string; fabric: string; design: string }
  > = {
    "below-2k": { price: "₹1,999", fabric: "Cotton", design: "Jamdhani" },
    "below-5k": { price: "₹4,999", fabric: "Pure Silk", design: "Kanchi Pattu" },
    "10-to-15k": { price: "₹12,000", fabric: "Silk Blend", design: "Narayanpet" },
    "15-to-30k": { price: "₹22,000", fabric: "Pure Silk", design: "Gadwal" },
    "30-to-45k": { price: "₹35,000", fabric: "Silk Blend", design: "Venkatagiri" },
  };

  const info =
    productInfo[slug] ?? {
      price: "Price on request",
      fabric: "Premium Fabric",
      design: "Traditional",
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 16px",
        backgroundColor: "#fff0f5",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          {title} — Saree #{id}
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* ✅ Server-safe image */}
          <img
            src={imageSrc}
            alt={`Saree ${id}`}
            style={{
              width: "100%",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />

          <div style={{ fontSize: "1.1rem" }}>
            <p>
              <strong>Price:</strong> {info.price}
            </p>
            <p>
              <strong>Fabric:</strong> {info.fabric}
            </p>
            <p>
              <strong>Design:</strong> {info.design}
            </p>

            <p style={{ marginTop: "12px", color: "#555" }}>
              Elegant hand-crafted saree, perfect for weddings, festivals, and
              special occasions.
            </p>

            <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>
              <Link
                href={`/category/${slug}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "#ff69b4",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Back to Category
              </Link>

              <a
                href={`https://wa.me/91XXXXXXXXXX?text=I am interested in ${title} Saree ${id}`}
                target="_blank"
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "#25D366",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

