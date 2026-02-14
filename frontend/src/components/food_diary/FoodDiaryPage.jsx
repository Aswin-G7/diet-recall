import React, { useState, useEffect } from "react";
import DiaryDateHeader from "./DiaryDateHeader";
import DiaryMeals from "./DiaryMeals";
import DiarySummary from "./DiarySummary";
import "./FoodDiaryPage.css";

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const FoodDiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryMeals = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // 🚨 1. Grab the token

        const res = await fetch("http://localhost:5000/api/meals/diary", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // 🚨 2. Send the token!
          }
        });

        // 🚨 3. Prevent crashing if the backend returns an error
        if (!res.ok) {
          throw new Error("Failed to authenticate or fetch meals");
        }

        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Failed to load diary meals", err);
        setMeals([]); // 🚨 4. Fallback to an empty array so .filter() doesn't crash
      } finally {
        setLoading(false);
      }
    };
    fetchDiaryMeals();
  }, []);

  // 🚨 5. Final safety check: ensure meals is actually an array before filtering
  const filteredMeals = Array.isArray(meals) 
    ? meals
        .filter((meal) => isSameDay(new Date(meal.createdAt), selectedDate))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="food-diary-page max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8 pb-24">
      <DiaryDateHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <DiaryMeals filteredMeals={filteredMeals} loading={loading} />
      
      <DiarySummary selectedDate={selectedDate} filteredMeals={filteredMeals} loading={loading} />
    </div>
  );
};

export default FoodDiaryPage;