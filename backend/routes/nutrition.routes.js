import express from "express";
import { getNutritionFromText } from "../controllers/nutrition.controller.js";

const router = express.Router();

router.post("/", getNutritionFromText);

export default router;
