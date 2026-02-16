import { useEffect, useState } from "react";
import { useApp } from "../../AppContext"; // 1. Import the Context
import "./ProgressSummary.css";

const ProgressSummary = () => {
  const { userProfile } = useApp(); // 2. Get the user profile
  
  const [summary, setSummary] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    sugar: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/meals/summary/today", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
        setSummary({ calories: 0, protein: 0, carbs: 0, sugar: 0 });
      }
    };

    fetchSummary();
  }, []);

  // 3. Get the dynamic goal (Default to 2000 if loading or missing)
  const dailyGoal = userProfile?.dailyCalorieTarget || 2000;

  return (
    <section className="progress-section">
      <h2 className="section-title">Today’s Summary</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Calories</h3>
          <p className="summary-value">{Math.round(summary.calories)} kcal</p>
          {/* 4. Display the dynamic goal */}
          <span className="summary-sub">/ {dailyGoal} kcal</span>
        </div>

        <div className="summary-card">
          <h3>Protein</h3>
          <p className="summary-value">{Math.round(summary.protein)} g</p>
        </div>

        <div className="summary-card">
          <h3>Carbs</h3>
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