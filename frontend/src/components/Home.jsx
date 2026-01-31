import React from 'react';
import ActionCard from '../components/ActionCard';
import MealCard from '../components/MealCard';
import FoodCard from '../components/FoodCard';
import { TODAY_MEALS, FOOD_DATABASE } from '../constants';
import { LineChart, MessageSquare, PlusCircle, BookOpen, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-8 space-y-12">
      {/* Hero / Quick Stats Section */}
      <section className="bg-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Keep tracking your <br /> health goals today.
            </h1>
            <p className="text-emerald-50 text-lg mb-8 max-w-md opacity-90">
              You've completed 75% of your daily intake. Keep it up and reach your target by dinner!
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
                <p className="text-xs font-semibold uppercase opacity-70 mb-1">Calories Left</p>
                <p className="text-2xl font-bold">420 kcal</p>
              </div>
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
                <p className="text-xs font-semibold uppercase opacity-70 mb-1">Water Intkae</p>
                <p className="text-2xl font-bold">1.2 / 2.5 L</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
             <div className="w-64 h-64 bg-emerald-400/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-48 h-48 bg-emerald-400/50 rounded-full flex items-center justify-center">
                   <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-emerald-600 text-3xl font-black">75%</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard 
            to="/progress" 
            label="Progress" 
            icon={LineChart} 
            color="bg-blue-500" 
            description="View your weight and nutritional trends."
          />
          <ActionCard 
            to="/chat" 
            label="Chat Coach" 
            icon={MessageSquare} 
            color="bg-purple-500" 
            description="Talk to your AI nutrition assistant."
          />
          <ActionCard 
            to="/log-meal" 
            label="Log Meal" 
            icon={PlusCircle} 
            color="bg-amber-500" 
            description="Quickly add a new meal to your day."
          />
          <ActionCard 
            to="/diary" 
            label="Food Diary" 
            icon={BookOpen} 
            color="bg-rose-500" 
            description="Review your meal history."
          />
        </div>
      </section>

      {/* Today's Plan */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Today's Plan</h2>
            <p className="text-slate-500 text-sm mt-1">Wednesday, October 25</p>
          </div>
          <button className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
            See Weekly Plan <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TODAY_MEALS.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </section>

      {/* Food Selection Section */}
      <section className="pb-12">
         <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Recommended Foods</h2>
          <div className="flex gap-2">
            {['All', 'Proteins', 'Fruits', 'Vegetables'].map(cat => (
              <button key={cat} className="px-4 py-1.5 text-xs font-semibold rounded-full border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FOOD_DATABASE.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
