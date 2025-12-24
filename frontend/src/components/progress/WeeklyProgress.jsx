import React from "react";

import './WeeklyProgress.css'

const WeeklyProgress = () => {
  return (
    <section className="progress-section">
      <h2 className="section-title">Weekly Progress</h2>

      <div className="weekly-summary">
        <div className="weekly-card">
          <h4>Average Calories</h4>
          <p>1720 kcal</p>
        </div>

        <div className="weekly-card trend up">
          <h4>Trend</h4>
          <p>⬆ +120 kcal</p>
        </div>
      </div>

      <div className="weekly-chart">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
          <div key={i} className="chart-bar">
            <div className="bar" style={{ height: `${40 + i * 5}px` }}></div>
            <span>{day}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeeklyProgress;
