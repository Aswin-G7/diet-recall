import React, { useMemo } from "react";
import { CalendarDays } from "lucide-react";

const DiaryDateHeader = ({ selectedDate, setSelectedDate }) => {
  // Helper to compare dates without time
  const isSameDay = (d1, d2) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  // Generate an array of dates for the horizontal strip (last 6 days to next 7 days)
  const dateStrip = useMemo(() => {
    const dates = [];
    for (let i = 6; i >= -7; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d);
    }
    return dates;
  }, []);

  const handleDateChange = (e) => {
    if (e.target.value) {
      setSelectedDate(new Date(e.target.value));
    }
  };

  return (
    <div className="space-y-8 mb-8">
      {/* Header & Date Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Food Diary</h1>
          <p className="text-slate-500 font-medium">Tracking history and progress</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <input
              type="date"
              onChange={handleDateChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              value={selectedDate.toISOString().split("T")[0]}
            />
            <button className="bg-white border border-slate-200 p-3 rounded-2xl text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm flex items-center gap-2 font-bold text-sm">
              <CalendarDays size={20} />
              Jump to Date
            </button>
          </div>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all text-sm"
          >
            Today
          </button>
        </div>
      </div>

      {/* Horizontal Calendar Strip */}
      <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        {dateStrip.map((date, idx) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, new Date());
          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center min-w-[70px] py-4 rounded-2xl transition-all ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-xl shadow-emerald-200 scale-105"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                  isSelected ? "text-emerald-100" : "text-slate-300"
                }`}
              >
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-xl font-black">{date.getDate()}</span>
              {isToday && !isSelected && (
                <div className="w-1 h-1 bg-emerald-500 rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiaryDateHeader;