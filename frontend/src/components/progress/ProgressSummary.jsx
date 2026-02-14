import { useEffect, useState } from "react";
import "./ProgressSummary.css";

const ProgressSummary = () => {
  const [summary, setSummary] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    sugar: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token"); // 🚨 GET TOKEN

        const res = await fetch("http://localhost:5000/api/meals/summary/today", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // 🚨 SEND TOKEN
          }
        });

        if (!res.ok) throw new Error("Failed to fetch summary");

        const data = await res.json();
        setSummary({
          calories: data?.calories || 0,
          protein: data?.protein || 0,
          carbs: data?.carbs || 0,
          sugar: data?.sugar || 0,
        });
      } catch (err) {
        console.error("Summary fetch error:", err);
        // Fallback to zeroes if fetch fails
        setSummary({ calories: 0, protein: 0, carbs: 0, sugar: 0 });
      }
    };

    fetchSummary();
  }, []);

  return (
    <section className="progress-section">
      <h2 className="section-title">Today’s Summary</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Calories</h3>
          <p className="summary-value">{Math.round(summary.calories)} kcal</p>
          {/* Optional: You can pull '2000' from AppContext later if you want a dynamic goal! */}
          <span className="summary-sub">/ 2000 kcal</span>
        </div>

        <div className="summary-card">
          <h3>Protein</h3>
          <p className="summary-value">{Math.round(summary.protein)} g</p>
        </div>

        <div className="summary-card">
          <h3>Carbs</h3>
          {/* Use optional chaining and fallback for toFixed to prevent crashes */}
          <p className="summary-value">{(summary.carbs || 0).toFixed(1)} g</p>
        </div>

        <div className="summary-card">
          <h3>Sugar</h3>
          <p className="summary-value">{Math.round(summary.sugar)} g</p>
        </div>
      </div>
    </section>
  );
};

export default ProgressSummary;