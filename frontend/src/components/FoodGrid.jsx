import React from "react";
import FoodCard from "./FoodCard";

// Keep your existing image imports exactly as they were
import idli from "../assets/foods/idli.jpg";
import dosa from "../assets/foods/dosa.jpg";
import chapati from "../assets/foods/chapati.jpg";
import rice from "../assets/foods/rice.jpg";
import egg from "../assets/foods/egg.jpg";
import chicken from "../assets/foods/chicken.jpg";
import milk from "../assets/foods/milk.jpg";
import banana from "../assets/foods/banana.jpg";
import apple from "../assets/foods/apple.jpg";
import oats from "../assets/foods/oats.jpg";
import paneer from "../assets/foods/paneer.jpg";
import curd from "../assets/foods/curd.jpg";

const FoodGrid = () => {
  // Enhanced data locally to support the new UI look
  // IDs and Names remain untouched for backend safety
  const foods = [
    { id: 1, name: "Idli", image: idli, category: "Breakfast", calories: 35, protein: 2 },
    { id: 2, name: "Dosa", image: dosa, category: "Breakfast", calories: 133, protein: 3 },
    { id: 3, name: "Chapati", image: chapati, category: "Grains", calories: 71, protein: 3 },
    { id: 4, name: "Rice", image: rice, category: "Grains", calories: 130, protein: 2 },
    { id: 5, name: "Egg", image: egg, category: "Proteins", calories: 78, protein: 6 },
    { id: 6, name: "Chicken", image: chicken, category: "Proteins", calories: 239, protein: 27 },
    { id: 7, name: "Milk", image: milk, category: "Dairy", calories: 42, protein: 3 },
    { id: 8, name: "Banana", image: banana, category: "Fruits", calories: 89, protein: 1 },
    { id: 9, name: "Apple", image: apple, category: "Fruits", calories: 52, protein: 0 },
    { id: 10, name: "Oats", image: oats, category: "Breakfast", calories: 389, protein: 16 },
    { id: 11, name: "Paneer", image: paneer, category: "Dairy", calories: 265, protein: 18 },
    { id: 12, name: "Curd", image: curd, category: "Dairy", calories: 98, protein: 11 },
  ];

  return (
    <section className="pb-12 mt-12 mx-4">
      {/* Header - Removed buttons as requested */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Recommended Foods</h2>
      </div>

      {/* New Responsive Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            name={food.name}
            image={food.image}
            category={food.category} // New prop for UI
            calories={food.calories} // New prop for UI
            protein={food.protein}   // New prop for UI
          />
        ))}
      </div>
    </section>
  );
};

export default FoodGrid;