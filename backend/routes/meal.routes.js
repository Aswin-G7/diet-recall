import express from "express";
import { registerMeal, getTodaySummary } from "../controllers/meal.controller.js";

const router = express.Router();

router.post("/register", registerMeal);
router.get("/summary/today", getTodaySummary);

export default router;
