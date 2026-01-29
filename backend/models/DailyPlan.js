// models/DailyPlan.js
import mongoose from "mongoose";

const dailyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
      // future: ref: "User"
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true
    },

    plan: {
      breakfast: Object,
      lunch: Object,
      snack: Object,
      dinner: Object
    }
  },
  { timestamps: true }
);

// 🔒 One plan per user per day
dailyPlanSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyPlan", dailyPlanSchema);
