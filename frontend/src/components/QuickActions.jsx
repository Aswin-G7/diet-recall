import React from "react";
import "./QuickActions.css";

const QuickActions = () => {
  return (
    <section className="quick-actions-container">
      <h2 className="quick-actions-title">Quick Actions</h2>

      <div className="quick-actions-grid">
        {/* My Progress */}
        <div className="quick-action-item">
          <button className="quick-action-button">
            <span className="quick-action-icon">📊</span>
          </button>
          <span className="quick-action-label">My Progress</span>
        </div>

        {/* Nutri Chat */}
        <div className="quick-action-item">
          <button className="quick-action-button">
            <span className="quick-action-icon">💬</span>
          </button>
          <span className="quick-action-label">Nutri Chat</span>
        </div>

        {/* Log Meal */}
        <div className="quick-action-item">
          <button className="quick-action-button">
            <span className="quick-action-icon">➕</span>
          </button>
          <span className="quick-action-label">Log Meal</span>
        </div>

        {/* Food Diary */}
        <div className="quick-action-item">
          <button className="quick-action-button">
            <span className="quick-action-icon">📓</span>
          </button>
          <span className="quick-action-label">Food Diary</span>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
