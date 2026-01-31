import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/layout/SidebarLayout";

import HomePage from "./components/HomePage";
import FoodDetails from "./components/FoodDetails";
import LogMeal from "./components/log_meals/LogMeal";
import NutriChat from "./components/nutri_chat/NutriChat";
import MyProgress from "./components/progress/MyProgress";
import FoodDiaryPage from "./components/food_diary/FoodDiaryPage";
import ProfilePage from "./components/sidebar/profile/ProfilePage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
      <div className="min-h-screen flex flex-col">

        <Routes>
          <Route element={<SidebarLayout />}>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Food Details Page */}
            <Route path="/food/:foodName" element={<FoodDetails />} />

            <Route path="/log-meal" element={<LogMeal />} />

            <Route path="/nutri-chat" element={<NutriChat />} />

            <Route path="/progress" element={<MyProgress />} />

            <Route path="/food-diary" element={<FoodDiaryPage />} />

            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
