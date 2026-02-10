import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Azure Client
// Note: We use the 'openai' package which supports Azure endpoints natively now
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT; // e.g., "gpt-4.1"

const client = new AzureOpenAI({ 
  endpoint, 
  apiKey, 
  apiVersion, 
  deployment,
  timeout: 60 * 1000 * 2 // ✅ Set timeout to 2 minutes (120,000 ms)
});

export const scanFood = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }

    console.log("Processing image scan...");

    // 1. Construct the prompt for the Nutritionist AI
    const systemPrompt = `
      You are an expert nutritionist and food analyst. 
      Analyze the provided food image and identify the food item.
      Estimate the portion size visible in the image.
      Calculate the approximate nutritional values for that portion.
      
      Return STRICTLY a JSON object with no markdown formatting (no \`\`\`json).
      Use this exact schema:
      {
        "foodName": "String (e.g. Grilled Salmon Salad)",
        "calories": Number,
        "protein": Number (grams),
        "carbs": Number (grams),
        "fat": Number (grams),
        "fiber": Number (grams),
        "sugar": Number (grams),
        "portionSize": "String (e.g. 1 bowl, approx 200g)",
        "confidence": Number (between 0 and 1)
      }
    `;

    // 2. Call Azure OpenAI (GPT-4 Vision)
    const result = await client.chat.completions.create({
      model: deployment, // Uses your env variable
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: [
            { type: "text", text: "Analyze this meal." },
            { 
              type: "image_url", 
              image_url: { 
                url: image, // Allows "data:image/jpeg;base64,..." format directly
                detail: "high" 
              } 
            }
          ] 
        }
      ],
      max_tokens: 500,
      temperature: 0.2, // Low temperature for factual data
    });

    // 3. Parse the response
    const aiResponseText = result.choices[0].message.content;
    
    // Cleanup: Sometimes AI adds markdown backticks despite instructions
    const cleanJson = aiResponseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const foodData = JSON.parse(cleanJson);

    console.log("Scan successful:", foodData.foodName);
    return res.status(200).json(foodData);

  } catch (error) {
    console.error("AI Scan Error:", error);
    return res.status(500).json({ 
      message: "Failed to analyze image", 
      error: error.message 
    });
  }
};