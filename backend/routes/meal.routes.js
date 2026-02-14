import express from "express";
import { registerMeal, getTodaySummary, getWeeklyCalories, getDiaryMeals } from "../controllers/meal.controller.js";
import { protect } from "../middleware/auth.middleware.js"; // 🚨 IMPORT THE GUARD

const router = express.Router();

// 🚨 ADD 'protect' TO EVERY ROUTE
router.post("/register", protect, registerMeal);
router.get("/summary/today", protect, getTodaySummary);
router.get("/weekly-calories", protect, getWeeklyCalories);
router.get("/diary", protect, getDiaryMeals);

export default router;