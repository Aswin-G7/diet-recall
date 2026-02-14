import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";

// Components
import Sidebar from "./components/Sidebar"; 
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import HomePage from "./components/HomePage";
import FoodDetails from "./components/FoodDetails";
import LogMeal from "./components/log_meals/LogMeal";
import NutriChat from "./components/nutri_chat/NutriChat";
import MyProgress from "./components/progress/MyProgress";
import FoodDiaryPage from "./components/food_diary/FoodDiaryPage";
import ProfilePage from "./components/profile/ProfilePage";
import FoodScanner from "./components/FoodScanner";

import "./App.css"; // Ensures your .app CSS is loaded
import Settings from "./components/Settings";
import Auth from "./components/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // The Auth component calls this function after the fake 1.5s loading finishes
  const handleLogin = (userData) => {
    console.log("User logged in!", userData);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (

    <AppProvider>

      <BrowserRouter>
        {/* FIXED: Restored 'app' class so your CSS gradient works.
          Added 'relative' so the Sidebar can position itself correctly within this context.
        */}
        <div className="app relative">

          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
          
          {/* Content Wrapper */}
          <div className="w-full">
            
            {/* Header 
              - Added backdrop-blur-md so the gradient shows through slightly but text remains readable.
            */}
            <div className="sticky top-0 z-30 bg-white/60 backdrop-blur-md border-b border-white/20">
              <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            </div>

            <main className="pb-24 lg:pb-8 px-4 pt-0 lg:px-8 lg:pt-3 max-w-7xl mx-auto">
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/food/:foodName" element={<FoodDetails />} />
                  <Route path="/log-meal" element={<LogMeal />} />
                  <Route path="/nutri-chat" element={<NutriChat />} />
                  <Route path="/progress" element={<MyProgress />} />
                  <Route path="/food-diary" element={<FoodDiaryPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/scan" element={<FoodScanner />} />
                  <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>

          </div>

          <BottomNav />
          
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;