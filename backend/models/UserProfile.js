import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      // future: ref: "User"
    },

    name: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    height: Number, // cm
    weight: Number, // kg

    goal: {
      type: String,
      required: true,
      enum: ["lose", "maintain", "gain"]
    },

    dietType: {
      type: String,
      enum: ["Balanced", "Vegan", "Vegetarian", "non-veg", "Keto", "Paleo", "Low Carb", "veg"],
      default: "Balanced",
    },

    conditions: {
      type: [String],
      default: [],
    },

    dailyCalorieTarget: {
      type: Number,
      default: 1800,
    },
  },
  { timestamps: true },
);

// One profile per user guaranteed
userProfileSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model("UserProfile", userProfileSchema);
