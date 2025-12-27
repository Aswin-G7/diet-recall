import fetch from "node-fetch";

export const fetchNutritionData = async (query) => {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
    {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("API Ninjas request failed");
  }

  const data = await response.json();

  return data;
};
