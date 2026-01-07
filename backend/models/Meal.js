import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  serving: Number,
  protein: Number,
  carbs: Number,
  sugar: Number,
  cholesterol: Number,
});

const mealSchema = new mongoose.Schema(
  {
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "snack", "dinner"],
      required: true,
    },

    rawInput: {
      type: String,
      required: true, // 👈 THIS is causing your error
    },

    foods: {
      type: [foodItemSchema],
      required: true,
    },

    totalCalories: Number,
    totalProtein: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Meal", mealSchema);
