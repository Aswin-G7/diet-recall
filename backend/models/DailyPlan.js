// models/DailyPlan.js
import mongoose from "mongoose";

const dailyPlanSchema = new mongoose.Schema(
  {
    date: {
      type: String, // YYYY-MM-DD
      required: true,
      unique: true
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

export default mongoose.model("DailyPlan", dailyPlanSchema);
