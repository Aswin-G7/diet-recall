import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const FoodCard = ({ name, image, category = "General", calories, protein }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the route /food/name (e.g. /food/idli)
    navigate(`/food/${name}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
          <Plus className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      <div className="p-4">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
          {category}
        </span>
        <h4 className="font-bold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">
          {name}
        </h4>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-slate-500">
            {calories ? `${calories} kcal` : 'N/A'}
          </span>
          <span className="text-xs text-slate-400">
            {protein ? `${protein}g Protein` : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;