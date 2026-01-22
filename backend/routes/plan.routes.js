import express from "express";
import { getTodaysPlan } from "../controllers/plan.controller.js";

const router = express.Router();

router.post("/today", getTodaysPlan);

export default router;
