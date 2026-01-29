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
      dailyCalorieTarget = 1800,
      dietType
    } = req.body;

    const userId = req.headers["x-user-id"];
    if (!userId) {
      return res.status(401).json({
        message: "User not identified"
      });
    }

    if (!age || !goal) {
      return res.status(400).json({
        message: "age and goal are required"
      });
    }

    const todayKey = new Date().toISOString().split("T")[0];

    // 🔹 1. FAST PATH (user-specific)
    const existingPlan = await DailyPlan.findOne({
      userId,
      date: todayKey
    }).lean();

    if (existingPlan?.plan) {
      return res.status(200).json(existingPlan.plan);
    }

    // 🔹 2. Last 3 plans (same user only)
    const previousPlans = await DailyPlan.find({
      userId,
      date: { $ne: todayKey }
    })
      .sort({ date: -1 })
      .limit(3)
      .lean();

    const avoidFoodsSet = new Set();
    previousPlans.forEach(p => {
      Object.values(p.plan || {}).forEach(meal => {
        if (meal?.title) avoidFoodsSet.add(meal.title);
      });
    });

    const avoidFoods = [...avoidFoodsSet];

    // 🔹 3. Calories consumed today
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

    // 🔹 4. Generate plan
    const plan = await generateTodaysPlan({
      age,
      height,
      weight,
      goal,
      conditions,
      remainingCalories,
      avoidFoods,
      dietType
    });

    // 🔹 5. Atomic upsert (user + date)
    const savedPlan = await DailyPlan.findOneAndUpdate(
      { userId, date: todayKey },
      { $setOnInsert: { userId, date: todayKey, plan } },
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
