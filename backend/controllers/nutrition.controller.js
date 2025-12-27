import { fetchNutritionData } from "../services/apiNinjas.service.js";
import { estimateCaloriesAndProtein } from "../services/openRouter.service.js";

export const getNutritionFromText = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ message: "Query is required" });
    }

    const data = await fetchNutritionData(query); // API Ninjas
    const finalData = [];

    for (const item of data) {
      let calories = item.calories;
      let protein = item.protein_g;

      // If premium data is missing, use OpenRouter to estimate
      if (
        calories === "Only available for premium subscribers." ||
        protein === "Only available for premium subscribers."
      ) {
        try {
          const estimate = await estimateCaloriesAndProtein(item);

          // Handle array or object
          const estimatedItem = Array.isArray(estimate)
            ? estimate[0]
            : estimate;

          calories = estimatedItem?.calories ?? null;
          protein = estimatedItem?.protein_g ?? null;
        } catch (err) {
          console.error("OpenRouter estimation failed for:", item.name);
          calories = null;
          protein = null;
        }
      }

      finalData.push({
        ...item,
        calories,
        protein_g: protein,
      });
    }

    res.status(200).json(finalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch nutrition data" });
  }
};
