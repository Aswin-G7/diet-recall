import React from "react";
import "./DiaryDateHeader.css";

const DiaryDateHeader = () => {
  return (
    <div className="diary-date-header">
      <button className="date-btn">◀</button>
      <span className="date-text">Today</span>
      <button className="date-btn">▶</button>
    </div>
  );
};

export default DiaryDateHeader;
