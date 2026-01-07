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
        const res = await fetch(
          "http://localhost:5000/api/meals/summary/today"
        );

        if (!res.ok) throw new Error("Failed to fetch summary");

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error(err);
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
          <p className="summary-value">{summary.calories} kcal</p>
          <span className="summary-sub">/ 2000 kcal</span>
        </div>

        <div className="summary-card">
          <h3>Protein</h3>
          <p className="summary-value">{summary.protein} g</p>
        </div>

        <div className="summary-card">
          <h3>Carbs</h3>
          <p className="summary-value">{summary.carbs.toFixed(1)} g</p>
        </div>

        <div className="summary-card">
          <h3>Sugar</h3>
          <p className="summary-value">{summary.sugar} g</p>
        </div>
      </div>
    </section>
  );
};

export default ProgressSummary;
