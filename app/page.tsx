export default function Home() {
  return (
    <main className="w-full min-h-screen">
      {/* Navbar */}
      <nav className="w-full py-6 flex justify-between px-10 fixed top-0 left-0 bg-black/60 backdrop-blur z-50">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wider">
          ViraWeaves
        </h1>

        <div className="space-x-8 text-lg">
          <a href="/" className="hover:text-yellow-400">Home</a>
          <a href="/collections" className="hover:text-yellow-400">Collections</a>
          <a href="/about" className="hover:text-yellow-400">About</a>
          <a href="/contact" className="hover:text-yellow-400">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full min-h-screen bg-[url('/vira-bg.jpg')] bg-cover bg-center flex items-center justify-center px-10">
        <div className="text-center mt-20">
          <h2 className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">
            Elegance Woven Into Every Saree
          </h2>
          <p className="text-xl mb-8">Handcrafted • Premium • Luxury Collections</p>
          <a
            href="/collections"
            className="px-8 py-3 text-lg bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
          >
            Explore Sarees
          </a>
        </div>
      </section>
    </main>
  );
}

