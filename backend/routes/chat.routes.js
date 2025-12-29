import express from "express";
import { getChatReply } from "../services/chat.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array required" });
    }

    const reply = await getChatReply(messages);

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat service failed" });
  }
});

export default router;
