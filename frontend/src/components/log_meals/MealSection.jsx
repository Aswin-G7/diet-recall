import { useState } from "react";
import "./MealSection.css";

const MealSection = ({ title, placeholder, mealType }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState([]);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [success, setSuccess] = useState("");

  const [hasFetched, setHasFetched] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);

  // ---------------- FETCH NUTRITION ----------------
  const fetchNutrition = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setNutritionData([]);

    try {
      const response = await fetch("http://localhost:5000/api/nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch nutrition data");
      }

      const data = await response.json();
      setNutritionData(data);
      setHasFetched(true); // ✅ nutrition fetched
    } catch (err) {
      setError("Failed to fetch nutrition data");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- REGISTER MEAL ----------------
  const registerMeal = async () => {
    setRegistering(true);
    setError("");
    setSuccess("");

    try {
      let dataToRegister = nutritionData;

      // Safety: fetch nutrition if user skipped it
      if (nutritionData.length === 0) {
        const response = await fetch("http://localhost:5000/api/nutrition", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch nutrition data");
        }

        dataToRegister = await response.json();
        setNutritionData(dataToRegister);
        setHasFetched(true);
      }

      const saveResponse = await fetch(
        "http://localhost:5000/api/meals/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mealType,
            query,
            nutritionData: dataToRegister,
          }),
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Failed to register meal");
      }

      setSuccess("Meal registered successfully ✅");
      setHasRegistered(true); // ✅ meal saved
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setRegistering(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="meal-card">
      <h2 className="meal-title">{title}</h2>

      <input
        type="text"
        className="meal-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHasFetched(false);
          setHasRegistered(false);
          setSuccess("");
          setNutritionData([]);
        }}
      />

      {/* GET NUTRITION */}
      <button
        className="meal-button"
        onClick={fetchNutrition}
        disabled={loading || !query.trim() || hasFetched}
      >
        {loading ? "Fetching..." : "Get Nutrition"}
      </button>

      {/* REGISTER MEAL */}
      <button
        className="meal-button secondary"
        onClick={registerMeal}
        disabled={registering || !query.trim() || hasRegistered}
      >
        {registering ? "Registering..." : "Register Meal"}
      </button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {nutritionData.length > 0 && (
        <div className="nutrition-table-wrapper">
          <table className="nutrition-table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Calories</th>
                <th>Serving (g)</th>
                <th>Protein (g)</th>
                <th>Fat (g)</th>
                <th>Sat. Fat (g)</th>
                <th>Carbs (g)</th>
                <th>Fiber (g)</th>
                <th>Sugar (g)</th>
                <th>Sodium (mg)</th>
                <th>Potassium (mg)</th>
                <th>Cholesterol (mg)</th>
              </tr>
            </thead>
            <tbody>
              {nutritionData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.calories ?? "-"}</td>
                  <td>{item.serving_size_g ?? "-"}</td>
                  <td>{item.protein_g ?? "-"}</td>
                  <td>{item.fat_total_g ?? "-"}</td>
                  <td>{item.fat_saturated_g ?? "-"}</td>
                  <td>{item.carbohydrates_total_g ?? "-"}</td>
                  <td>{item.fiber_g ?? "-"}</td>
                  <td>{item.sugar_g ?? "-"}</td>
                  <td>{item.sodium_mg ?? "-"}</td>
                  <td>{item.potassium_mg ?? "-"}</td>
                  <td>{item.cholesterol_mg ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MealSection;
