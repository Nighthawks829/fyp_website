import React, { useState } from "react";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function VisualizationPage() {
  // eslint-disable-next-line
  const [graphData, setGraphData] = useState({
    labels: ['1','2','3'], // Example categorical labels
    datasets: [
      {
        label: "Light Data",
        data: [10,20,30], // Example data
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });

  return (
    <>
      <div
        className="modal fade"
        id="watchData"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="watchDataLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-2">Select Sensor</h2>
              <h4 className="text-center mb-4">Sensor ID</h4>
              <input
                type="text"
                className="form-control border border-dark text-center"
                placeholder="Sensor ID"
              />
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-target="#watchData"
                  data-bs-toggle="modal"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-xl-5 p-3">
        <div className="text-end mb-4">
          <button
            className="add-btn btn-primary fw-bold shadow px-3 py-1"
            data-bs-target="#watchData"
            data-bs-toggle="modal"
          >
            + Watch Data
          </button>
        </div>
        <h3 className="text-center fw-bold mb-5">Visualization Data</h3>
        <div className="d-flex justify-content-center align-items-center">
          <Line data={graphData} style={{width:'100%'}}/>
        </div>
      </div>
    </>
  );
}
