"use client";
import reviewsData from "@/data/reviews.json";
import { COLORS } from "@/lib/colors";
import { Star } from "lucide-react";

export default function Reviews() {
  return (
    <section style={{ padding: "80px 20px", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ 
          fontFamily: "serif", 
          fontSize: "2.5rem", 
          textAlign: "center", 
          color: COLORS.maroon, 
          marginBottom: "40px" 
        }}>
          What Our Weavers Say
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "30px" 
        }}>
          {reviewsData.map((review) => (
            <div key={review.id} style={{
              padding: "30px",
              borderRadius: "20px",
              backgroundColor: COLORS.cream,
              border: `1px solid #eee`,
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
            }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "15px" }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill={COLORS.gold} color={COLORS.gold} />
                ))}
              </div>
              <p style={{ fontStyle: "italic", lineHeight: "1.6", color: "#444", marginBottom: "20px" }}>
                "{review.comment}"
              </p>
              <div>
                <strong style={{ display: "block", color: COLORS.maroon }}>{review.name}</strong>
                <span style={{ fontSize: "0.85rem", color: "#888" }}>{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
