import React from 'react'

import './MealSection.css'

const MealSection = ({ title, placeholder }) => {
  return (
    <div className="meal-card">
      <h2 className="meal-title">{title}</h2>

      <input
        type="text"
        className="meal-input"
        placeholder={placeholder}
      />

      <input
        type="text"
        className="meal-input"
        placeholder="Quantity (optional)"
      />

      <button className="meal-button" disabled>
        Get Nutrition
      </button>

      <div className="meal-placeholder">
        Nutrition details will appear here
      </div>
    </div>
  )
}

export default MealSection
