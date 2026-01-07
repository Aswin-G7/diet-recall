import Meal from "../models/Meal.js";
import { fetchNutritionData } from "../services/apiNinjas.service.js";
import { estimateCaloriesAndProtein } from "../services/openRouter.service.js";

export const registerMeal = async (req, res) => {
  try {
    const { nutritionData, query, mealType } = req.body;

    if (!mealType) {
      return res.status(400).json({ message: "mealType is required" });
    }

    let finalData = nutritionData?.map((item) => ({
      name: item.name,
      calories: item.calories ?? 0,
      serving: item.serving_size_g ?? item.serving ?? 0,
      protein: item.protein_g ?? item.protein ?? 0,
      carbs: item.carbohydrates_total_g ?? item.carbs ?? 0,
      sugar: item.sugar_g ?? item.sugar ?? 0,
      cholesterol: item.cholesterol_mg ?? item.cholesterol ?? 0,
    }));

    // 🔹 If nutrition not provided → fetch first
    if ((!finalData || finalData.length === 0) && query) {
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
          name: item.name,
          calories: calories ?? 0,
          serving: item.serving_size_g ?? 0,
          protein: protein ?? 0, // <-- Use 0 if missing
          carbs: item.carbohydrates_total_g ?? 0,
          sugar: item.sugar_g ?? 0,
          cholesterol: item.cholesterol_mg ?? 0,
        });
      }
    }

    if (!finalData || finalData.length === 0) {
      return res.status(400).json({ message: "No nutrition data available" });
    }

    // 🔹 Calculate totals
    const totalCalories = finalData.reduce(
      (sum, f) => sum + (f.calories || 0),
      0
    );

    const totalProtein = finalData.reduce(
      (sum, f) => sum + (f.protein || 0),
      0
    );

    // console.log("Final data to be saved:", finalData);

    // finalData.forEach((f) => {
    //   console.log(f.name, "protein:", f.protein, typeof f.protein);
    // });

    // 🔹 Create ONE meal document
    const meal = await Meal.create({
      mealType,
      rawInput: query,
      foods: finalData,
      totalCalories,
      totalProtein,
    });

    res.status(201).json({
      message: "Meal registered successfully",
      meal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register meal" });
  }
};

export const getTodaySummary = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      createdAt: { $gte: start, $lte: end },
    });

    const summary = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.totalCalories || 0;
        acc.protein += meal.totalProtein || 0;

        meal.foods.forEach((f) => {
          acc.carbs += f.carbs || 0;
          acc.sugar += f.sugar || 0;
        });

        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, sugar: 0 }
    );

    res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};

