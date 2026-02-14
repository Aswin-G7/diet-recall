import { useState, useMemo } from "react";
import { 
  Sparkles, 
  Loader2, 
  Send, 
  Target, 
  Droplets, 
  Info, 
  Candy, 
  CheckCircle2, 
  XCircle,
  Utensils,
  ChevronDown
} from 'lucide-react';

const MealSection = ({ title, placeholder, mealType }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState([]); 
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [success, setSuccess] = useState("");

  // ---------------- HELPER: Calculate Totals ----------------
  const totals = useMemo(() => {
    if (!nutritionData || nutritionData.length === 0) return null;

    return nutritionData.reduce((acc, item) => ({
      calories: acc.calories + (item.calories || 0),
      protein: acc.protein + (item.protein_g || 0),
      carbs: acc.carbs + (item.carbohydrates_total_g || 0),
      fat: acc.fat + (item.fat_total_g || 0),
      sugar: acc.sugar + (item.sugar_g || 0),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0 });
  }, [nutritionData]);

  // ---------------- API: FETCH NUTRITION ----------------
  const fetchNutrition = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setNutritionData([]);
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // 🚨 GET TOKEN

      const response = await fetch("http://localhost:5000/api/nutrition", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 🚨 SEND TOKEN
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Could not find food data.");

      const data = await response.json();
      
      if (!data || data.length === 0) {
         throw new Error("No nutritional data found.");
      }
      
      setNutritionData(data);

    } catch (err) {
      setError(err.message || "Failed to fetch nutrition.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- API: REGISTER MEAL ----------------
  const registerMeal = async () => {
    setRegistering(true);
    setError("");

    try {
      const token = localStorage.getItem("token"); 
      
      const saveResponse = await fetch(
        "http://localhost:5000/api/meals/register",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({
            mealType,
            query,
            nutritionData, 
          }),
        }
      );

      if (!saveResponse.ok) throw new Error("Failed to save meal.");

      setSuccess("Meal Logged Successfully!");
      
      setTimeout(() => {
        setQuery("");
        setNutritionData([]);
        setSuccess("");
      }, 2000);

    } catch (err) {
      setError(err.message || "Something went wrong saving the meal.");
    } finally {
      setRegistering(false);
    }
  };

  const handleDiscard = () => {
    setNutritionData([]);
    setQuery("");
    setError("");
    setSuccess("");
  };

  // ---------------- UI RENDER ----------------
  return (
    <div className="bg-white p-6 rounded-[2rem] border-2 border-emerald-50 shadow-sm space-y-4 hover:border-emerald-200 transition-colors group">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600">
           <div className="p-2 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform">
             <Utensils size={18} />
           </div>
           <span className="text-lg font-black text-slate-700 capitalize">{title}</span>
        </div>
        {success && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full animate-in fade-in">
            Saved!
          </span>
        )}
      </div>

      {/* Input Section (Hidden when showing results) */}
      {!totals && !success && (
        <div className="relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchNutrition()}
            placeholder={placeholder}
            disabled={loading}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-4 pr-12 text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400"
          />
          <button 
            onClick={fetchNutrition}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-xl disabled:opacity-50 disabled:bg-slate-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-600/20"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-50 p-3 rounded-xl">
          <XCircle size={16} />
          {error}
        </div>
      )}

      {/* RESULTS AREA */}
      {totals && !success && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
          
          {/* 1. INDIVIDUAL ITEMS LIST */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Breakdown</p>
            {nutritionData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <p className="font-bold text-slate-700 capitalize text-sm">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">
                     {item.serving_size_g}g serving
                  </p>
                </div>
                <div className="text-right flex items-center gap-4">
                   <div className="hidden sm:flex gap-2 text-[10px] font-bold text-slate-400 uppercase">
                      <span className="text-blue-400">{Math.round(item.protein_g)}p</span>
                      <span className="text-emerald-400">{Math.round(item.carbohydrates_total_g)}c</span>
                      <span className="text-rose-400">{Math.round(item.fat_total_g)}f</span>
                   </div>
                   <div>
                     <span className="font-black text-slate-700 block">{Math.round(item.calories)}</span>
                     <span className="text-[9px] font-bold text-slate-400 uppercase">kcal</span>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. TOTAL SUMMARY CARD (Magic Log Style) */}
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white space-y-6 shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
              <div>
                <h3 className="text-xl font-black capitalize">Total Meal</h3>
                <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={10} /> {nutritionData.length} Items
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-emerald-400">
                  {Math.round(totals.calories)}
                </span>
                <span className="text-xs font-bold text-slate-500 block uppercase">kcal</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 relative z-10">
               <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center">
                  <Target size={14} className="text-blue-400 mx-auto mb-1" />
                  <div className="text-sm font-black">{Math.round(totals.protein)}g</div>
                  <div className="text-[8px] text-slate-500 font-bold uppercase">Prot</div>
               </div>
               <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center">
                  <Droplets size={14} className="text-emerald-400 mx-auto mb-1" />
                  <div className="text-sm font-black">{Math.round(totals.carbs)}g</div>
                  <div className="text-[8px] text-slate-500 font-bold uppercase">Carbs</div>
               </div>
               <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center">
                  <Info size={14} className="text-rose-400 mx-auto mb-1" />
                  <div className="text-sm font-black">{Math.round(totals.fat)}g</div>
                  <div className="text-[8px] text-slate-500 font-bold uppercase">Fat</div>
               </div>
               <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center">
                  <Candy size={14} className="text-amber-400 mx-auto mb-1" />
                  <div className="text-sm font-black text-amber-300">{Math.round(totals.sugar)}g</div>
                  <div className="text-[8px] text-slate-500 font-bold uppercase">Sugar</div>
               </div>
            </div>

            <div className="flex gap-3 pt-2 relative z-10">
              <button 
                onClick={handleDiscard}
                className="flex-1 py-3 bg-white/10 text-white text-sm rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                Discard
              </button>
              <button 
                onClick={registerMeal}
                disabled={registering}
                className="flex-[2] py-3 bg-emerald-600 text-white text-sm rounded-xl font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
              >
                {registering ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                Confirm Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSection;