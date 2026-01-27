import Link from "next/link";
import Image from "next/image";
import productsData from "../../../data/products.json";

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

  const typedProductsData: Product[] = productsData as Product[];

  const categoryProducts = typedProductsData.filter(
    (p) => p.category === slug
  );

  if (categoryProducts.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "50px" }}>
        No products found in this category
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {categoryProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.category}/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <Image
              src={product.images[0]}
              alt={product.title}
              width={800}
              height={1000}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
            <h2
              style={{
                textAlign: "center",
                marginTop: "8px",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {product.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

