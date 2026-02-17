import { getChatReply } from "../services/chat.service.js";

export const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;
    const userId = req.user; // 🚨 Get the User ID from the token

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array required" });
    }

    // Pass userId to the service
    const reply = await getChatReply(messages, userId);

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat service failed" });
  }
};