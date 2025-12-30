import express from "express";
import { registerMeal } from "../controllers/meal.controller.js";

const router = express.Router();

router.post("/register", registerMeal);

export default router;
