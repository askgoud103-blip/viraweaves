import productsData from "@/data/products.json";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  category: string;
  slug: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  fabric?: string;
  image?: string;
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const safeSlug = params.slug.toLowerCase();

  // ✅ Filter products by category (FIXED)
  const products: Product[] = (productsData as Product[]).filter(
    (product) => product.category === safeSlug
  );

  const title = safeSlug.replace(/-/g, " ").toUpperCase();

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}/${product.id}`}
              className="border rounded-lg p-3 hover:shadow-lg transition"
            >
              <div className="relative w-full h-56 mb-3">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <h2 className="text-sm font-semibold">{product.title}</h2>

              <div className="mt-1">
                <span className="font-bold">
                  {product.currency} {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through ml-2 text-sm">
                    {product.currency} {product.originalPrice}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

