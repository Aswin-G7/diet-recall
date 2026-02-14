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
    // 🚨 1. ADDED USER ID (Crucial for multi-user security)
    userId: {
      type: String, // String handles both UUIDs and MongoDB ObjectIds
      required: true,
      index: true, // Makes searching for a user's diary incredibly fast
    },

    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "snack", "dinner"],
      required: true,
    },

    rawInput: {
      type: String,
      // 🚨 2. FIXED: Changed to false so your app doesn't crash 
      // if you log a food without typing a specific search query
      required: false, 
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