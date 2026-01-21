// app/product/[slug]/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  const { slug, id } = params;

  // Safety: ensure slug/id exist
  const safeSlug = slug || "unknown";
  const safeId = id || "0";

  // Generate image path; if file missing, fallback to placeholder
  const imageSrc = `/categories/${safeSlug}/${safeId}.jpg`;
  const placeholderSrc = "/placeholder.jpg";

  // Mock product info (replace with DB later)
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

  const info = productInfo[safeSlug] || {
    price: "Price on request",
    fabric: "Premium Fabric",
    design: "Traditional",
  };

  const title = safeSlug.replace(/-/g, " ").toUpperCase();

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
        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          {title} — Saree #{safeId}
        </h1>

        {/* Product Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Image */}
          <Image
            src={imageSrc || placeholderSrc}
            width={600}
            height={600}
            alt={`Saree ${safeId}`}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />

          {/* Details */}
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

            {/* Action Buttons */}
            <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>
              <Link
                href={`/category/${safeSlug}`}
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
                href={`https://wa.me/91XXXXXXXXXX?text=I am interested in ${title} Saree ${safeId}`}
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

