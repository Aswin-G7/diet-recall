import React from "react";
import { useNavigate } from "react-router-dom";
import insertIcon from "../assets/icons/icons8-insert-30.png"

import "./QuickActions.css";
import ChatButton from "./quick_actions/ChatButton";
import ProgressButton from "./quick_actions/ProgressButton";
import LogMealButton from "./quick_actions/LogMealButton";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <section className="quick-actions-container">
      <h2 className="quick-actions-title">Quick Actions</h2>

      <div className="quick-actions-grid">
        {/* My Progress */}
        <div className="quick-action-item">
          <ProgressButton onClick={() => navigate("/progress")} />
          
          <span className="quick-action-label">My Progress</span>
        </div>

        {/* Nutri Chat */}
        <div className="quick-action-item">
          <ChatButton onClick={() => navigate("/nutri-chat")} />
          
          <span className="quick-action-label">Nutri Chat</span>
        </div>

        {/* Log Meal */}
        <div className="quick-action-item">
          <LogMealButton onClick={() => navigate("/log-meal")} />
          
          <span className="quick-action-label">Log Meal</span>
        </div>

        {/* Food Diary */}
        <div className="quick-action-item">
          <button
            className="quick-action-button"
            onClick={() => navigate("/food-diary")}
          >
            <span className="quick-action-icon">📓</span>
          </button>
          <span className="quick-action-label">Food Diary</span>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
