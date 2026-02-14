import React, { useState, useEffect, useMemo } from 'react';
import { User, Save, CheckCircle2, Loader2 } from 'lucide-react';
import { useApp } from '../../AppContext';

// Import Sub-Components
import PersonalDetails from './PersonalDetails';
import HealthDiet from './HealthDiet';
import GoalsTarget from './GoalsTarget';

const ProfilePage = () => {
  const { userProfile, updateProfile } = useApp();
  
  const [formData, setFormData] = useState(userProfile);
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(userProfile);
  }, [formData, userProfile]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        healthConditions: { ...(prev.healthConditions || {}), [name]: checked }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleGoalChange = (goal) => {
    setFormData(prev => ({ ...prev, goal }));
  };

  // --- API LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDirty) return;

    setError("");
    setIsSaving(true);

    if (!formData.age || !formData.goal) {
      setError("Age and Goal are required.");
      setIsSaving(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to save your profile.");
      setIsSaving(false);
      return;
    }

    const activeConditions = Object.keys(formData.healthConditions || {})
      .filter(key => formData.healthConditions[key]);

    const backendPayload = {
      ...formData,
      conditions: activeConditions,
      // We removed the random userId generation. The backend middleware 
      // securely grabs the ID from the token anyway!
    };

    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(backendPayload),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      const savedProfile = await res.json();
      
      // Update local storage so TodaysPlan.jsx doesn't have to fetch it again
      localStorage.setItem("userProfile", JSON.stringify(savedProfile));
      
      // Update global context
      updateProfile({ ...formData, ...savedProfile });
      
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Server error.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8 space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
          <User size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800">My Profile</h1>
          <p className="text-slate-500 font-medium">Personalize your NutriTrack experience</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 font-bold">
                {error}
            </div>
        )}

        {/* --- SECTIONS --- */}
        <PersonalDetails formData={formData} onChange={handleChange} />
        <HealthDiet formData={formData} onChange={handleChange} />
        <GoalsTarget formData={formData} onChange={handleChange} onGoalChange={handleGoalChange} />

        {/* --- SAVE BUTTON --- */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button 
            type="submit"
            disabled={!isDirty || isSaving}
            className={`flex items-center gap-2 px-10 py-5 rounded-[1.5rem] font-black text-lg shadow-xl transition-all active:scale-95 ${
              !isDirty || isSaving
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1'
            }`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
            {isSaving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

      {showFeedback && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="text-emerald-400" />
          <span className="font-bold">Profile successfully saved!</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;