import React, { useState } from "react";
import DiaryDateHeader from "./DiaryDateHeader";
import DiaryMeals from "./DiaryMeals";
import DiarySummary from "./DiarySummary";
import "./FoodDiaryPage.css";

const FoodDiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="food-diary-page">
      <h1 className="food-diary-title">Food Diary</h1>

      <DiaryDateHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <DiaryMeals selectedDate={selectedDate} />
      <DiarySummary selectedDate={selectedDate} />
    </div>
  );
};

export default FoodDiaryPage;
