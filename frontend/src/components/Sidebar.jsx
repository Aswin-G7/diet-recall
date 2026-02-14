import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Activity, Calendar, MessageCircle, 
  PlusCircle, Settings, BookMarked, HelpCircle, LogOut, X,
  User 
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/progress', label: 'Progress', icon: Activity },
    { to: '/diary', label: 'Food Diary', icon: Calendar },
    { to: '/chat', label: 'AI Coach', icon: MessageCircle },
    { to: '/recipes', label: 'Recipes', icon: BookMarked },
    { to: '/profile', label: 'My Profile', icon: User },
  ];

  // --- ADDED LOGOUT HANDLER ---
  const handleLogout = () => {
    // 1. Remove the user's ID and token from local storage
    localStorage.removeItem("userId");
    localStorage.removeItem("token"); 
    localStorage.removeItem("userProfile");
    
    // Optional: You can also clear the profile if you want a fresh start
    // localStorage.removeItem("userProfile"); 

    // 2. Reload the page. This forces App.jsx to check for the user again, 
    // realize they are gone, and show the Login screen.
    window.location.href = "/"; 
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-100 w-64 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto no-scrollbar overscroll-contain ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between sticky top-0 bg-white z-10">
          <Link to="/" className="flex items-center gap-2 group" onClick={onClose}>
            <div className="bg-emerald-500 p-2 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              NutriTrack
            </span>
          </Link>
          
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 py-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose} // Auto-close on click
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-4">
          <Link 
            to="/log-meal" 
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all"
          >
            <PlusCircle size={20} />
            Log Meal
          </Link>

          <div className="pt-4 border-t border-slate-100 space-y-1">
            <Link
              to="/settings"
              onClick={onClose}
              className='flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-all'
              >
              <Settings size={20} className="text-slate-400" />
              Settings
            </Link>
              
            {/* --- ATTACHED THE onClick EVENT HERE --- */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all"
            >
              <LogOut size={20} className="text-rose-400" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;