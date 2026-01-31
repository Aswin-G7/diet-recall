import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Utensils, Calendar, MessageCircle } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/progress', label: 'Progress', icon: Activity },
    { to: '/diary', label: 'Diary', icon: Calendar },
    { to: '/chat', label: 'Coach', icon: MessageCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            NutriTrack
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full md:hidden">
            <Utensils className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
