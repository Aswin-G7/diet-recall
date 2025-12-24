import React from "react";

import './MealsLogged.css'

const MealsLogged = () => {
  return (
    <section className="progress-section">
      <h2 className="section-title">Meals Logged Today</h2>

      <div className="meals-grid">
        <div className="meal-status logged">Breakfast</div>
        <div className="meal-status logged">Lunch</div>
        <div className="meal-status not-logged">Snack</div>
        <div className="meal-status logged">Dinner</div>
      </div>
    </section>
  );
};

export default MealsLogged;
