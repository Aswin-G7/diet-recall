import { useEffect, useState } from "react";
import { Sparkles, Clock, Flame } from "lucide-react";

const TodaysPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodaysPlan = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("Please log in to see your plan.");

        // 1. Try to get profile from Local Storage
        let profile = null;
        const savedProfile = localStorage.getItem("userProfile");

        if (savedProfile && savedProfile !== "undefined") {
          profile = JSON.parse(savedProfile);
        } else {
          // 2. FALLBACK: Fetch from MongoDB if Local Storage is empty
          console.log("Local storage empty, fetching profile from DB...");
          const profileRes = await fetch("http://localhost:5000/api/profile", {
            method: "GET",
            headers: {
              "x-user-id": userId, // Sending the userId to find the right profile
            },
          });

          if (!profileRes.ok) {
             throw new Error("Please complete your profile settings first.");
          }
          
          profile = await profileRes.json();
          
          // Save it back to local storage so we don't have to fetch it every time
          localStorage.setItem("userProfile", JSON.stringify(profile));
        }

        // 3. DATA TRANSFORMATION
        let conditionsToSend = [];
        if (profile.healthConditions) {
           conditionsToSend = Object.keys(profile.healthConditions).filter(key => profile.healthConditions[key]);
        } else if (Array.isArray(profile.conditions)) {
           conditionsToSend = profile.conditions;
        }

        const dietTypeToSend = profile.dietType || "Balanced";

        // 4. GENERATE PLAN
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
            conditions: conditionsToSend, 
            dietType: dietTypeToSend, 
          }),
        });

        if (!res.ok) {
           const errData = await res.json().catch(() => ({}));
           throw new Error(errData.message || "Failed to fetch plan");
        }

        const data = await res.json();
        setPlan(data);
      } catch (err) {
        console.error("Plan Fetch Error:", err);
        setError(err.message || "Please save your profile settings first to generate a plan.");
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