import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, PlusCircle, Calendar, MessageCircle } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/progress', label: 'Stats', icon: Activity },
    { to: '/log-meal', label: 'Log', icon: PlusCircle, special: true },
    { to: '/food-diary', label: 'Diary', icon: Calendar }, // Fixed route
    { to: '/nutri-chat', label: 'Coach', icon: MessageCircle }, // Fixed route
  ];

  return (
    // lg:hidden ensures this ONLY shows on mobile/tablet, hiding on large desktops
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-2 py-3 pb-safe">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          if (item.special) {
            return (
              <Link 
                key={item.to}
                to={item.to}
                className="relative -top-8 flex flex-col items-center group"
              >
                <div className="bg-emerald-600 p-4 rounded-full shadow-xl shadow-emerald-200 text-white ring-4 ring-slate-50 group-hover:scale-105 transition-transform">
                  <Icon size={28} />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tighter">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon size={24} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;