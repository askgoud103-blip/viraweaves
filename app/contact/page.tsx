"use client";

import Navbar from "../components/Navbar";
import { COLORS } from "@/lib/colors";

export default function ContactPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: COLORS.cream }}>
      <Navbar />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h1 style={{ fontSize: "2.5rem", color: COLORS.maroon, marginBottom: "30px", textAlign: "center" }}>
          Contact Vira~Weaves
        </h1>

        {/* THE GRID CONTAINER: Handles the layout without scrolling */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "20px", 
          width: "100%",
          paddingBottom: "20px"
        }}>
          
          {/* TILE 1 */}
          <div style={tileStyle}>
            <h2 style={headingStyle}>Mobile & WhatsApp</h2>
            <div style={contentStyle}>
              <strong>Phone:</strong>{" "}
<a href="tel:+917093430194" style={linkStyle}>
  7093430194
</a> <br />
              <strong>Instagram:</strong><br />
              <a href="https://www.instagram.com/vira_weaves_/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                https://www.instagram.com/vira_weaves_/
              </a>
              <br />
              <strong>Facebook:</strong><br />
              <a href="https://www.facebook.com/profile.php?id=61570486516513" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Vira Weaves Official
              </a>
            </div>
          </div>

          {/* TILE 2 */}
          <div style={tileStyle}>
            <h2 style={headingStyle}>Email & Website</h2>
            <div style={contentStyle}>
              <strong>Email:</strong> viraweaves@gmail.com <br /><br />
              <strong>Website:</strong><br />
              <a href="https://viraweaves.vercel.app" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                viraweaves.vercel.app
              </a>
            </div>
          </div>

          {/* TILE 3 */}
<div style={tileStyle}>
  <h2 style={headingStyle}>Address & Location Map</h2>

  <div style={contentStyle}>
    # 11-13-940, E Rd No.2, <br />
    Green Hills Colony, Kothapet, <br />
    Saroornagar, Hyderabad, <br />
    Telangana 500102

    <br /><br />

    <strong>Location:</strong><br />

    <a
      href="https://www.google.com/maps?q=11-13-940+Green+Hills+Colony+Kothapet+Hyderabad"
      target="_blank"
      rel="noopener noreferrer"
      style={linkStyle}
    >
      View on Google Maps
    </a>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

// STYLES OBJECTS
const tileStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #fff7ec, #f5e3c3)",
  borderRadius: "15px",
  padding: "25px",
  border: `1px solid ${COLORS.gold}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%" // Ensures all tiles are the same height
};

const headingStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  color: COLORS.maroon,
  marginBottom: "15px",
  borderBottom: `1px solid ${COLORS.gold}44`,
  paddingBottom: "8px"
};

const contentStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: COLORS.maroon,
  lineHeight: "1.6",
  wordBreak: "break-word"
};

const linkStyle: React.CSSProperties = {
  color: COLORS.maroon,
  textDecoration: "underline",
  fontWeight: "500"
};
