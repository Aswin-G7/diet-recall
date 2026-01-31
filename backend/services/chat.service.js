import axios from "axios";

export const getChatReply = async (messages) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "z-ai/glm-4.5-air:free",
      messages: [
        {
          role: "system",
          content: `
You are Nutri Chat, a friendly nutrition assistant.
Rules:
- Give clear, practical nutrition advice
- Use Indian food examples when possible
- No medical diagnosis
- Keep answers short and friendly
          `
        },
        ...messages
      ],
      temperature: 0.6
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "Diet Recall App"
      }
    }
  );

  return response.data.choices[0].message.content;
};
