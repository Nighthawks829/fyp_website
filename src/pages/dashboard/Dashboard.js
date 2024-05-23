import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  const [data, setData] = useState({
    labels: ["Room 1", "Room 2", "Room 3"], // Example categorical labels
    datasets: [
      {
        label: "Light Data",
        data: [10, 20, 30], // Example data
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });

  return (
    <div className="p-5">
      <div className="text-end">
        <button className="add-btn btn-primary fw-bold shadow px-3 py-1">
          +Add
        </button>
      </div>
      <div className="row g-4 mt-4">
        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
          <div className="ratio ratio-1x1">
            <div className="card p-4 d-flex align-items-center justify-content-evenly shadow">
              <h4 className="text-center fw-bold mb-4">Room 1 LED</h4>
              <h2 className="text-center fw-bold state display-6 mb-4">ON</h2>
              <div className="text-center mb-3">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
          <div className="ratio ratio-1x1">
            <div className="card p-4 d-flex align-items-center justify-content-evenly shadow">
              <h4 className="text-center fw-bold mb-4">Room 2 LED</h4>
              <h2 className="text-center fw-bold state display-6 mb-4">ON</h2>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
          <div className="ratio ratio-1x1">
            <div className="card p-4 d-flex align-items-center justify-content-evenly shadow">
              <h4 className="text-center fw-bold mb-4">Room 3 FAN</h4>
              <h2 className="text-center fw-bold analogValue display-6 mb-4">
                350
              </h2>
              <input
                type="range"
                className="mt-4"
                min="0"
                max="4096"
                step="1"
                id="customRange1"
              ></input>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
          <div className="ratio ratio-1x1">
            <div className="card p-4 d-flex align-items-center justify-content-evenly shadow">
              <h4 className="text-center fw-bold mb-4">Room 3 Temperature</h4>
              <h2 className="text-center fw-bold analogValue display-6 mb-4">
                35°C
              </h2>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-8 col-md-12 col-12">
          <div className="ratio ratio-16x9">
            <div className="card p-4 d-flex align-items-center justify-content-evenly shadow">
              <h4 className="text-center fw-bold mb-4">Room 3 Temperature</h4>
              <div className="container d-flex justify-content-center align-items-center chart-container pb-2" >
                <Line data={data}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
