import "./LogMeal.css";
import MealSection from "./MealSection";

const LogMeal = () => {
  return (
    <div className="log-meal-page">
      <h1 className="log-meal-title">Log Your Meals</h1>

      <MealSection
        title="Breakfast"
        mealType="breakfast"
        placeholder="e.g. 2 idli with sambar"
      />

      <MealSection
        title="Lunch"
        mealType="lunch"
        placeholder="e.g. rice, dal and chicken curry"
      />

      <MealSection
        title="Evening Snack"
        mealType="snack"
        placeholder="e.g. tea and biscuits"
      />

      <MealSection
        title="Dinner"
        mealType="dinner"
        placeholder="e.g. roti and paneer curry"
      />
    </div>
  );
};

export default LogMeal;
