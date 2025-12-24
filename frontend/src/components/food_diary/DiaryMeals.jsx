import React from "react";
import "./DiaryMeals.css";

const meals = ["Breakfast", "Lunch", "Snack", "Dinner"];

const DiaryMeals = () => {
  return (
    <div className="diary-meals">
      {meals.map((meal) => (
        <div key={meal} className="diary-meal-card">
          <div className="meal-header">
            <h3>{meal}</h3>
            <button className="add-meal-btn">+ Add</button>
          </div>

          <p className="empty-text">No items logged</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryMeals;
