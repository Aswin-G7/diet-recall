import express from "express";
import { getNutritionFromText } from "../controllers/nutrition.controller.js";
import { protect } from "../middleware/auth.middleware.js"; // 🚨 Import guard

const router = express.Router();

// 🚨 Add protect middleware
router.post("/", protect, getNutritionFromText);

export default router;