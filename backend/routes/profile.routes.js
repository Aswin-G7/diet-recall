import express from "express";
import {
  upsertProfile,
  getProfile
} from "../controllers/profile.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getProfile); 
router.post("/", protect, upsertProfile)

export default router;
