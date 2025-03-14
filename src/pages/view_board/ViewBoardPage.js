import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./ViewBoardPage.css";
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBoardValues,
  deleteBoard,
  getBoard
} from "../../stores/board/boardSlice";
import { deleteSensor } from "../../stores/sensor/sensorSlice";
import { Link } from "react-router-dom";

import defaultImage from "../../assets/esp32.jpeg";
import { switchSidebar } from "../../stores/auth/authSlice";

export default function ViewBoardPage() {
  // Get current user's details and board details from Redux store
  const { user } = useSelector((store) => store.auth);
  const { name, type, location, ip_address, image, sensors } = useSelector(
    (store) => store.board
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to track sensor to be deleted
  const [deleteSensorId, setDeleteSensorId] = useState("");
  // State to store sensor name for deletion confirmation
  const [deleteSensorName, setDeleteSensorName] = useState("");

  const { id } = useParams();   // Get board ID from URL params

  // Handle click on board name (opens the board's IP address in a new tab if valid)
  function handleBoardNameClick() {
    if (ip_address) {
      const url = `http://${ip_address}`;
      window.open(url, "_blank"); // Opens the URL in a new tab
    }
  }

  // useEffect hook to update the sidebar state when the component mounts
  useEffect(() => {
    dispatch(switchSidebar({ sidebar: "Board" }));
  }, [dispatch]);

  // useEffect hook to fetch board details when the component mounts
  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

  // Component for rendering board image, fallback to default image if not available
  const BoardImage = ({ image }) => {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
      try {
        setImgSrc(require(`../../../public/uploads/${image}`));
      } catch (error) {
        setImgSrc(defaultImage);
      }
    }, [image]);

    return <img src={imgSrc} alt="" className="board-img" />;
  };

  // Handle board deletion logic
  async function handleDeleteBoard() {
    try {
      await dispatch(deleteBoard(id)).unwrap();
      navigate(-1);
    } catch (error) { }
  }

  // Handle sensor deletion logic
  async function handleDeleteSensor() {
    try {
      await dispatch(deleteSensor(deleteSensorId));
    } catch (error) { }
  }

  return (
    <>
      {/* Delete Board Modal */}
      <div
        className="modal fade"
        id="deleteBoard"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteBoardLabel1"
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
                  onClick={() => handleDeleteBoard()}
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

      {/* Delete Sensor Modal */}
      <div
        className="modal fade"
        id="deleteSensor"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteBoardLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-5">
                Are you sure want to delete {deleteSensorName}?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => handleDeleteSensor()}
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
        <div className="text-start">
          <button
            className="back-btn btn-primary fw-bold shadow px-4 py-1 mb-3"
            onClick={() => {
              navigate(-1);
              dispatch(clearBoardValues());
            }}
          >
            Back
          </button>
        </div>

        {/* Board details */}
        <div className="text-center">
          <BoardImage image={image} />    {/* Display board image */}
          <div className="col-lg-6 col-12 mx-auto mt-5">
            <div className="row">
              <div className="col-md-6 col-12 mb-3">
                <h5 className="fw-bold">
                  Name: <span className="board-data ms-1">{name}</span>
                </h5>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <h5 className="fw-bold">
                  Location: <span className="board-data ms-1">{location}</span>
                </h5>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <h5 className="fw-bold">
                  Type: <span className="board-data ms-1">{type}</span>
                </h5>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <h5 className="fw-bold">
                  IP Address:{" "}
                  <span
                    className="board-data ms-1 board-link text-primary text-decoration-underline"
                    onClick={handleBoardNameClick}
                  >
                    {ip_address}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* List of associated sensors */}
        <div className="mt-4">
          <h4 className="mb-4">Associated Sensors</h4>
          <table className="table">
            <thead>
              {/* Table headers */}
              <tr>
                <th scope="col" className="text-center col-3">
                  Name
                </th>
                <th scope="col" className="text-center col-3">
                  Type
                </th>
                <th scope="col" className="text-center col-3">
                  Pin
                </th>
                {user.role === "admin" ? (
                  <th scope="col" className="text-center col-3"></th>
                ) : null}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {sensors
                ? sensors.map((sensor) => (
                  <tr key={sensor.id}>
                    {/* Display sensor details */}
                    <td className="text-center py-2 text-decoration-underline text-primary">
                      <Link to={`/viewSensor/${sensor.id}`}>
                        {sensor.name}
                      </Link>
                    </td>
                    <td className="text-center py-2">{sensor.type}</td>
                    <td className="text-center py-2">{sensor.pin}</td>
                    {user.role === "admin" ? (
                      <td className="text-center py-2 action">
                        {/* Action dropdown for editing/deleting sensor */}
                        <div className="dropdown">
                          <IoIosMore
                            size={25}
                            className="dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          />
                          <ul className="dropdown-menu py-3">
                            <li className="ps-1 pe-2 mb-2">
                              <Link
                                className="dropdown-item text-dark py-2 m-0"
                                to={`/editSensor/${sensor.id}`}
                              >
                                Edit
                              </Link>
                            </li>
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
                          </ul>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))
                : null}
            </tbody>
          </table>
        </div>
        {/* Admin actions for editing and deleting the board */}
        {user.role === "admin" ? (
          <div className="mt-5 col-12 text-center ">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <button
                className="px-3 py-1 edit-button shadow m-1"
                onClick={() => navigate(`/editBoard/${id}`)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 delete-button shadow m-1"
                data-bs-toggle="modal"
                data-bs-target="#deleteBoard"
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
