import React from "react";

import './ProgressSummary.css'

const ProgressSummary = () => {
  return (
    <section className="progress-section">
      <h2 className="section-title">Today’s Summary</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Calories</h3>
          <p className="summary-value">1450 kcal</p>
          <span className="summary-sub">/ 2000 kcal</span>
        </div>

        <div className="summary-card">
          <h3>Protein</h3>
          <p className="summary-value">78 g</p>
        </div>

        <div className="summary-card">
          <h3>Carbs</h3>
          <p className="summary-value">180 g</p>
        </div>

        <div className="summary-card">
          <h3>Fat</h3>
          <p className="summary-value">52 g</p>
        </div>
      </div>
    </section>
  );
};

export default ProgressSummary;
