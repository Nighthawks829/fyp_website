import React, { useEffect, useState } from "react";
import { getAllDashboards } from "../../stores/allDashboards/allDashboardsSlice";
import "./Dashboard.css";

import DashboardCard from "../../components/dashboard-card/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addDashboard,
  clearDashboardValues,
  deleteDashboard,
  editDashboard,
  handleDashboardChange
} from "../../stores/dashboard/dashboardSlice";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { dashboards } = useSelector((store) => store.allDashboards);
  const { id, sensorId, type, name } = useSelector((store) => store.dashboard);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDashboards(user.userId));
  }, [dispatch, user.userId]);

  // eslint-disable-next-line
  const [data, setData] = useState({
    labels: ["Room 1", "Room 2", "Room 3"], // Example categorical labels
    datasets: [
      {
        label: "Light Data",
        data: [10, 20, 30], // Example data
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)"
      }
    ]
  });

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleDashboardChange({ name, value }));
  };

  async function handleAddDashboard() {
    if (sensorId === "" || name === "") {
      toast.error("Please provide all values");
      dispatch(clearDashboardValues());
      return;
    } else {
      const userId = user.userId;
      const control = user.role === "admin" ? true : false;
      await dispatch(
        addDashboard({
          userId,
          sensorId,
          name,
          control,
          type
        })
      ).unwrap();
      dispatch(getAllDashboards(user.userId));
    }
  }

  async function handleEditDashboard() {
    if (id === "" || name === "") {
      toast.error("Please provide all values");
      dispatch(clearDashboardValues());
      return;
    } else {
      const userId = user.userId;
      const dashboardId = id; // Assuming 'id' is the dashboard ID
      const dashboard = { name, userId }; // Construct the dashboard object

      await dispatch(editDashboard({ dashboardId, dashboard })).unwrap();
      dispatch(getAllDashboards(user.userId));
    }
  }

  async function handleDeleteDashboard() {
    if (id === "") {
      toast.error("Please provide all values");
      dispatch(clearDashboardValues());
    } else {
      await dispatch(deleteDashboard(id)).unwrap();
      dispatch(getAllDashboards(user.userId));
    }
  }

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="addWidget1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="addWidgetLabel1"
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
                id="sensorId"
                name="sensorId"
                value={sensorId}
                required
                onChange={handleUserInput}
              />
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => dispatch(clearDashboardValues())}
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
          </div>
        </div>
      </div>

      {/* Modal 2 */}
      <div
        className="modal fade"
        id="addWidget2"
        aria-hidden="true"
        aria-labelledby="addWidgetLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-2">Select Sensor</h2>
              <h4 className="text-center mb-4">Component Type</h4>
              <select
                type="text"
                className="form-select border border-dark text-center"
                placeholder="Sensor ID"
                id="type"
                name="type"
                value={type}
                required
                onChange={handleUserInput}
              >
                {/* <option selected>Open this select menu</option> */}
                <option value="widget">Widget</option>
                <option value="graph">Visualization Data</option>
              </select>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => dispatch(clearDashboardValues())}
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
        className="modal fade"
        id="addWidget3"
        aria-hidden="true"
        aria-labelledby="addWidgetLabel3"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-2">Rename Component</h2>
              <h4 className="text-center mb-4">
                Enter new name for this component
              </h4>
              <input
                type="text"
                className="form-control border border-dark text-center"
                placeholder="Component Name"
                id="name"
                name="name"
                value={name}
                required
                onChange={handleUserInput}
              />
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => dispatch(clearDashboardValues())}
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
        className="modal fade"
        id="addWidget4"
        aria-hidden="true"
        aria-labelledby="addWidgetLabel4"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-5">Add {name} to dashboard?</h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => dispatch(clearDashboardValues())}
                >
                  Cancel
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-target="#addWidget4"
                  data-bs-toggle="modal"
                  onClick={() => handleAddDashboard()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editWidget"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editWidgetLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-2">Rename Component</h2>
              <h4 className="text-center mb-4">
                Enter new name for this component
              </h4>
              <input
                type="text"
                className="form-control border border-dark text-center"
                placeholder="Component Name"
                id="name"
                name="name"
                value={name}
                required
                onChange={handleUserInput}
              />
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => dispatch(clearDashboardValues())}
                >
                  Cancel
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-target="#editWidget"
                  data-bs-toggle="modal"
                  onClick={() => handleEditDashboard()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="deleteWidget"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteWidgetLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-5">
                Are you sure want to delete {name}?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => handleDeleteDashboard()}
                >
                  Yes
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-dismiss="modal"
                >
                  No
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
          {dashboards.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px", width: "100%" }}
            >
              <h4 className="dashboad-message">Empty Dashboard. Try adding something.</h4>
            </div>
          ) : (
            dashboards.map((dashboard) => (
              <DashboardCard
                key={dashboard.id}
                id={dashboard.id}
                sensorId={dashboard.sensorId}
                type={dashboard.type}
                name={dashboard.name}
                sensorType={
                  dashboard.sensorType ? dashboard.sensorType.split(" ")[0] : ""
                }
                control={dashboard.control}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
