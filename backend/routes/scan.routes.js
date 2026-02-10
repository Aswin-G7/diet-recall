import express from "express";
import { scanFood } from "../controllers/scan.controller.js";

const router = express.Router();

// POST /api/scan
router.post("/", scanFood);

export default router;