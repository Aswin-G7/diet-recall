import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden mx-8 mt-4">
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
              <p className="text-xs font-semibold uppercase opacity-70 mb-1">Water Intake</p>
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
  );
};

export default HeroSection;
