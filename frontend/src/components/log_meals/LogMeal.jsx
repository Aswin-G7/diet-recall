import "./LogMeal.css";
import MealSection from "./MealSection";

const LogMeal = () => {
  return (
    <div className="log-meal-page">
      <h1 className="log-meal-title">Log Your Meals</h1>

      <MealSection
        title="Breakfast"
        placeholder="e.g. 2 idli with sambar"
      />

      <MealSection
        title="Lunch"
        placeholder="e.g. rice, dal and chicken curry"
      />

      <MealSection
        title="Evening Snack"
        placeholder="e.g. tea and biscuits"
      />

      <MealSection
        title="Dinner"
        placeholder="e.g. roti and paneer curry"
      />
    </div>
  );
};

export default LogMeal;
