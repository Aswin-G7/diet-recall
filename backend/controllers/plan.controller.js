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

    // 🔹 Required fields check
    if (!age || !goal) {
      return res.status(400).json({
        message: "age and goal are required"
      });
    }

    // 🔹 Today's date key (YYYY-MM-DD)
    const todayKey = new Date().toISOString().split("T")[0];

    // 🔹 1. FAST PATH → return cached plan if exists
    const existingPlan = await DailyPlan.findOne({ date: todayKey }).lean();
    if (existingPlan?.plan) {
      return res.status(200).json(existingPlan.plan);
    }

    // 🔹 2. Fetch last 3 previous plans (exclude today)
    const previousPlans = await DailyPlan.find({
      date: { $ne: todayKey }
    })
      .sort({ date: -1 })
      .limit(3)
      .lean();

    // 🔹 Extract recently used food titles
    const avoidFoodsSet = new Set();

    previousPlans.forEach(p => {
      if (p.plan) {
        Object.values(p.plan).forEach(meal => {
          if (meal?.title) {
            avoidFoodsSet.add(meal.title);
          }
        });
      }
    });

    const avoidFoods = [...avoidFoodsSet];

    // 🔹 3. Calculate today's consumed calories
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const meals = await Meal.find({
      createdAt: { $gte: today }
    }).lean();

    const consumedCalories = meals.reduce(
      (sum, m) => sum + (m.totalCalories || 0),
      0
    );

    const remainingCalories = Math.max(
      dailyCalorieTarget - consumedCalories,
      500
    );

    // 🔹 4. Generate AI plan (with food avoidance)
    const plan = await generateTodaysPlan({
      age,
      height,
      weight,
      goal,
      conditions,
      remainingCalories,
      avoidFoods
    });

    // 🔹 5. ATOMIC UPSERT → one plan per day guaranteed
    const savedPlan = await DailyPlan.findOneAndUpdate(
      { date: todayKey },
      { $setOnInsert: { date: todayKey, plan } },
      { new: true, upsert: true }
    );

    return res.status(200).json(savedPlan.plan);

  } catch (err) {
    console.error("Plan controller error:", err);
    return res.status(500).json({
      message: "Failed to generate plan"
    });
  }
};
