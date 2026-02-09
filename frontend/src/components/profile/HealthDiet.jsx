import React from 'react';
import { HeartPulse } from 'lucide-react';

const HealthDiet = ({ formData, onChange }) => {
  return (
    <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <HeartPulse className="text-rose-500" size={20} />
        <h2 className="text-xl font-bold text-slate-800">Health & Diet</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Health Conditions</label>
          <div className="grid grid-cols-1 gap-3">
            {['thyroid', 'diabetes', 'bp'].map(condition => (
               <label key={condition} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:border-rose-200 transition-colors">
                <input 
                  type="checkbox" 
                  name={condition}
                  checked={formData.healthConditions?.[condition] || false}
                  onChange={onChange}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-slate-700 capitalize">{condition === 'bp' ? 'High BP' : condition}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Diet Type</label>
          <select 
            name="dietType"
            value={formData.dietType}
            onChange={onChange}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 appearance-none"
          >
            <option value="Balanced">Balanced</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="Keto">Keto</option>
            <option value="Paleo">Paleo</option>
            <option value="Low Carb">Low Carb</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default HealthDiet;