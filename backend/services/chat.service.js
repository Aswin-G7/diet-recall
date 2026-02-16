import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

// 1. Initialize Azure Client
// We reuse the same environment variables as your scan controller
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

export const getChatReply = async (messages) => {
  try {
    // 2. Call Azure OpenAI
    const response = await client.chat.completions.create({
      model: deployment, // Uses your Azure deployment name
      messages: [
        {
          role: "system",
          content: `
            You are Nutri Chat, a friendly nutrition assistant.
            Rules:
            - Give clear, practical nutrition advice
            - Use Indian food examples when possible
            - No medical diagnosis
            - Keep answers short, encouraging, and friendly
          `
        },
        ...messages // Append the conversation history sent from frontend
      ],
      temperature: 0.7, // Slightly creative but focused
      max_tokens: 800,  // Limit response length
    });

    // 3. Return just the text content
    return response.choices[0].message.content;

  } catch (error) {
    console.error("Azure OpenAI Chat Error:", error);
    throw new Error("Failed to fetch chat reply from Azure OpenAI");
  }
};