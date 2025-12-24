import React from "react";
import "./MyProgress.css";
import ProgressSummary from "./ProgressSummary";
import MealsLogged from "./MealsLogged";
import WeeklyProgress from "./WeeklyProgress";

const MyProgress = () => {
  return (
    <div className="progress-page">
      <h1 className="progress-title">My Progress</h1>

      <ProgressSummary />
      <MealsLogged />
      <WeeklyProgress />
    </div>
  );
};

export default MyProgress;
