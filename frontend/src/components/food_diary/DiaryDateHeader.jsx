import React, { useState } from "react";
import "./DiaryDateHeader.css";

const DiaryDateHeader = ({ selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDateLabel = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const changeDay = (delta) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + delta);
    setSelectedDate(newDate);
  };

  return (
    <div className="diary-date-header">
      <button className="date-btn" onClick={() => changeDay(-1)}>
        ◀
      </button>

      <span
        className="date-text"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {formatDateLabel(selectedDate)} 📅
      </span>

      <button className="date-btn" onClick={() => changeDay(1)}>
        ▶
      </button>

      {showCalendar && (
        <input
          type="date"
          className="calendar-input"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => {
            setSelectedDate(new Date(e.target.value));
            setShowCalendar(false);
          }}
        />
      )}
    </div>
  );
};

export default DiaryDateHeader;
