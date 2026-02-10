import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_API_KEY,
  },
});

app.post("/chat", upload.single("image"), async (req, res) => {
  try {
    const { message } = req.body;

    let imageBase64 = null;

    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      imageBase64 = imageBuffer.toString("base64");
    }

const response = await client.chat.completions.create({
  model: process.env.AZURE_OPENAI_DEPLOYMENT,
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: message || "Describe this image" },
        imageBase64 && {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${imageBase64}`,
          },
        },
      ].filter(Boolean),
    },
  ],
  max_tokens: 800,
});

// console.log("FULL RESPONSE:", JSON.stringify(response, null, 2));
const content = response.choices?.[0]?.message?.content;

let finalText = "";

if (typeof content === "string") {
  finalText = content;
} else if (Array.isArray(content)) {
  finalText = content.map(c => c.text || "").join("");
}

console.log("Final text:", finalText);

res.json({
  reply: finalText,
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
