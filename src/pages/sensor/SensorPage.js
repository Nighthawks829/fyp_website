import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getAllSensors } from "../../stores/allSensors/allSensorsSlice";
import { deleteSensor } from "../../stores/sensor/sensorSlice";

export default function SensorPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Using useSelector to access the user data and list of sensors from the Redux store
  const { user } = useSelector((store) => store.auth);

  // Using useSelector to access the user data and list of sensors from the Redux store
  const { sensors } = useSelector((store) => store.allSensors);

  // State variables to store the sensor id and name to be deleted
  const [deleteSensorId, setDeleteSensorId] = useState("");
  const [deleteSensorName, setDeleteSensorName] = useState("");

  // Fetch all sensors from the store when the component mounts
  useEffect(() => {
    dispatch(getAllSensors());
  }, [dispatch]);

  // Helper function to copy sensor ID to clipboard (unsecured method)
  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  }

  // Handler function for deleting a sensor
  async function handleDeleteSensor() {
    // Dispatch deleteSensor action and refresh the list of sensors
    dispatch(deleteSensor(deleteSensorId));
    dispatch(getAllSensors());
  }

  return (
    <>
      {/* Modal for confirming sensor deletion */}
      <div
        className="modal fade"
        id="deleteSensor"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteSensorLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              {/* Display confirmation message for deleting sensor */}
              <h2 className="text-center mb-5">
                Are you sure want to delete {deleteSensorName}?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                {/* Delete action button */}
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => handleDeleteSensor()}
                >
                  Yes
                </button>
                {/* Cancel action button */}
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

      {/* Main page content */}
      <div className="p-xl-5 p-3">
        {/* Conditional button to add a new sensor if the user is an admin */}
        <div className="text-end mb-4">
          {user.role === "admin" ? (
            <button
              className="add-btn btn-primary fw-bold shadow px-3 py-1"
              onClick={() => navigate("/addSensor")}
            >
              + Sensor
            </button>
          ) : null}
        </div>
        {/* Table for displaying sensor information */}
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Name
              </th>
              <th className="text-center" scope="col">
                Type
              </th>
              <th className="text-center" scope="col">
                Pin
              </th>
              <th className="text-center" scope="col">
                Board
              </th>
              <th className="text-center" scope="col">
                Topic
              </th>
              {/* Only show the last column for actions if the user is an admin */}
              <th className="text-center" scope="col"></th>
            </tr>
          </thead>
          {/* Display each sensor's information in the table */}
          <tbody className="table-group-divider">
            {sensors
              ? sensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td className="text-center">
                    {/* Link to view sensor details */}
                    <Link to={`/viewSensor/${sensor.id}`}>{sensor.name}</Link>
                  </td>
                  <td className="text-center">{sensor.type}</td>
                  <td className="text-center">{sensor.pin}</td>
                  <td className="text-center">{sensor.boardName}</td>
                  <td className="text-center">{sensor.topic}</td>
                  {/* Action buttons */}
                  <td className="text-center py-2 action">
                    <div className="dropdown">
                      {/* Dropdown button for actions */}
                      <IoIosMore
                        size={25}
                        className="dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu py-3">
                        {/* Only show "Edit" option for admin users */}
                        {user.role === "admin" ? (
                          <li className="ps-1 pe-2 mb-2">
                            <Link
                              className="dropdown-item text-dark py-2 m-0"
                              to={`/editSensor/${sensor.id}`}
                            >
                              Edit
                            </Link>
                          </li>
                        ) : null}
                        {/* Copy sensor ID to clipboard */}
                        <li className="ps-1 pe-2 mb-2">
                          <button
                            className="dropdown-item text-dark py-2 m-0"
                            onClick={() => {
                              // navigator.clipboard.writeText(sensor.id);
                              unsecuredCopyToClipboard(sensor.id);
                            }}
                          >
                            Copy ID
                          </button>
                        </li>
                        {/* Only show "Delete" option for admin users */}
                        {user.role === "admin" ? (
                          <li className="ps-1 pe-2">
                            <button
                              className="dropdown-item text-danger py-2 m-0 mb-1"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteSensor"
                              onClick={() => {
                                setDeleteSensorId(sensor.id);
                                setDeleteSensorName(sensor.name);
                              }}
                            >
                              Delete
                            </button>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
