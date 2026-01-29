import express from "express";
import {
  upsertProfile,
  getProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/", upsertProfile);
router.get("/", getProfile);

export default router;
