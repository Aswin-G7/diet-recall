import React from "react";
import DiaryDateHeader from "./DiaryDateHeader";
import DiaryMeals from "./DiaryMeals";
import DiarySummary from "./DiarySummary";

import "./FoodDiaryPage.css";

const FoodDiaryPage = () => {
  return (
    <div className="food-diary-page">
      <h1 className="food-diary-title">Food Diary</h1>

      <DiaryDateHeader />
      <DiaryMeals />
      <DiarySummary />
    </div>
  );
};

export default FoodDiaryPage;
