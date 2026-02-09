import React from 'react';
import { UserCircle } from 'lucide-react';

const PersonalDetails = ({ formData, onChange }) => {
  return (
    <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <UserCircle className="text-emerald-500" size={20} />
        <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name || ''}
            onChange={onChange}
            placeholder="Enter your name"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Age *</label>
          <input 
            type="number" 
            name="age"
            value={formData.age || ''}
            onChange={onChange}
            required
            placeholder="Years"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Weight (kg)</label>
          <input 
            type="number" 
            name="weight"
            value={formData.weight || ''}
            onChange={onChange}
            placeholder="e.g. 75"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Height (cm)</label>
          <input 
            type="number" 
            name="height"
            value={formData.height || ''}
            onChange={onChange}
            placeholder="e.g. 180"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
          />
        </div>
      </div>
    </section>
  );
};

export default PersonalDetails;