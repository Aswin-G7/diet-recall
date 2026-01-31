import React from "react";
import FoodCard from "./FoodCard";

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
  const foods = [
    { id: 1, name: "Idli", image: idli },
    { id: 2, name: "Dosa", image: dosa },
    { id: 3, name: "Chapati", image: chapati },
    { id: 4, name: "Rice", image: rice },
    { id: 5, name: "Egg", image: egg },
    { id: 6, name: "Chicken", image: chicken },
    { id: 7, name: "Milk", image: milk },
    { id: 8, name: "Banana", image: banana },
    { id: 9, name: "Apple", image: apple },
    { id: 10, name: "Oats", image: oats },
    { id: 11, name: "Paneer", image: paneer },
    { id: 12, name: "Curd", image: curd },
  ];

  const categories = ["All", "Proteins", "Fruits", "Vegetables"];

  return (
    <section className="mt-12 mx-4 mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Recommended Foods
        </h2>

        {/* <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 text-xs font-semibold rounded-full border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div> */}
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            name={food.name}
            image={food.image}
          />
        ))}
      </div>
    </section>
  );
};

export default FoodGrid;
