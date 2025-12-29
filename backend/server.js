import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nutritionRoutes from "./routes/nutrition.routes.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/nutrition", nutritionRoutes);

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
