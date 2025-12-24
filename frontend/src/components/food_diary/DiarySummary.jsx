import React from "react";
import "./DiarySummary.css";

const DiarySummary = () => {
  return (
    <div className="diary-summary">
      <h3>Daily Summary</h3>

      <div className="summary-grid">
        <div className="summary-item">
          <span>Calories</span>
          <strong>0 kcal</strong>
        </div>

        <div className="summary-item">
          <span>Protein</span>
          <strong>0 g</strong>
        </div>

        <div className="summary-item">
          <span>Carbs</span>
          <strong>0 g</strong>
        </div>

        <div className="summary-item">
          <span>Fat</span>
          <strong>0 g</strong>
        </div>
      </div>
    </div>
  );
};

export default DiarySummary;
