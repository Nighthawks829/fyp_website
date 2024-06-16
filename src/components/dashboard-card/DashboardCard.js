import React, { useState } from "react";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./DashboardCard.css";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";

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
      <div
        className={`position-relative ratio ${
          type === "widget" ? "ratio-1x1" : "ratio-4x3"
        }`}
      >
        <div className="card p-4 d-flex align-items-center justify-content-evenly shadow">
          <div className="position-absolute top-0 end-0 p-2">
            <IoMdMore
              size={30}
              className="dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu py-3">
              <li className="ps-1 pe-2 mb-2">
                <Link
                  className="dropdown-item text-dark py-2 m-0"
                  data-bs-toggle="modal"
                  data-bs-target="#editWidget"
                >
                  Edit
                </Link>
              </li>

              <li className="ps-1 pe-2">
                <button
                  className="dropdown-item text-danger py-2 m-0 mb-1"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteWidget"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
          <h4 className="text-center fw-bold mb-4 mt-2">{title}</h4>
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
            <Line data={graphData} style={{ maxHeight: "90%" }} />
          )}
        </div>
      </div>
    </div>
  );
}
