"use client";

export default function CollectionsPage() {
  const products = [
    {
      id: 1,
      name: "Kanchipattu Bridal Saree",
      price: "₹12,999",
      image: "/saree1.jpg",
    },
    {
      id: 2,
      name: "Designer Soft Silk Saree",
      price: "₹8,499",
      image: "/saree2.jpg",
    },
    {
      id: 3,
      name: "Organza Embroidery Saree",
      price: "₹6,999",
      image: "/saree3.jpg",
    },
    {
      id: 4,
      name: "Banarasi Weaving Saree",
      price: "₹10,499",
      image: "/saree4.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Our Collections
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-400 mt-1">{product.price}</p>

              <button className="mt-4 w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
                View Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

