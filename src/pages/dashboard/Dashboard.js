import React, { useState } from "react";
import "./Dashboard.css";

import DashboardCard from "../../components/dashboard-card/DashboardCard";

export default function Dashboard() {
  // eslint-disable-next-line
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
    <>
      {/* Modal */}
      <div
        class="modal fade"
        id="addWidget1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="addWidgetLabel1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            {/* <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Modal title 1
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div> */}
            <div class="modal-body p-5 shadow">
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
                  data-bs-target="#addWidget2"
                  data-bs-toggle="modal"
                >
                  Next
                </button>
              </div>
            </div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Open second modal
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Modal 2 */}
      <div
        class="modal fade"
        id="addWidget2"
        aria-hidden="true"
        aria-labelledby="addWidgetLabel2"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            {/* <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                Modal 2
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div> */}
            {/* <div class="modal-body">
              Hide this modal and show the first with the button below.
            </div> */}
            {/* <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to first
              </button>
            </div> */}
            <div class="modal-body p-5 shadow">
              <h2 className="text-center mb-2">Select Sensor</h2>
              <h4 className="text-center mb-4">Component Type</h4>
              <select
                type="text"
                className="form-select border border-dark text-center"
                placeholder="Sensor ID"
              >
                <option selected>Open this select menu</option>
                <option value="widget">Widget</option>
                <option value="visualization">Visualization Data</option>
              </select>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-target="#addWidget3"
                  data-bs-toggle="modal"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 3 */}
      <div
        class="modal fade"
        id="addWidget3"
        aria-hidden="true"
        aria-labelledby="addWidgetLabel3"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body p-5 shadow">
              <h2 className="text-center mb-2">Rename Component</h2>
              <h4 className="text-center mb-4">
                Enter new name for this component
              </h4>
              <input
                type="text"
                className="form-control border border-dark text-center"
                placeholder="Component Name"
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
                  data-bs-target="#addWidget4"
                  data-bs-toggle="modal"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 4 */}
      <div
        class="modal fade"
        id="addWidget4"
        aria-hidden="true"
        aria-labelledby="addWidgetLabel4"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body p-5 shadow">
              <h2 className="text-center mb-5">
                Add Room temperature 1 sensor to dashboard?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-target="#addWidget4"
                  data-bs-toggle="modal"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="text-end">
          <button
            className="add-btn btn-primary fw-bold shadow px-3 py-1"
            data-bs-toggle="modal"
            data-bs-target="#addWidget1"
          >
            +Add
          </button>
        </div>
        <div className="row g-4 mt-4">
          <DashboardCard
            type="widget"
            title="Room 1 LED"
            data="ON"
            sensorType="digital"
            control={true}
          />

          <DashboardCard
            type="widget"
            title="Room 2 LED"
            data="ON"
            sensorType="digital"
            control={false}
          />

          <DashboardCard
            type="widget"
            title="Room 3 FAN"
            data="350"
            sensorType="analog"
            control={true}
          />

          <DashboardCard
            type="widget"
            title="Room 3 Temperature"
            data="35°C"
            sensorType="analog"
            control={false}
          />

          <DashboardCard
            type="graph"
            title="Room 3 Temperature"
            data={[10, 20, 30]}
            sensorType="analog"
            control={false}
          />
        </div>
      </div>
    </>
  );
}
