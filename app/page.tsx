// app/page.tsx

"use client";
export const dynamic = 'force-dynamic';
// import products from "@/data/products.json";
import { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { normalize } from "@/lib/utils";
import { COLORS } from "@/lib/colors";




// 2. Centralized Data Arrays
const CATEGORIES = [
  "Jamdhani", "Banarasi", "Kanchi Pattu", "Narayanpet", "Pochampally", 
  "Gadwal", "Venkatagiri", "Kotha", "Fancy", "Viscos", 
  "Pure Georgette", "JimmiChoo", "Designer Sarees", "OfficeWear", "CasualWear"
];

const QUICK_FILTERS = [
  { label: "Below Rs.2K", cat: "jamdhani", params: "?maxPrice=2000" },
  { label: "Below Rs.5K", cat: "banarasi", params: "?maxPrice=5000" },
  { label: "Rs.10K – 15K", cat: "kanchi-pattu", params: "?minPrice=10000&maxPrice=15000" },
  { label: "Rs.15K – 30K", cat: "jamdhani", params: "?minPrice=15000&maxPrice=30000" },
  { label: "Above Rs.45K", cat: "kanchi-pattu", params: "?minPrice=45000" },
  { label: "New Arrivals", cat: "pochampally", params: "" },
  { label: "Trending", cat: "narayanpet", params: "" },
  { label: "Popular", cat: "gadwal", params: "" },
  { label: "Designer", cat: "designer-sarees", params: "" },
];

const SAREE_IMAGES = [
  "/dir.jpg", "/dir9.jpg", "/dir20.jpg", "/dir10.jpg",
  "/dir21.jpg", "/dir11.jpg", "/dir22.jpg", "/dir12.jpg",
  "/dir23.jpg", "/dir13.jpg", "/dir24.jpg", "/dir14.jpg",
];

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const prevTranslate = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const speed = 0.5;
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isDragging && !isHovering) {
        setTranslateX((prev) => {
          let next = prev - speed;
          const total = container.scrollWidth / 2;
          if (Math.abs(next) >= total) next += total;
          return next;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging, isHovering]);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    dragStartX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMouseMove = (e: any) => {
  if (!isDragging) return;
  const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const delta = currentX - dragStartX.current;
  setTranslateX((prev) => prev + delta);
  dragStartX.current = currentX;
};


  const handleMouseUp = () => {
    setIsDragging(false);
    prevTranslate.current = translateX;
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: COLORS.cream, overflowX: "hidden" }}>
      <Navbar />

      {/* HERO SECTION */}
      
      <section
  style={{
    padding: "60px 10px 20px",
    textAlign: "center",
    background: `linear-gradient(to bottom, ${COLORS.cream}, #fff)`,
  }}
>

      
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{ color: COLORS.gold }}>
  Authentic Indian Heritage
</span>

          
          <h1 style={{ color: COLORS.maroon }}>
  Viraweaves
</h1>

          
          <p style={{ fontSize: "1rem", color: "#555", maxWidth: "500px", margin: "0 auto" }}>
            Timeless hand-woven traditions, crafted for the modern woman.
          </p>
        </div>
      </section>

      {/* SECTION 1: Auto Scroll */}
      <section style={{ textAlign: "center", paddingBottom: "20px" }}>
        <h2 style={{ fontFamily: "serif", fontSize: "2rem", fontWeight: 700, marginBottom: "20px", color: "#333" }}>
          Latest Arrivals
        </h2>
        <div
          ref={containerRef}
          style={{ overflow: "hidden", cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); handleMouseUp(); }}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <div style={{
            display: "flex",
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? "none" : "transform 0.1s linear",
          }}>
            {[...SAREE_IMAGES, ...SAREE_IMAGES].map((src, i) => (
              <img key={i} src={src} alt="Saree" style={{ height: "280px", borderRadius: "15px", marginRight: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", background: "white" }} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Categories Grid */}
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", // Responsive by default
          gap: "15px", 
          maxWidth: "1200px", 
          margin: "0 auto" 
        }}>
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat} 
              href={`/category/${normalize(cat)}`} 
              className="cat-link"
              style={{
                padding: "12px 8px", background: COLORS.maroon, color: "#fff", borderRadius: "10px",
                textDecoration: "none", fontWeight: "bold", fontSize: "0.75rem", display: "flex",
                alignItems: "center", justifyContent: "center", transition: "0.2s"
              }}
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: Quick Links (Price Filters) */}
      <section style={{ margin: "40px auto", maxWidth: "1100px", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontFamily: "serif", marginBottom: "30px" }}>Quick Links</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
          {QUICK_FILTERS.map((item) => (
            <Link
              key={item.label}
              href={`/category/${item.cat}${item.params}`}
              style={{
                flex: "1 1 calc(20% - 15px)", minWidth: "140px", padding: "18px 10px",
                borderRadius: "12px", background: COLORS.cream, textAlign: "center",
                fontWeight: 700, textDecoration: "none", color: COLORS.maroon, border: `1px solid ${COLORS.gold}`

              }}
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: Coming Soon */}
      <section style={{ textAlign: "center", padding: "60px 20px", background: "rgba(255,255,255,0.3)" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#333" }}>Coming Soon</h2>
        <p style={{ fontStyle: "italic", color: "#555" }}>Special Bridal Collections & Silk Weaves Launching Soon</p>
      </section>

      <style jsx global>{`
        .cat-link:hover { background: #b03d5d !important; transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
