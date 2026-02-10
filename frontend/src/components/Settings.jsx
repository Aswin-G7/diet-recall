import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Database, 
  ChevronRight, 
  Globe, 
  Trash2, 
  Info,
  Smartphone,
  Scale
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    meals: true,
    water: false,
    summary: true
  });

  const [units, setUnits] = useState('metric');

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Internal Toggle Component
  const Toggle = ({ enabled, onClick }) => (
    <button 
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-emerald-600' : 'bg-slate-200'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8 space-y-8 pb-24">
      <div className="flex items-center gap-4">
        <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
          <SettingsIcon size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800">Settings</h1>
          <p className="text-slate-500 font-medium">Manage your app experience and data</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* General Preferences */}
        <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-2">
            <Smartphone size={18} className="text-emerald-500" />
            <h2 className="font-bold text-slate-800">General Preferences</h2>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Scale size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Measurement Units</p>
                  <p className="text-xs text-slate-400">Choose Metric or Imperial</p>
                </div>
              </div>
              <select 
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lb, ft)</option>
              </select>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Language</p>
                  <p className="text-xs text-slate-400">App display language</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600">
                English (US) <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-2">
            <Bell size={18} className="text-emerald-500" />
            <h2 className="font-bold text-slate-800">Notifications</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { id: 'meals', label: 'Meal Reminders', desc: 'Get notified when it\'s time to eat', key: 'meals' },
              { id: 'water', label: 'Hydration Alerts', desc: 'Stay on top of your water intake', key: 'water' },
              { id: 'summary', label: 'Daily Summary', desc: 'Evening recap of your nutritional goals', key: 'summary' }
            ].map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <Toggle 
                  enabled={notifications[item.key]} 
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Security & Data */}
        <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-2">
            <Shield size={18} className="text-emerald-500" />
            <h2 className="font-bold text-slate-800">Security & Data</h2>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                  <Database size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Export My Data</p>
                  <p className="text-xs text-slate-400">Download history as JSON or CSV</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-500" />
            </div>
            <div 
              onClick={handleClearData}
              className="p-6 flex items-center justify-between group cursor-pointer hover:bg-rose-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                  <Trash2 size={20} />
                </div>
                <div>
                  <p className="font-bold text-rose-600">Clear All Data</p>
                  <p className="text-xs text-rose-400/70">Wipe all logs and profile info</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-rose-200 group-hover:text-rose-500" />
            </div>
          </div>
        </section>

        {/* About */}
        <div className="text-center py-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <Info size={16} />
            NutriTrack v1.2.0
          </div>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-xs font-bold text-emerald-600 hover:underline">Help Center</a>
            <a href="#" className="text-xs font-bold text-emerald-600 hover:underline">Privacy Policy</a>
            <a href="#" className="text-xs font-bold text-emerald-600 hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;