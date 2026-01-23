import { generateTodaysPlan } from "../services/mealPlan.service.js";
import Meal from "../models/Meal.js";
import DailyPlan from "../models/DailyPlan.js";

export const getTodaysPlan = async (req, res) => {
  try {
    const {
      age,
      height,
      weight,
      goal,
      conditions = [],
      dailyCalorieTarget = 1800
    } = req.body;

    if (!age || !goal) {
      return res.status(400).json({
        message: "age and goal are required"
      });
    }

    // 🔹 Today's date key (YYYY-MM-DD)
    const todayKey = new Date().toISOString().split("T")[0];

    // 🔹 1. Check if plan already exists (fast path)
    const existingPlan = await DailyPlan.findOne({ date: todayKey });
    if (existingPlan) {
      return res.status(200).json(existingPlan.plan);
    }

    // 🔹 2. Calculate today's consumed calories
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

    // 🔹 3. Generate AI plan
    const plan = await generateTodaysPlan({
      age,
      height,
      weight,
      goal,
      conditions,
      remainingCalories
    });

    // 🔹 4. ATOMIC UPSERT (prevents duplicate key error)
    const savedPlan = await DailyPlan.findOneAndUpdate(
      { date: todayKey },
      { $setOnInsert: { date: todayKey, plan } },
      { new: true, upsert: true }
    );

    res.status(200).json(savedPlan.plan);

  } catch (err) {
    console.error("Plan controller error:", err);
    res.status(500).json({
      message: "Failed to generate plan"
    });
  }
};
