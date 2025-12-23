import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FoodDetails from "./components/FoodDetails";

import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* <Sidebar /> */}
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Food Details Page */}
          <Route path="/food/:foodName" element={<FoodDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
