import { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import { Sparkles, Clock, Flame } from "lucide-react";

const TodaysPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodaysPlan = async () => {
      try {
        // 1. Get raw data from Local Storage
        const savedProfile = localStorage.getItem("userProfile"); // Make sure this matches your AppContext key
        if (!savedProfile) throw new Error("Profile not found");
        
        const profile = JSON.parse(savedProfile);
        const userId = localStorage.getItem("userId");

        // 2. DATA TRANSFORMATION (The Fix) -------------------------
        
        // Convert "healthConditions" (Object) -> "conditions" (Array)
        let conditionsToSend = [];
        if (profile.healthConditions) {
           // New UI format
           conditionsToSend = Object.keys(profile.healthConditions)
             .filter(key => profile.healthConditions[key]);
        } else if (Array.isArray(profile.conditions)) {
           // Old UI format fallback
           conditionsToSend = profile.conditions;
        }

        // Ensure dietType exists
        const dietTypeToSend = profile.dietType || "Balanced";
        // -----------------------------------------------------------

        const res = await fetch("http://localhost:5000/api/plan/today", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId
          },
          body: JSON.stringify({
            age: profile.age,
            height: profile.height || undefined,
            weight: profile.weight || undefined,
            goal: profile.goal,
            dailyCalorieTarget: profile.dailyCalorieTarget || 1800,
            
            // Fixed: Send the transformed array
            conditions: conditionsToSend, 
            
            // Fixed: Added dietType (Critical for AI)
            dietType: dietTypeToSend, 
          }),
        });

        if (!res.ok) {
           // Try to get the error message from the server if possible
           const errData = await res.json().catch(() => ({}));
           throw new Error(errData.message || "Failed to fetch plan");
        }

        const data = await res.json();
        setPlan(data);
      } catch (err) {
        console.error("Plan Fetch Error:", err);
        setError("Please save your profile settings first to generate a plan.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodaysPlan();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Sparkles className="text-emerald-500 animate-spin" size={32} />
        <p className="text-slate-500 font-bold animate-pulse">Generating your AI nutrition plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl text-rose-600 text-center font-bold">
        {error}
      </div>
    );
  }

  // Handle case where plan is null but no error (rare edge case)
  if (!plan) return null;

  return (
    <section className="w-full max-w-5xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-200">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Today's Plan</h2>
          <p className="text-slate-500 text-sm font-medium">AI-generated nutrition roadmap</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2">
        {['breakfast', 'lunch', 'snack', 'dinner'].map((mealType) => (
          <div key={mealType} className="bg-white/60 backdrop-blur-md border border-white p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {mealType}
                </span>
                <Clock size={14} className="text-slate-300" />
              </div>
              
              <h3 className="font-bold text-slate-800 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">
               {/* Added Optional Chaining just in case data is partial */}
               {plan[mealType]?.title || "Not planned"}
              </h3>

              <div className="flex items-center gap-1 mt-4">
                <Flame size={14} className="text-orange-400" />
                <span className="text-sm font-black text-slate-700">{plan[mealType]?.calories || 0}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">kcal</span>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysPlan;