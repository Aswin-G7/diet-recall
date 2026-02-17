import { AzureOpenAI } from "openai";
import dotenv from "dotenv";
import Meal from "../models/Meal.js"; // 🚨 Import your Model

dotenv.config();

const client = new AzureOpenAI({ 
  endpoint: process.env.AZURE_OPENAI_ENDPOINT, 
  apiKey: process.env.AZURE_OPENAI_API_KEY, 
  apiVersion: process.env.AZURE_OPENAI_API_VERSION, 
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT, 
});

// --- 1. DEFINE THE TOOL ---
const tools = [
  {
    type: "function",
    function: {
      name: "log_meal",
      description: "Logs a meal into the user's food diary. Use this when the user explicitly mentions eating food.",
      parameters: {
        type: "object",
        properties: {
          mealType: {
            type: "string",
            enum: ["breakfast", "lunch", "snack", "dinner"],
            description: "The time of day the meal was eaten."
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string", description: "Name of the food item" },
                quantity: { type: "string", description: "Quantity (e.g., 1 cup, 2 pcs)" },
                // We ask the AI to estimate these values for us!
                calories: { type: "number", description: "Estimated calories" },
                protein: { type: "number", description: "Estimated protein (g)" },
                carbs: { type: "number", description: "Estimated carbs (g)" },
                fat: { type: "number", description: "Estimated fat (g)" },
                sugar: { type: "number", description: "Estimated sugar (g)" },
              },
              required: ["name", "calories", "protein", "carbs", "fat", "sugar"]
            }
          }
        },
        required: ["mealType", "items"]
      }
    }
  }
];

// --- 2. HELPER: SAVE TO MONGODB ---
// --- 2. HELPER: SAVE TO MONGODB ---
async function logMealToDB(args, userId) {
  try {
    console.log("🛠️ Tool Executing: Logging Meal...", args);
    
    // Calculate totals directly from AI's estimation
    const totalCalories = args.items.reduce((sum, item) => sum + (item.calories || 0), 0);
    const totalProtein = args.items.reduce((sum, item) => sum + (item.protein || 0), 0);

    // Map AI data to your Mongoose Schema
    const formattedFoods = args.items.map(item => {
      // 🚨 FIX: Extract the number from the quantity string (e.g. "3 pcs" -> 3)
      // If no number is found, default to 1.
      const quantityMatch = item.quantity ? item.quantity.match(/(\d+(\.\d+)?)/) : null;
      const servingSize = quantityMatch ? parseFloat(quantityMatch[0]) : 1;

      return {
        name: item.name,
        serving: servingSize, // ✅ Now saves '3' instead of '1'
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        sugar: item.sugar || 0,
        cholesterol: 0 
      };
    });

    await Meal.create({
      userId: userId,
      mealType: args.mealType,
      rawInput: "Logged via AI Chat", // You could also join item names here like `args.items.map(i => i.name).join(", ")`
      foods: formattedFoods,
      totalCalories,
      totalProtein
    });

    return "Successfully saved to database.";
  } catch (error) {
    console.error("DB Save Error:", error);
    return "Failed to save meal to database.";
  }
}

// --- 3. MAIN CHAT FUNCTION ---
export const getChatReply = async (messages, userId) => {
  try {
    // A. First Call: Send User Message + Tools Definition
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
      messages: [
        {
          role: "system",
          content: `
            You are Nutri Chat, an intelligent nutrition assistant.
            
            YOUR GOAL:
            Help the user track their food, but NEVER log data without explicit confirmation.

            PROTOCOL:
            1. If the user mentions food (e.g., "I ate 3 idlis"):
               - Do NOT call the 'log_meal' tool yet.
               - First, estimate the calories and macros.
               - Reply to the user: "I've estimated 3 Idlis at approx 120 kcal (5g protein). Should I log this to your diary?"
            
            2. If the user confirms (e.g., "Yes", "Sure", "Log it"):
               - NOW call the 'log_meal' tool with the details from the PREVIOUS turn.
            
            3. If the user corrects you (e.g., "No, it was 4 idlis"):
               - Adjust your estimate and ask for confirmation again.

            General Rules:
            - Keep answers short and friendly.
            - Today is ${new Date().toLocaleDateString()}.
          `
        },
        ...messages // Now this contains the history!
      ],
      tools: tools,
      tool_choice: "auto", 
      temperature: 0.7,
    });

    const responseMessage = response.choices[0].message;

    // B. Check if AI wants to use a tool
    if (responseMessage.tool_calls) {
      const toolCall = responseMessage.tool_calls[0];
      
      // 1. Execute logic if it matches our function name
      if (toolCall.function.name === "log_meal") {
        const args = JSON.parse(toolCall.function.arguments);
        
        // 2. Run the actual DB Save
        const functionResult = await logMealToDB(args, userId);

        // 3. Send the result BACK to the AI so it can confirm to the user
        const secondResponse = await client.chat.completions.create({
          model: process.env.AZURE_OPENAI_DEPLOYMENT,
          messages: [
            ...messages,
            responseMessage, // Append the AI's intent
            {
              role: "tool",
              tool_call_id: toolCall.id,
              content: functionResult, // "Successfully saved..."
            },
          ],
        });

        return secondResponse.choices[0].message.content;
      }
    }

    // C. Normal Chat (No tool called)
    return responseMessage.content;

  } catch (error) {
    console.error("Azure Chat Error:", error);
    throw new Error("Chat service failed");
  }
};