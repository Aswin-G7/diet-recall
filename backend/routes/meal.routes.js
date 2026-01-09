import express from "express";
import { registerMeal, getTodaySummary, getWeeklyCalories } from "../controllers/meal.controller.js";

const router = express.Router();

router.post("/register", registerMeal);
router.get("/summary/today", getTodaySummary);
router.get("/weekly-calories", getWeeklyCalories);


export default router;
