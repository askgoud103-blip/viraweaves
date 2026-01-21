"use client";

import Navbar from "../components/Navbar";

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
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#ffc0cb" }}>
      {/* Navbar */}
      <Navbar />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "calc(100vh - 80px)",
          padding: "20px",
          boxSizing: "border-box",
          gap: "30px",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontSize: "3rem",
            color: "black",
            marginBottom: "20px",
            textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          Contact Vira~Weaves
        </h1>

        {/* Intro Text */}
        <p style={{ fontSize: "1.5rem", color: "black", maxWidth: "800px" }}>
          We’d love to hear from you! For inquiries, collaborations, or support, reach out to us
          through email or social media. Your feedback is valuable and helps us bring the best
          handwoven sarees to you.
        </p>

        {/* Horizontal Scrollable Contact Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            overflowX: "auto",
            padding: "10px 0",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, #fff0f5, #ffc0cb)",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                minWidth: "250px",
                maxWidth: "300px",
                textAlign: "center",
                flexShrink: 0,
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
            >
              <h2
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                {info.title}
              </h2>

              <p
                style={{
                  whiteSpace: "pre-line",
                  fontSize: "1.1rem",
                  color: "black",
                  margin: 0,
                }}
              >
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

