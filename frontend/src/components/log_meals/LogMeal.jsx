import { Link } from 'react-router-dom';
import { Sparkles, Camera } from 'lucide-react';
import MealSection from "./MealSection";
// You can remove import "./LogMeal.css" if you are no longer using it for other things!

const LogMeal = () => {
  return (
    // 1. Replaced 'log-meal-page' with a proper Tailwind container
    // Added pb-24 so the BottomNav doesn't cover the Dinner section
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8 space-y-8 pb-24">
      
      {/* 2. Replaced 'log-meal-title' with Tailwind typography */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-800">Log Your Meals</h1>
        <p className="text-slate-500 font-medium">Track your daily nutrition and hit your goals.</p>
      </div>

      {/* --- AI Scan CTA Component --- */}
      <Link to="/scan" className="group block relative bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-[2.5rem] text-white overflow-hidden shadow-xl shadow-emerald-500/20 hover:scale-[1.01] transition-transform active:scale-[0.99]">
        <div className="relative z-10 flex items-center justify-between">
           <div className="space-y-2">
             <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} /> AI Powered
             </div>
             <h2 className="text-2xl font-black">Scan Food with AI</h2>
             <p className="text-emerald-50/80 text-sm max-w-xs">Instantly calculate nutrients by taking a picture of your meal.</p>
           </div>
           <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:bg-white/30 transition-colors">
              <Camera size={32} />
           </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-white/20 transition-all" />
      </Link>
      {/* ------------------------------------ */}

      {/* 3. Added a subtle backdrop to group the meal sections nicely */}
      <div className="space-y-6 relative">
        {/* Optional: Subtle connecting line behind the cards to make it look like a timeline */}
        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-100 -z-10 hidden md:block"></div>

        <MealSection
          title="Breakfast"
          mealType="breakfast"
          placeholder="e.g. 2 idli with sambar"
        />

        <MealSection
          title="Lunch"
          mealType="lunch"
          placeholder="e.g. rice, dal and chicken curry"
        />

        <MealSection
          title="Evening Snack"
          mealType="snack"
          placeholder="e.g. tea and biscuits"
        />

        <MealSection
          title="Dinner"
          mealType="dinner"
          placeholder="e.g. roti and paneer curry"
        />
      </div>
    </div>
  );
};

export default LogMeal;