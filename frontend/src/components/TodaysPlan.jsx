import React from "react";
import "./TodaysPlan.css";

const TodaysPlan = () => {
  return (
    <section className="todays-plan">
      <h2>Today's Plan</h2>

      <div className="plan-cards">
        <div className="plan-card">
          <h3>Breakfast</h3>
          <p>Oats + Banana</p>
          <span>350 kcal</span>
        </div>

        <div className="plan-card">
          <h3>Lunch</h3>
          <p>Rice + Dal + Vegetables</p>
          <span>550 kcal</span>
        </div>

        <div className="plan-card">
          <h3>Dinner</h3>
          <p>Chapati + Paneer</p>
          <span>450 kcal</span>
        </div>
      </div>
    </section>
  );
};

export default TodaysPlan;
