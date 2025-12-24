import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FoodDetails from "./components/FoodDetails";

import "./App.css";
import LogMeal from "./components/log_meals/LogMeal";
import NutriChat from "./components/nutri_chat/NutriChat";
import MyProgress from "./components/progress/MyProgress";
import FoodDiaryPage from "./components/food_diary/FoodDiaryPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Food Details Page */}
          <Route path="/food/:foodName" element={<FoodDetails />} />

          <Route path="/log-meal" element={<LogMeal />} />

          <Route path="/nutri-chat" element={<NutriChat />} />

          <Route path="/progress" element={<MyProgress />} />

          <Route path="/food-diary" element={<FoodDiaryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
