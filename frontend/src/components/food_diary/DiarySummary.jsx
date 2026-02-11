import React, { useMemo } from 'react';
import { Utensils } from 'lucide-react';

const DiarySummary = ({ selectedDate, filteredMeals, loading }) => {
  
  // useMemo automatically recalculates totals ONLY when filteredMeals changes.
  // It is much faster and cleaner than using useEffect for calculations.
  const totals = useMemo(() => {
    let calcCals = 0, calcPro = 0, calcCarbs = 0, calcSugar = 0, calcChol = 0;
    
    if (filteredMeals && filteredMeals.length > 0) {
      filteredMeals.forEach(meal => {
        meal.foods.forEach(food => {
          calcCals += food.calories || 0;
          calcPro += food.protein || 0;
          calcCarbs += food.carbs || 0;
          calcSugar += food.sugar || 0;
          calcChol += food.cholesterol || 0;
        });
      });
    }

    return {
      calories: Math.round(calcCals),
      protein: Math.round(calcPro),
      carbs: Math.round(calcCarbs),
      sugar: Math.round(calcSugar),
      cholesterol: Math.round(calcChol)
    };
  }, [filteredMeals]);

  if (loading) return null; // Wait for data to load before showing the summary card

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 mt-6 shadow-2xl relative overflow-hidden">
      
      {/* Left Side: Calories & Date */}
      <div className="relative z-10 text-center md:text-left">
        <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Daily Summary</h2>
        <div className="flex items-baseline justify-center md:justify-start gap-2">
          <span className="text-5xl font-black">{totals.calories}</span>
          <span className="text-emerald-500 font-bold">kcal</span>
        </div>
        <p className="text-slate-400 text-sm mt-2 font-medium">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Right Side: Macros Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center w-full md:w-auto">
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="text-xl font-black text-blue-400">{totals.protein}g</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Protein</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="text-xl font-black text-emerald-400">{totals.carbs}g</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Carbs</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="text-xl font-black text-amber-400">{totals.sugar}g</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Sugar</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="text-xl font-black text-rose-400">{totals.cholesterol}mg</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Cholest</div>
        </div>
      </div>

      {/* Background Graphic Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Utensils size={180} className="rotate-12 text-white" />
      </div>
    </div>
  );
};

export default DiarySummary;