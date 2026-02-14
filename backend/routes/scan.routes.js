import express from "express";
import { scanFood } from "../controllers/scan.controller.js";
import { protect } from "../middleware/auth.middleware.js"; // 🚨 Import guard

const router = express.Router();

// 🚨 Add protect middleware
router.post("/", protect, scanFood);

export default router;