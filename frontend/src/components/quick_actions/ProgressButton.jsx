import React from "react";
import "./ProgressButton.css";

const ProgressButton = ({ onClick }) => {
  return (
    <button className="progress-btn-container" onClick={onClick}>
      <div className="bar-wrapper">
        <div className="progress-bar"></div>
        <div className="progress-bar"></div>
        <div className="progress-bar"></div>
        <div className="progress-bar"></div>
        <div className="progress-bar"></div>
      </div>
    </button>
  );
};

export default ProgressButton;