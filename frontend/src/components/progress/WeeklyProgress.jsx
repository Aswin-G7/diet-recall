import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./WeeklyProgress.css";

const WeeklyProgress = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyCalories = async () => {
      try {
        const token = localStorage.getItem("token"); // 🚨 GET TOKEN

        const res = await fetch("http://localhost:5000/api/meals/weekly-calories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // 🚨 SEND TOKEN
          }
        });
        
        if (!res.ok) throw new Error("Failed to fetch weekly calories");
        
        const result = await res.json();

        // Ensure arrays are set even if backend returns empty
        setLabels(result?.labels || []);
        setData(result?.data || []);
      } catch (error) {
        console.error("Failed to fetch weekly calories:", error);
        setLabels([]);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyCalories();
  }, []);

  // 📊 Calculations (Protected with Optional Chaining)
  const total = data?.reduce((sum, val) => sum + (val || 0), 0) || 0;
  const average = data?.length ? Math.round(total / data.length) : 0;

  // Calculate Best Day Safely
  const maxCalories = data?.length ? Math.max(...data) : 0;
  const bestDayIndex = maxCalories > 0 ? data.indexOf(maxCalories) : -1;
  const bestDay = bestDayIndex !== -1 && labels[bestDayIndex] ? labels[bestDayIndex] : "-";

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "55%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      labels: { show: false },
    },
    grid: { show: false },
    colors: ["#22c55e"],
  };

  const chartSeries = [
    {
      name: "Calories",
      data: data,
    },
  ];

  if (loading) {
    return <p className="loading-text">Loading weekly progress...</p>;
  }

  return (
    <section className="weekly-progress-card">
      {/* Header */}
      <div className="progress-header">
        <div className="header-left">
          <div className="icon-circle">🔥</div>
          <div>
            <h3>Weekly Calories</h3>
            <p>Average intake</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="progress-stats">
        <div>
          <span>Average</span>
          <strong>{average} kcal</strong>
        </div>
        <div>
          <span>Best Day</span>
          <strong>{bestDay}</strong>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-wrapper">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={260}
        />
      </div>
    </section>
  );
};

export default WeeklyProgress;