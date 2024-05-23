import React, { useState } from "react";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./DashboardCard.css";

export default function DashboardCard({
  type,
  title,
  data,
  sensorType,
  control,
}) {
  // eslint-disable-next-line
  const [graphData, setGraphData] = useState({
    labels: ["Room 1", "Room 2", "Room 3"], // Example categorical labels
    datasets: [
      {
        label: "Light Data",
        data: data, // Example data
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });

  return (
    <div
      className={
        type === "widget"
          ? "col-xl-3 col-lg-4 col-md-6 col-12"
          : "col-xl-6 col-lg-8 col-md-12 col-12"
      }
    >
      <div className={`ratio ${type === "widget" ? "ratio-1x1" : "ratio-4x3"}`}>
        <div className="card p-4 d-flex align-items-center justify-content-evenly shadow">
          <h4 className="text-center fw-bold mb-4">{title}</h4>
          {type === "widget" ? (
            <>
              <h2 className="text-center fw-bold analogValue display-6 mb-4">
                {data}
              </h2>
              {control ? (
                sensorType === "digital" ? (
                  <div className="text-center mb-3">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                ) : (
                  <input
                    type="range"
                    className="mt-4"
                    min="0"
                    max="4096"
                    step="1"
                    id="customRange1"
                  />
                )
              ) : null}
            </>
          ) : (
            <Line data={graphData} />
          )}
        </div>
      </div>
    </div>
  );
}
