import { useState } from "react";
import "./LogMeal.css";
import MealSection from "./MealSection";


const LogMeal = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState([]);
  const [error, setError] = useState("");

  const fetchNutrition = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setNutritionData([]);

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            "X-Api-Key": "YOUR_API_KEY_HERE",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch nutrition data");
      }

      const data = await response.json();
      setNutritionData(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-meal-page">
      <h1 className="log-meal-title">Log Your Meals</h1>

      {/* Breakfast */}
      <MealSection title="Breakfast" placeholder="e.g. 2 idli with sambar" />

      {/* Lunch */}
      <MealSection title="Lunch" placeholder="e.g. rice, dal and chicken curry" />

      {/* Evening Snack */}
      <MealSection title="Evening Snack" placeholder="e.g. tea and biscuits" />

      {/* Dinner */}
      <MealSection title="Dinner" placeholder="e.g. roti and paneer curry" />

      {/* Nutrition */}
      {/* <div className="meal-input">
        <textarea
          placeholder="Example: 2 idli and 1 cup sambar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchNutrition} disabled={loading}>
          {loading ? "Fetching..." : "Get Nutrition"}
        </button>
      </div> */}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Results */}
      {nutritionData.length > 0 && (
        <div className="nutrition-results">
          {nutritionData.map((item, index) => (
            <div key={index} className="nutrition-card">
              <h3>{item.name}</h3>

              <ul>
                <li><strong>Calories:</strong> {item.calories} kcal</li>
                <li><strong>Protein:</strong> {item.protein_g} g</li>
                <li><strong>Carbs:</strong> {item.carbohydrates_total_g} g</li>
                <li><strong>Fat:</strong> {item.fat_total_g} g</li>
                <li><strong>Fiber:</strong> {item.fiber_g} g</li>
                <li><strong>Sugar:</strong> {item.sugar_g} g</li>
                <li><strong>Sodium:</strong> {item.sodium_mg} mg</li>
                <li><strong>Serving Size:</strong> {item.serving_size_g} g</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogMeal;
