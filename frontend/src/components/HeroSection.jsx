import React, { useEffect, useState } from 'react';
import { useApp } from '../AppContext'; // Access the profile for the Goal
import { Loader2 } from 'lucide-react';

const HeroSection = () => {
  const { userProfile } = useApp();
  const [consumed, setConsumed] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Today's Consumption from the Backend
  useEffect(() => {
    const fetchTodaySummary = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/meals/summary/today", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setConsumed(Math.round(data.calories || 0));
        }
      } catch (err) {
        console.error("Failed to fetch hero stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodaySummary();
  }, []);

  // 2. Calculate Stats
  const dailyGoal = userProfile?.dailyCalorieTarget || 2000; // Default to 2000 if not set
  const caloriesLeft = Math.max(0, dailyGoal - consumed);
  const percentage = Math.min(100, Math.round((consumed / dailyGoal) * 100));

  // 3. Dynamic Message based on progress
  const getMotivationalMessage = () => {
    if (percentage >= 100) return "You've hit your daily goal! Great job!";
    if (percentage >= 75) return "Almost there! Keep pushing to the finish line.";
    if (percentage >= 50) return "Halfway there! Keep up the good work.";
    return "Start your day strong! Track your first meal.";
  };

  if (loading) {
    return (
      <section className="bg-emerald-600 rounded-[2.5rem] p-12 text-white mx-8 mt-4 flex justify-center items-center min-h-[300px]">
        <Loader2 size={40} className="animate-spin text-emerald-200" />
      </section>
    );
  }

  return (
    <section className="bg-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden mx-8 mt-4 transition-all duration-500 ease-in-out hover:shadow-xl hover:shadow-emerald-500/20">
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Keep tracking your <br /> health goals today.
          </h1>
          <p className="text-emerald-50 text-lg mb-8 max-w-md opacity-90">
             {getMotivationalMessage()}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
              <p className="text-xs font-semibold uppercase opacity-70 mb-1">Calories Left</p>
              <p className="text-2xl font-bold">{caloriesLeft} kcal</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
              <p className="text-xs font-semibold uppercase opacity-70 mb-1">Total Consumed</p>
              <p className="text-2xl font-bold">{consumed} kcal</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
              <p className="text-xs font-semibold uppercase opacity-70 mb-1">Daily Goal</p>
              <p className="text-2xl font-bold">{dailyGoal} kcal</p>
            </div>
          </div>
        </div>

        {/* Circular Progress Visual */}
        <div className="hidden md:flex justify-end">
          {/* Outer Pulse Ring */}
          <div className="w-64 h-64 bg-emerald-400/30 rounded-full flex items-center justify-center relative">
            
            {/* Dynamic Svg Ring for Percentage */}
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="8" 
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="white" 
                strokeWidth="8"
                strokeDasharray="283" // 2 * PI * 45
                strokeDashoffset={283 - (283 * percentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Content */}
            <div className="w-48 h-48 bg-emerald-500 rounded-full flex items-center justify-center shadow-inner">
              <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl animate-in zoom-in duration-500">
                <span className="text-emerald-600 text-3xl font-black">{percentage}%</span>
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />
    </section>
  );
};

export default HeroSection;