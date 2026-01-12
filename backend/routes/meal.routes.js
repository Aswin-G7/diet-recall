import express from "express";
import { registerMeal, getTodaySummary, getWeeklyCalories, getDiaryMeals } from "../controllers/meal.controller.js";

const router = express.Router();

router.post("/register", registerMeal);
router.get("/summary/today", getTodaySummary);
router.get("/weekly-calories", getWeeklyCalories);
router.get("/diary", getDiaryMeals);


export default router;
