import { generateTodaysPlan } from "../services/mealPlan.service.js";
import Meal from "../models/Meal.js"; // Ensure this path is correct!
import DailyPlan from "../models/DailyPlan.js"; // Ensure this path is correct!

export const getTodaysPlan = async (req, res) => {
  try {
    const {
      age,
      height,
      weight,
      goal,
      conditions = [],
      dailyCalorieTarget = 1800,
      dietType // Make sure this is coming from frontend
    } = req.body;

    const userId = req.headers["x-user-id"];
    
    // --- DEBUG LOGS (Check your VS Code Terminal) ---
    console.log("----- GENERATING PLAN -----");
    console.log("User:", userId);
    console.log("Inputs:", { age, goal, dietType, conditions });
    // ------------------------------------------------

    if (!userId) return res.status(401).json({ message: "User not identified" });
    if (!age || !goal) return res.status(400).json({ message: "Age and goal are required" });

    const todayKey = new Date().toISOString().split("T")[0];

    // 1. Check if plan already exists for today
    const existingPlan = await DailyPlan.findOne({ userId, date: todayKey }).lean();
    if (existingPlan?.plan) {
      console.log("Returning existing plan");
      return res.status(200).json(existingPlan.plan);
    }

    // 2. Get history to avoid repetition
    const previousPlans = await DailyPlan.find({ userId, date: { $ne: todayKey } })
      .sort({ date: -1 })
      .limit(3)
      .lean();

    const avoidFoodsSet = new Set();
    previousPlans.forEach(p => {
      if (p.plan) {
        Object.values(p.plan).forEach(meal => {
          if (meal?.title) avoidFoodsSet.add(meal.title);
        });
      }
    });
    const avoidFoods = [...avoidFoodsSet];

    // 3. Calculate Calories Consumed Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ✅ FIXED: Added userId to query to prevent reading other users' data
    const meals = await Meal.find({ 
      userId, 
      createdAt: { $gte: today } 
    }).lean();

    const consumedCalories = meals.reduce((sum, m) => sum + (m.totalCalories || 0), 0);
    
    // Ensure we don't pass negative numbers to AI
    const remainingCalories = Math.max(dailyCalorieTarget - consumedCalories, 500);

    console.log("Generating AI Plan with remaining calories:", remainingCalories);

    // 4. Generate AI Plan
    // Wrappping this in a specific try/catch to identify if AI Service is the issue
    let plan;
    try {
      plan = await generateTodaysPlan({
        age,
        height,
        weight,
        goal,
        conditions,
        remainingCalories,
        avoidFoods,
        dietType: dietType || "Balanced" // Fallback if missing
      });
    } catch (aiError) {
      console.error("❌ AI SERVICE CRASHED:", aiError);
      throw new Error("AI Service failed to generate plan");
    }

    if (!plan) {
      throw new Error("AI returned empty plan");
    }

    // 5. Save to DB
    const savedPlan = await DailyPlan.findOneAndUpdate(
      { userId, date: todayKey },
      { $setOnInsert: { userId, date: todayKey, plan } },
      { new: true, upsert: true }
    );

    console.log("----- PLAN SAVED SUCCESSFULLY -----");
    return res.status(200).json(savedPlan.plan);

  } catch (err) {
    // This prints the ACTUAL error to your terminal
    console.error("🔥 CONTROLLER CRASH:", err);
    return res.status(500).json({ 
      message: "Failed to generate plan", 
      error: err.message 
    });
  }
};