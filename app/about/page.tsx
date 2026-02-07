"use client";

import Navbar from "../components/Navbar";
import { COLORS } from "@/lib/colors";

export default function AboutPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: COLORS.cream }}>
      <Navbar />

      {/* --- HERO SECTION (Reduced Top Padding) --- */}
      <section style={{ 
        padding: "100px 20px 30px", // Reduced from 160px
        textAlign: "center", 
        background: `linear-gradient(to bottom, ${COLORS.cream}, #fff)` 
      }}>
        <h1 style={{ 
          fontFamily: "serif", 
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)", 
          color: COLORS.maroon,
          margin: 0
        }}>
          About Vira~Weaves
        </h1>
        <div style={{ 
          width: "40px", 
          height: "2px", 
          backgroundColor: COLORS.gold, 
          margin: "15px auto" 
        }}></div>
      </section>

      {/* --- FOUNDER SECTION (Tighter Gaps) --- */}
      <section style={{ padding: "20px 20px 60px" }}> {/* Reduced top/bottom padding */}
        <div style={{ 
          maxWidth: "1100px", 
          margin: "0 auto", 
          display: "flex", 
          flexWrap: "wrap", 
          alignItems: "center", 
          gap: "40px" // Reduced gap between photo and text
        }}>
          
          {/* Left: The Photo with Artistic Frame */}
          <div style={{ flex: "1 1 350px", position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              width: "100%",
              height: "100%",
              border: `2px solid ${COLORS.gold}`,
              borderRadius: "20px",
              zIndex: 1
            }}></div>
            <img 
              src="/founder.jpg" 
              alt="The Soul of Viraweaves"
              style={{ 
                width: "100%", 
                maxHeight: "550px", // Prevents image from being too tall
                borderRadius: "20px", 
                display: "block",
                position: "relative",
                zIndex: 2,
                objectFit: "cover",
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }} 
            />
          </div>

          {/* Right: The Brand Story */}
          <div style={{ flex: "1 1 450px" }}>
            <span style={{ 
              color: COLORS.gold, 
              letterSpacing: "2px", 
              textTransform: "uppercase", 
              fontSize: "0.8rem",
              fontWeight: 700
            }}>
              The Heart of the Brand
            </span>
            <h2 style={{ 
              fontFamily: "serif", 
              fontSize: "2.5rem", 
              color: COLORS.maroon, 
              lineHeight: "1.1",
              margin: "10px 0 20px"
            }}>
              Crafted with Love, <br/>Worn with Grace
            </h2>
            
            <p style={{ 
              fontSize: "1.05rem", 
              color: "#333", 
              lineHeight: "1.7",
              marginBottom: "15px" 
            }}>
              Welcome to Vira~Weaves. We bring you the finest handwoven sarees, 
              crafted with care by skilled artisans. Each weave tells a story of 
              culture and timeless style—made to drape you in grace.
            </p>

            <p style={{ 
              fontSize: "1.05rem", 
              color: "#333", 
              lineHeight: "1.7",
              fontStyle: "italic",
              borderLeft: `3px solid ${COLORS.gold}`,
              paddingLeft: "15px",
              marginBottom: "25px"
            }}>
              "Our mission is to preserve the silent whispers of our weavers and celebrate 
              the pride of the women who wear our sarees."
            </p>
            
            <div style={{ marginTop: "30px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
               <p style={{ 
                 fontFamily: "serif", 
                 fontSize: "1.6rem", 
                 color: COLORS.maroon, 
                 margin: 0 
               }}>
                 [Her Name Here]
               </p>
               <p style={{ color: COLORS.gold, fontWeight: "600", fontSize: "0.85rem", letterSpacing: "1px" }}>
                 FOUNDER & VISIONARY
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Small footer accent */}
      <div style={{ height: "40px" }}></div>
    </div>
  );
}
