// app/catalogs/[slug]/page.tsx
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export default function CatalogPage({ params }: Props) {
  const slug = params?.slug;

  if (!slug) {
    return (
      <p style={{ textAlign: "center", padding: "50px" }}>
        Invalid catalog
      </p>
    );
  }

  // Path to the catalog folder in /public/catalogs/{slug}
  const catalogDir = path.join(process.cwd(), "public", "catalogs", slug);

  let images: string[] = [];

  try {
    images = fs
      .readdirSync(catalogDir)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .map((file) => `/catalogs/${slug}/${file}`);
  } catch (error) {
    return (
      <p style={{ textAlign: "center", padding: "50px" }}>
        Catalog not found
      </p>
    );
  }

  return (
    <div
      style={{
        padding: "140px 20px",
        minHeight: "100vh",
        backgroundColor: "#fff0f5",
      }}
    >
      {/* Title */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 700,
          textTransform: "capitalize",
          marginBottom: "20px",
        }}
      >
        {slug.replace(/-/g, " ")} Catalog
      </h1>

      {/* Images */}
      {images.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
          No images available
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {images.map((imgSrc) => {
            const id = path.basename(imgSrc, path.extname(imgSrc));

            return (
              <Link
                key={imgSrc}
                href={`/product/${slug}/${id}`}
                style={{ textDecoration: "none" }}
              >
                <Image
                  src={imgSrc}
                  alt={`Saree ${id}`}
                  width={800}
                  height={1000}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

