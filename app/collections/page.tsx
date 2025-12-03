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
    <main className="min-h-screen bg-black text-white px-6 py-20">
      {/* Page Title */}
      <main className="min-h-screen bg-black text-white px-6 py-20">
  {/* Page Title */}
  <h1 className="text-4xl font-bold text-center mb-12">
    Our Collections
  </h1>

  {/* Products Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300"
      >
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* Text */}
        <div className="p-5">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-400 mt-1">{product.price}</p>

          {/* Button */}
          <button className="mt-5 w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-300 transition">
            View Item
          </button>
        </div>
      </div>
    ))}
  </div>
</main>



      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />

            {/* Text */}
            <div className="p-5">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-400 mt-1">{product.price}</p>

              {/* Button */}
              <button className="mt-5 w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-300 transition">
                View Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

