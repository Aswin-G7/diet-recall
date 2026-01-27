import React from 'react'
import './WelcomeBanner.css';

const WelcomeBanner = () => {
  return (
    <section className="welcome-banner">
      <div className="banner-content">
        <div className="text-group">
          <span className="badge">Health Tracker</span>
          <h1>Welcome back, <span className="highlight">NutriTrack</span></h1>
          <p>
            Track your fuel. Select a food item below to analyze nutrients 
            and keep your health journey on track.
          </p>
        </div>
        
        <div className="banner-stats">
          <div className="stat-card">
            <span className="stat-value">1,240</span>
            <span className="stat-label">Daily Calories</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">12</span>
            <span className="stat-label">Day Streak 🔥</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeBanner