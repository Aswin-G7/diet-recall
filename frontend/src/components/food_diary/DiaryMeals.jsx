import React, { useEffect, useState } from "react";
import { Clock, Trash2, Utensils, Zap } from "lucide-react";

const MEAL_TYPES = ["breakfast", "lunch", "snack", "dinner"];

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const DiaryMeals = ({ selectedDate }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryMeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/meals/diary");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Failed to load diary meals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiaryMeals();
  }, []);

  // Filter meals for the selected date
  const filteredMeals = meals
    .filter((meal) => isSameDay(new Date(meal.createdAt), selectedDate))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        <p className="text-slate-500 font-medium italic">Loading your food diary...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {filteredMeals.length > 0 ? (
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200" />

          <div className="space-y-10">
            {filteredMeals.map((meal, idx) => (
              <div key={meal._id} className="relative pl-12 group">
                {/* Timeline Dot/Number */}
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-bold shadow-sm group-hover:border-emerald-500 group-hover:text-emerald-500 transition-all z-10">
                  {filteredMeals.length - idx}
                </div>

                {/* Logged Time */}
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  <Clock size={12} className="text-emerald-500" />
                  {new Date(meal.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Main Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                        <Utensils className="text-emerald-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-800 text-xl capitalize">
                          {meal.mealType}
                        </h3>
                        <p className="text-slate-400 text-sm font-medium italic">
                          "{meal.rawInput}"
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1 bg-emerald-50 px-4 py-2 rounded-2xl">
                      <span className="text-2xl font-black text-emerald-600">
                        {Math.round(meal.totalCalories)}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">kcal</span>
                    </div>
                  </div>

                  {/* Nutrition Table (Styled for Tailwind) */}
                  <div className="overflow-hidden border border-slate-100 rounded-2xl mb-6">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Food Item</th>
                          <th className="px-4 py-3 text-right">Cals</th>
                          <th className="px-4 py-3 text-right">P</th>
                          <th className="px-4 py-3 text-right">C</th>
                          <th className="px-4 py-3 text-right">F</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {meal.foods.map((food) => (
                          <tr key={food._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-semibold text-slate-700">{food.name}</td>
                            <td className="px-4 py-3 text-right text-slate-600">{Math.round(food.calories)}</td>
                            <td className="px-4 py-3 text-right text-slate-500">{food.protein?.toFixed(1)}g</td>
                            <td className="px-4 py-3 text-right text-slate-500">{food.carbs?.toFixed(1)}g</td>
                            <td className="px-4 py-3 text-right text-slate-500">{food.fat?.toFixed(1)}g</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Remove Button */}
                  <button 
                    className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all font-bold text-xs"
                    onClick={() => console.log("Delete meal:", meal._id)}
                  >
                    <Trash2 size={14} /> Remove Entry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-inner">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap size={40} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Your diary is empty</h3>
          <p className="text-slate-400 max-w-xs mx-auto">
            No records found for this date. Time to log some delicious fuel!
          </p>
        </div>
      )}
    </div>
  );
};

export default DiaryMeals;