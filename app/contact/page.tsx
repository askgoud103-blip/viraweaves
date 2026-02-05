"use client";

import Navbar from "../components/Navbar";
import { COLORS } from "@/lib/colors";

export default function ContactPage() {
  const contactInfo = [
    { title: "Mobile & Whatsapp", value: "7093430194" },

    {
      title: "Email",
      value: (
        <>
          viraweaves@gmail.com
          <br />
          <strong>Website</strong>
          <br />
          https://viraweaves.vercel.app
        </>
      ),
    },

    {
      title: "Address",
      value: (
        <>
          # 11-13-940, E Rd No.2 <br />
          Green Hills Colony <br />
          Kothapet, Saroornagar <br />
          Hyderabad, Telangana <br />
          500102
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: COLORS.cream }}>
      <Navbar />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "calc(100vh - 70px)",
          padding: "40px 20px",
          gap: "30px",
        }}
      >
        <h1 style={{ fontSize: "2.4rem", color: COLORS.maroon }}>
          Contact Vira~Weaves
        </h1>

        <p style={{ fontSize: "1.1rem", color: "#333", maxWidth: "800px" }}>
          We’d love to hear from you! For inquiries, collaborations, or support, reach out to us
          through email or social media. Your feedback is valuable and helps us bring the best
          handwoven sarees to you.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            width: "100%",
            maxWidth: "1000px",
            paddingBottom: "10px",
          }}
        >
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, #fff7ec, #f5e3c3)",
                borderRadius: "12px",
                padding: "22px",
                border: `1px solid ${COLORS.gold}`,
                minWidth: "250px",
                textAlign: "center",
                flexShrink: 0,
                boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 22px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.08)";
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: COLORS.maroon,
                  marginBottom: "10px",
                }}
              >
                {info.title}
              </h2>

              <p style={{ fontSize: "1rem", color: COLORS.maroon, margin: 0 }}>
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

