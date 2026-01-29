import UserProfile from "../models/UserProfile.js";

// TEMP user resolver (replace with auth later)
const getUserId = (req) => {
  return req.headers["x-user-id"]; // frontend will send this for now
};

// 🔹 Create / Update profile
export const upsertProfile = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "User not identified" });
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
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "User not identified" });
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
