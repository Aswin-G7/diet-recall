import express from "express";
import { getTodaysPlan } from "../controllers/plan.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/today", protect, getTodaysPlan);

export default router;
