import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    calories: Number,
    serving: Number,
    protein: Number,
    carbs: Number,
    sugar: Number,
    cholesterol: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Meal", mealSchema);
