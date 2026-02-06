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
        const savedProfile = localStorage.getItem("userProfile");
        if (!savedProfile) throw new Error("Profile not found");
        const profile = JSON.parse(savedProfile);
        const userId = localStorage.getItem("userId");

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
            conditions: profile.conditions || [],
            dailyCalorieTarget: profile.dailyCalorieTarget || 1800,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch plan");
        const data = await res.json();
        setPlan(data);
      } catch (err) {
        console.error(err);
        setError("Please complete your profile to generate a plan.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodaysPlan();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-slate-500 font-bold animate-pulse">Generating your AI plan...</p>
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

      {/* The grid below is the fix! 
          grid-cols-1: Stacked on mobile
          md:grid-cols-4: Four across on desktop
      */}
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
               {plan[mealType].title}
             </h3>

             <div className="flex items-center gap-1 mt-4">
               <Flame size={14} className="text-orange-400" />
               <span className="text-sm font-black text-slate-700">{plan[mealType].calories}</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase">kcal</span>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysPlan;