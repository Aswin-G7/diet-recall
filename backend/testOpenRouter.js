import axios from "axios";
import dotenv from "dotenv";
import foodInput from "./data/foodInput.js";

dotenv.config();

/**
 * Cleans LLM output and guarantees valid JSON parsing
 */
function safeJSONParse(text) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

async function test() {
  const prompt = `
You are a nutrition expert.

STRICT RULES:
- Use standard Indian food nutrition references
- Estimate ONLY missing (null) values
- Do NOT change existing values
- Calories must be in kcal
- Protein must be in grams
- Return ONLY raw JSON
- No markdown
- No explanations

Input JSON:
${JSON.stringify(foodInput, null, 2)}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3-27b-it:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const rawOutput = response.data.choices[0].message.content;

    const parsedJSON = safeJSONParse(rawOutput);

    console.log("✅ Nutrition Output:");
    console.log(parsedJSON);

  } catch (err) {
    console.error("❌ OpenRouter error:", err.response?.data || err.message);
  }
}

test();
