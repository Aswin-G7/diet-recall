import React from 'react';
import { Utensils } from 'lucide-react';

const DiarySummary = ({ totalCalories = 0, protein = 0, carbs = 0, fat = 0, selectedDate = new Date() }) => {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 mt-6 shadow-2xl relative overflow-hidden">
      
      {/* Left Side: Calories & Date */}
      <div className="relative z-10">
        <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Daily Summary</h2>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black">{totalCalories}</span>
          <span className="text-emerald-500 font-bold">kcal</span>
        </div>
        <p className="text-slate-400 text-sm mt-2">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Right Side: Macros Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-lg font-bold">{protein}g</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase">Protein</div>
        </div>
        <div>
          <div className="text-lg font-bold">{carbs}g</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase">Carbs</div>
        </div>
        <div>
          <div className="text-lg font-bold">{fat}g</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase">Fat</div>
        </div>
      </div>

      {/* Background Graphic Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Utensils size={140} className="rotate-12 text-white" />
      </div>
    </div>
  );
};

export default DiarySummary;