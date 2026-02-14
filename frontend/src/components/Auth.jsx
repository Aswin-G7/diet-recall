import React, { useState } from 'react';
import { Activity, ArrowRight, ShieldCheck, Sparkles, Heart, Mail, Lock, User, Loader2 } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError(""); // Optional: Add an error state [error, setError] to show UI errors

    try {
      // Choose the right endpoint based on if we are logging in or signing up
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // 1. Save the REAL credentials to the browser
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token); // The JWT token

      // 2. 🚨 THE FIX: Wipe any old profile data left behind! 🚨
      localStorage.removeItem("userProfile"); 

      // 3. Tell App.jsx we successfully logged in
      onLogin(data)

    } catch (err) {
      console.error(err);
      alert(err.message); // Replace with a nice UI error toast later!
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-50 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-md w-full relative z-10 text-center space-y-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-200 animate-bounce">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-2">
              Nutri<span className="text-emerald-600">Track</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Elevate Your Health Journey</p>
          </div>
        </div>

        {/* Value Props (Hidden on very small screens to save space) */}
        <div className="hidden sm:grid grid-cols-3 gap-4">
          {[
            { icon: Sparkles, label: 'AI Powered', color: 'text-amber-500' },
            { icon: ShieldCheck, label: 'Secure', color: 'text-blue-500' },
            { icon: Heart, label: 'Health First', color: 'text-rose-500' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
              <span className="text-[10px] font-black uppercase text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main Auth Form */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-black text-slate-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isLogin ? 'Log in to continue tracking your goals.' : 'Sign up to start your nutrition journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Name Field (Only for Sign Up) */}
            {!isLogin && (
              <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    required={!isLogin}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-medium"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300 placeholder:font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 transition-all flex items-center justify-center gap-3 group mt-2"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '' }); // clear form on switch
              }}
              className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>

        {/* Social Proof Placeholder */}
        <div className="pt-4">
          <p className="text-[10px] font-bold text-slate-400 mb-3 tracking-widest">TRUSTED BY 10,000+ USERS</p>
          <div className="flex justify-center -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                alt="User"
              />
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 text-emerald-600 flex items-center justify-center text-[8px] font-black">
              +9k
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;