import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * Cleans LLM output and safely parses JSON
 */
function safeJSONParse(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Empty or invalid LLM response");
  }

  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("No JSON object found in LLM response");
  }

  try {
    return JSON.parse(match[0]);
  } catch (err) {
    console.error("JSON parse failed. Raw content:\n", cleaned);
    throw err;
  }
}

/**
 * 🔹 GENERIC OpenRouter JSON caller (REUSABLE)
 */
export const callOpenRouterJSON = async (prompt, temperature = 0.3) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "z-ai/glm-4.5-air:free",
        messages: [{ role: "user", content: prompt }],
        temperature
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

    const rawOutput = response?.data?.choices?.[0]?.message?.content;
    return safeJSONParse(rawOutput);

  } catch (error) {
    console.error(
      "OpenRouter service error:",
      error.response?.data || error.message
    );
    throw new Error("OpenRouter request failed");
  }
};

/**
 * 🔹 EXISTING FUNCTION (UNCHANGED, but now cleaner)
 */
export const estimateCaloriesAndProtein = async (food) => {
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
${JSON.stringify(food, null, 2)}
`;

  return callOpenRouterJSON(prompt, 0.2);
};
