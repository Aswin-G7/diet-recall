import { Link } from 'react-router-dom';
import { Sparkles, Camera } from 'lucide-react';
import "./LogMeal.css";
import MealSection from "./MealSection";

const LogMeal = () => {
  return (
    <div className="log-meal-page space-y-8">
      
      <div className="flex items-center justify-between">
        <h1 className="log-meal-title">Log Your Meals</h1>
      </div>

      {/* --- ADDED: AI Scan CTA Component --- */}
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

      <div className="space-y-6">
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