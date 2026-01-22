import { callOpenRouterJSON } from "./openRouter.service.js";

export const generateTodaysPlan = async ({
  age,
  height,
  weight,
  goal,
  conditions,
  remainingCalories
}) => {

  const prompt = `
You are a nutrition expert designing meal plans for a mobile app UI.

User details:
- Age: ${age}
- Height: ${height ?? "not provided"}
- Weight: ${weight ?? "not provided"}
- Goal: ${goal}
- Medical conditions: ${conditions?.join(", ") || "none"}
- Remaining calories for today: ${remainingCalories}

IMPORTANT RULES (STRICT):
- Meal titles MUST be short and simple
- Titles must contain ONLY food names
- ❌ NO serving sizes
- ❌ NO quantities
- ❌ NO brackets
- ❌ NO measurements
- ❌ NO extra explanations
- Examples of GOOD titles:
  - "Oats and Banana"
  - "Rice, Dal and Vegetables"
  - "Bread and Tea"
- Examples of BAD titles:
  - "Oats Upma (1.5 cups)"
  - "Vegetable Curry – 200g"
  - "Chapati (2 pieces)"

Health rules:
- If diabetes is present → avoid sugar & refined carbs
- Balance protein, fiber, and carbs
- Use common Indian foods only

Return ONLY valid JSON in this exact format:

{
  "breakfast": { "title": "", "calories": number },
  "lunch": { "title": "", "calories": number },
  "snack": { "title": "", "calories": number },
  "dinner": { "title": "", "calories": number }
}

NO markdown.
NO explanations.
ONLY JSON.
`;

  return await callOpenRouterJSON(prompt);
};
