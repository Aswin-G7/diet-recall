import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import foodData from "../data/foodData";
import { ArrowLeft, Plus, Zap, Target, Droplets, Info } from "lucide-react";

const FoodDetails = () => {
  const { foodName } = useParams();
  const navigate = useNavigate();

  const food = foodData[foodName?.toLowerCase()];

  if (!food) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Food not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold"
        >
          Back Home
        </button>
      </div>
    );
  }

  const macroStats = [
    {
      label: "Calories",
      value: food.calories,
      unit: "kcal",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Protein",
      value: food.protein,
      unit: "g",
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Carbs",
      value: food.carbs,
      unit: "g",
      icon: Droplets,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Fat",
      value: food.fat,
      unit: "g",
      icon: Info,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="space-y-6">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/10 aspect-[4/3]">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            {food.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                {food.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              {food.name}
            </h1>
            {food.description && (
              <p className="text-lg text-slate-500 leading-relaxed">
                {food.description}
              </p>
            )}
          </div>

          {/* Macro stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {macroStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`${stat.bg} p-4 rounded-2xl border border-white flex flex-col items-center text-center shadow-sm`}
                >
                  <div className={`${stat.color} mb-2`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-800">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {stat.unit} {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Serving info */}
          <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Serving Size</span>
              <span className="text-slate-900 font-bold">100g</span>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Add to Meal</span>
              <select className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-sm font-semibold outline-none focus:border-emerald-500">
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Snack</option>
                <option>Dinner</option>
              </select>
            </div>
          </div>

          {/* Action button */}
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Plus className="w-6 h-6" />
            Add to My Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
