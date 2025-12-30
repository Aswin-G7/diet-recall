import Meal from "../models/Meal.js";
import { fetchNutritionData } from "../services/apiNinjas.service.js";
import { estimateCaloriesAndProtein } from "../services/openRouter.service.js";

export const registerMeal = async (req, res) => {
  try {
    let { nutritionData, query } = req.body;
    let finalData = nutritionData;

    // 🔹 If nutrition not provided → fetch first
    if (!finalData && query) {
      const data = await fetchNutritionData(query);
      finalData = [];

      for (const item of data) {
        let calories = item.calories;
        let protein = item.protein_g;

        if (
          calories === "Only available for premium subscribers." ||
          protein === "Only available for premium subscribers."
        ) {
          const estimate = await estimateCaloriesAndProtein(item);
          const estimatedItem = Array.isArray(estimate)
            ? estimate[0]
            : estimate;

          calories = estimatedItem?.calories ?? null;
          protein = estimatedItem?.protein_g ?? null;
        }

        finalData.push({
          ...item,
          calories,
          protein_g: protein,
        });
      }
    }

    if (!finalData || finalData.length === 0) {
      return res.status(400).json({ message: "No nutrition data available" });
    }

    // 🔹 Save only required fields
    const savedMeals = [];

    for (const item of finalData) {
      const meal = await Meal.create({
        foodName: item.name,
        calories: item.calories,
        serving: item.serving_size_g,
        protein: item.protein_g,
        carbs: item.carbohydrates_total_g,
        sugar: item.sugar_g,
        cholesterol: item.cholesterol_mg,
      });

      savedMeals.push(meal);
    }

    res.status(201).json({
      message: "Meal registered successfully",
      meals: savedMeals,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register meal" });
  }
};
