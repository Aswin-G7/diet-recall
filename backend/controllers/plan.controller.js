import { generateTodaysPlan } from "../services/mealPlan.service.js";
import Meal from "../models/Meal.js";

export const getTodaysPlan = async (req, res) => {
  try {
    const {
      age,
      height,
      weight,
      goal,
      conditions = [],
      dailyCalorieTarget = 1800 // fallback
    } = req.body;

    // Required fields
    if (!age || !goal) {
      return res.status(400).json({
        message: "age and goal are required"
      });
    }

    // 🔹 Calculate today's consumed calories
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const meals = await Meal.find({
      createdAt: { $gte: today }
    });

    const consumedCalories = meals.reduce(
      (sum, m) => sum + (m.totalCalories || 0),
      0
    );

    const remainingCalories = Math.max(
      dailyCalorieTarget - consumedCalories,
      500
    );

    // 🔹 Generate AI plan
    const plan = await generateTodaysPlan({
      age,
      height,            // optional
      weight,            // optional
      goal,
      conditions,
      remainingCalories
    });

    res.status(200).json(plan);
  } catch (err) {
    console.error("Plan controller error:", err);
    res.status(500).json({
      message: "Failed to generate plan"
    });
  }
};
