import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

// 1. Initialize Azure Client
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT; 

const client = new AzureOpenAI({ 
  endpoint, 
  apiKey, 
  apiVersion, 
  deployment,
});

/**
 * Helper: Cleans LLM output and safely parses JSON
 */
function safeJSONParse(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Empty or invalid LLM response");
  }

  // Remove Markdown code blocks
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Find the JSON object
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
 * 🔹 GENERIC JSON CALLER (Restored & Upgraded to Azure)
 * Used by: generateTodaysPlan (Meal Planning)
 */
export const callOpenRouterJSON = async (prompt, temperature = 0.7) => {
  try {
    const response = await client.chat.completions.create({
      model: deployment,
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: temperature,
      max_tokens: 800, 
    });

    const rawOutput = response.choices[0].message.content;
    return safeJSONParse(rawOutput);

  } catch (error) {
    console.error("Azure Service Error:", error);
    throw new Error("Failed to generate JSON from Azure OpenAI");
  }
};

/**
 * 🔹 ESTIMATE CALORIES
 * Used by: meal.controller.js
 */
export const estimateCaloriesAndProtein = async (food) => {
  const prompt = `
    You are a nutrition expert.
    STRICT RULES:
    - Use standard Indian food nutrition references
    - Estimate ONLY missing (null) values
    - Do NOT change existing valid values
    - Calories must be in kcal
    - Protein must be in grams
    - Return STRICTLY a JSON object. No markdown. No explanations.

    Input JSON:
    ${JSON.stringify(food, null, 2)}
  `;

  // Reuse the generic function we just restored!
  return callOpenRouterJSON(prompt, 0.2);
};