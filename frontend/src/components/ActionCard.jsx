import React from 'react';
import { Link } from 'react-router-dom';

const ActionCard = ({ to, label, icon: Icon, color, description }) => {
  return (
    <Link
      to={to}
      className="group flex flex-col p-6 bg-white rounded-3xl border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 active:scale-[0.98]"
    >
      <div
        className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{label}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </Link>
  );
};

export default ActionCard;
