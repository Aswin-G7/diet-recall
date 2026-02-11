import React, { useState, useEffect } from "react";
import DiaryDateHeader from "./DiaryDateHeader";
import DiaryMeals from "./DiaryMeals";
import DiarySummary from "./DiarySummary";
import "./FoodDiaryPage.css";

// Helper function moved to the top
const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const FoodDiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // 1. ADD STATE FOR MEALS
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. FETCH ALL MEALS ONCE
  useEffect(() => {
    const fetchDiaryMeals = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/meals/diary");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Failed to load diary meals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiaryMeals();
  }, []);

  // 3. FILTER MEALS FOR THE SELECTED DATE
  const filteredMeals = meals
    .filter((meal) => isSameDay(new Date(meal.createdAt), selectedDate))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="food-diary-page max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8 pb-24">
      <DiaryDateHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* 4. PASS DATA DOWN AS PROPS */}
      <DiaryMeals filteredMeals={filteredMeals} loading={loading} />
      
      <DiarySummary selectedDate={selectedDate} filteredMeals={filteredMeals} loading={loading} />
    </div>
  );
};

export default FoodDiaryPage;