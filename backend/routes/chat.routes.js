import express from "express";
import { getChatReply } from "../services/chat.service.js";
import { protect } from "../middleware/auth.middleware.js"; // 🚨 Import guard

const router = express.Router();

// 🚨 Add protect middleware
router.post("/", protect, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array required" });
    }

    // Optional: You now have access to req.user if you ever want the Chatbot 
    // to know the user's ID to fetch their specific goals!
    const reply = await getChatReply(messages);

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat service failed" });
  }
});

export default router;