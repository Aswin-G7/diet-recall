import React from 'react';
import { Target } from 'lucide-react';

const GoalsTarget = ({ formData, onChange, onGoalChange }) => {
  return (
    <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-xl shadow-slate-900/20">
      <div className="flex items-center gap-2 mb-4">
        <Target className="text-emerald-400" size={20} />
        <h2 className="text-xl font-bold">Goals & Target</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block ml-1">Daily Calorie Target</label>
          <div className="relative">
            <input 
              type="number" 
              name="dailyCalorieTarget"
              value={formData.dailyCalorieTarget || ''}
              onChange={onChange}
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white text-2xl font-black focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-500">kcal</span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block ml-1">Primary Goal *</label>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {['lose', 'maintain', 'gain'].map(goal => (
              <button
                key={goal}
                type="button"
                onClick={() => onGoalChange(goal)} // Uses the special handler passed from parent
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  formData.goal === goal 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsTarget;