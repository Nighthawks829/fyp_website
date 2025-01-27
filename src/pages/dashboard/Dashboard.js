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
import { Modal, Form } from "react-bootstrap";
import { getSensor } from "../../stores/sensor/sensorSlice";
import { getAllSensors } from "../../stores/allSensors/allSensorsSlice";

export default function Dashboard() {
  const { dashboards } = useSelector((store) => store.allDashboards);
  const { id, sensorId, type, name } = useSelector((store) => store.dashboard);
  const { user } = useSelector((store) => store.auth);
  const { sensors } = useSelector((store) => store.allSensors);

  const dispatch = useDispatch();

  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [showFourthModal, setShowFourthModa] = useState(false);

  const [filterSensor, setFilterSensor] = useState([]);

  useEffect(() => {
    dispatch(getAllDashboards(user.userId));
    dispatch(getAllSensors());
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

  async function handleNext() {
    if (sensorId === "") {
      toast.error("Please select sensor type and sensor");
    } else {
      try {
        const response = await dispatch(getSensor(sensorId)).unwrap();
        if (response.sensorId !== null) {
          setShowFirstModal(false);
          setShowSecondModal(true);
        }
      } catch (error) {
        dispatch(clearDashboardValues());
        setShowFirstModal(false);
        setShowSecondModal(false);
      }
    }
  }

  const handleUserInputSensorType = (e) => {
    dispatch(clearDashboardValues());
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleDashboardChange({ name, value }));
    setFilterSensor(sensors.filter((sensor) => sensor.type === value));
  };

  return (
    <>
      {/* Modal */}
      <Modal
        show={showFirstModal}
        onHide={() => {
          setShowFirstModal(false);
          dispatch(clearDashboardValues());
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="p-5 shadow">
          <h2 className="text-center mb-4">Select Sensor</h2>
          {/* <h4 className="text-center mb-4">Sensor ID</h4> */}
          {/* <Form.Control
            type="text"
            placeholder="Sensor ID"
            name="sensorId"
            value={sensorId}
            onChange={handleUserInput}
            className="border border-dark text-center"
          /> */}
          <select
            className="form-select border border-dark mb-4"
            aria-label="form-select sensor-type"
            id="sensorType"
            name="sensorType"
            onChange={handleUserInputSensorType}
          >
            <option value="">Select Sensor Type</option>
            <option value="Digital Input">Digital Input</option>
            <option value="Digital Output">Digital Output</option>
            <option value="Analog Input">Analog Input</option>
            <option value="Analog Output">Analog Output</option>
          </select>
          <select
            className="form-select border border-dark"
            aria-label="form-select sensor-name"
            id="sensorId"
            name="sensorId"
            value={sensorId}
            required
            onChange={handleUserInput}
          >
            <option value="">Select Sensor</option>
            {filterSensor
              ? filterSensor.map((sensor) => (
                  <option key={sensor.id} value={sensor.id}>
                    {sensor.name} ({sensor.id})
                  </option>
                ))
              : null}
          </select>
          <div className="d-flex align-items-center justify-content-evenly mt-5">
            <button
              className="modal-cancel-button shadow"
              onClick={() => {
                dispatch(clearDashboardValues());
                setShowFirstModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="modal-next-button shadow"
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal 2 */}
      <Modal
        show={showSecondModal}
        onHide={() => {
          setShowSecondModal(false);
          dispatch(clearDashboardValues());
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="p-5 shadow">
          <h2 className="text-center mb-2">Select Sensor</h2>
          <h4 className="text-center mb-4">Component Type</h4>
          <Form.Select
            name="type"
            value={type}
            onChange={handleUserInput}
            className="border border-dark text-center"
          >
            <option value="widget">Widget</option>
            <option value="graph">Visualization Data</option>
          </Form.Select>
          <div className="d-flex align-items-center justify-content-evenly mt-5">
            <button
              className="modal-cancel-button shadow"
              data-bs-dismiss="modal"
              onClick={() => {
                setShowSecondModal(false);
                dispatch(clearDashboardValues());
              }}
            >
              Cancel
            </button>
            <button
              className="modal-next-button shadow"
              onClick={() => {
                setShowSecondModal(false);
                setShowThirdModal(true);
              }}
            >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal 3 */}
      <Modal
        show={showThirdModal}
        onHide={() => {
          setShowThirdModal(false);
          dispatch(clearDashboardValues());
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="p-5 shadow">
          <h2 className="text-center mb-2">Rename Component</h2>
          <h4 className="text-center mb-4">
            Enter new name for this component
          </h4>
          <Form.Control
            type="text"
            placeholder="Component Name"
            name="name"
            value={name}
            onChange={handleUserInput}
            className="border border-dark text-center"
          />
          <div className="d-flex align-items-center justify-content-evenly mt-5">
            <button
              className="modal-cancel-button shadow"
              data-bs-dismiss="modal"
              onClick={() => {
                setShowThirdModal(false);
                dispatch(clearDashboardValues());
              }}
            >
              Cancel
            </button>
            <button
              className="modal-next-button shadow"
              onClick={() => {
                setShowThirdModal(false);
                setShowFourthModa(true);
              }}
            >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal 4 */}
      <Modal
        show={showFourthModal}
        onHide={() => {
          setShowFourthModa(false);
          dispatch(clearDashboardValues());
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="p-5 shadow">
          <h2 className="text-center mb-5">Add {name} to dashboard?</h2>
          <div className="d-flex align-items-center justify-content-evenly mt-5">
            <button
              className="modal-cancel-button shadow"
              data-bs-dismiss="modal"
              onClick={() => {
                setShowFourthModa(false);
                dispatch(clearDashboardValues());
              }}
            >
              Cancel
            </button>
            <button
              className="modal-next-button shadow"
              onClick={() => {
                setShowFourthModa(false);
                handleAddDashboard();
              }}
            >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Widget Modal */}
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

      {/* Delete Widget Modal */}
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
            onClick={() => setShowFirstModal(true)}
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
              <h4 className="dashboad-message">
                Empty Dashboard. Try adding something.
              </h4>
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
                sensorName={dashboard.sensorName}
                control={dashboard.control}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
