import React, { useEffect, useState } from "react";
import "./DiaryMeals.css";

const MEAL_TYPES = ["breakfast", "lunch", "snack", "dinner"];

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const DiaryMeals = ({ selectedDate }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryMeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/meals/diary");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Failed to load diary meals", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryMeals();
  }, []);

  const mealsByType = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = meals.filter((meal) => {
      const mealDate = new Date(meal.createdAt);
      return meal.mealType === type && isSameDay(mealDate, selectedDate);
    });
    return acc;
  }, {});

  if (loading) {
    return <p className="loading-text">Loading food diary...</p>;
  }

  return (
    <div className="diary-meals">
      {MEAL_TYPES.map((type) => (
        <div key={type} className="diary-meal-card">
          <div className="meal-header">
            <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <button className="add-meal-btn">+ Add</button>
          </div>

          {mealsByType[type].length === 0 ? (
            <p className="empty-text">No items logged</p>
          ) : (
            mealsByType[type].map((meal) => (
              <div key={meal._id} className="meal-entry">
                <p className="meal-raw">{meal.rawInput}</p>

                <div className="nutrition-table-wrapper">
                  <table className="nutrition-table">
                    <thead>
                      <tr>
                        <th>Food</th>
                        <th>Calories</th>
                        <th>Carbs (g)</th>
                        <th>Protein (g)</th>
                        <th>Sugar (g)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meal.foods.map((food) => (
                        <tr key={food._id}>
                          <td>{food.name}</td>
                          <td>{Math.round(food.calories)}</td>
                          <td>{food.carbs?.toFixed(1)}</td>
                          <td>{food.protein?.toFixed(1)}</td>
                          <td>{food.sugar?.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="meal-total">
                  <strong>Total:</strong> {Math.round(meal.totalCalories)} kcal
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default DiaryMeals;
