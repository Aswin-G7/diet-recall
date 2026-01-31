import React from "react";
import ActionCard from "./ActionCard";
import { LineChart, MessageSquare, PlusCircle, BookOpen } from "lucide-react";

const QuickActions = () => {
  return (
    <section className="mb-12 mt-12 mx-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ActionCard
          to="/progress"
          label="Progress"
          icon={LineChart}
          color="bg-blue-500"
          description="View your weight and nutritional trends."
        />
        <ActionCard
          to="/nutri-chat"
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
          to="/food-diary"
          label="Food Diary"
          icon={BookOpen}
          color="bg-rose-500"
          description="Review your meal history."
        />
      </div>
    </section>
  );
};

export default QuickActions;
