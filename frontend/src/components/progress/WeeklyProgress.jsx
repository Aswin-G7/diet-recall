import React from "react";
import Chart from "react-apexcharts";
import "./WeeklyProgress.css";

const WeeklyProgress = () => {
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
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      data: [1600, 1750, 1680, 1800, 1900, 1700, 1650],
    },
  ];

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

        <span className="trend-badge up">⬆ 4.2%</span>
      </div>

      {/* Stats */}
      <div className="progress-stats">
        <div>
          <span>Average</span>
          <strong>1720 kcal</strong>
        </div>
        <div>
          <span>Best Day</span>
          <strong>Sat</strong>
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
