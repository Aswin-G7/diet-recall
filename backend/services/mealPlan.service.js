import { callOpenRouterJSON } from "./openRouter.service.js";

export const generateTodaysPlan = async ({
  age,
  height,
  weight,
  goal,
  conditions,
  remainingCalories,
  avoidFoods = []
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

Health rules:
- If diabetes is present → avoid sugar & refined carbs
- Balance protein, fiber, and carbs
- Use common Indian foods only

${
  avoidFoods.length
    ? `
Variety rule:
- Avoid repeating these food items from recent days if possible:
${avoidFoods.map(f => `- ${f}`).join("\n")}
- Choose nutritionally equivalent alternatives instead
`
    : ""
}

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

