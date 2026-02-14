import UserProfile from "../models/UserProfile.js";

// 🔹 Create / Update profile
export const upsertProfile = async (req, res) => {
  try {
    // 🚨 THE FIX: Grab the securely verified ID from the middleware!
    const userId = req.user; 
    
    if (!userId) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const {
      name,
      age,
      height,
      weight,
      goal,
      dietType,
      conditions = [],
      dailyCalorieTarget
    } = req.body;

    if (!age || !goal) {
      return res.status(400).json({
        message: "age and goal are required"
      });
    }

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        userId,
        name,
        age,
        height,
        weight,
        goal,
        dietType,
        conditions,
        dailyCalorieTarget
      },
      { new: true, upsert: true }
    );

    return res.status(200).json(profile);
  } catch (err) {
    console.error("Profile save error:", err);
    return res.status(500).json({
      message: "Failed to save profile"
    });
  }
};

// 🔹 Fetch profile
export const getProfile = async (req, res) => {
  try {
    // 🚨 THE FIX: Grab the securely verified ID from the middleware!
    const userId = req.user; 
    
    if (!userId) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const profile = await UserProfile.findOne({ userId }).lean();

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    return res.status(200).json(profile);
  } catch (err) {
    console.error("Profile fetch error:", err);
    return res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
};