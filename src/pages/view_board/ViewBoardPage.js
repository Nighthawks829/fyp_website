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

export default function ViewBoardPage() {
  const { name, type, location, ip_address, image, sensors } = useSelector(
    (store) => store.board
  );
  const dispatch = useDispatch();

  const [deleteSensorId, setDeleteSensorId] = useState("");
  const [deleteSensorName, setDeleteSensorName] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

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

  async function handleDeleteBoard() {
    try {
      await dispatch(deleteBoard(id)).unwrap();
      navigate(-1);
    } catch (error) {}
  }

  async function handleDeleteSensor() {
    try {
      await dispatch(deleteSensor(deleteSensorId));
    } catch (error) {}
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
      {/* Modal */}
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
        <div className="text-center">
          {/* <img src={ESP32} alt="" className="board-img" /> */}
          <BoardImage image={image} />
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
                  <span className="board-data ms-1">{ip_address}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="mb-4">Associated Sensors</h4>
          <table className="table">
            <thead>
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
                <th scope="col" className="text-center col-3"></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {sensors
                ? sensors.map((sensor) => (
                    <tr key={sensor.id}>
                      <td className="text-center py-2 text-decoration-underline text-primary">
                        <Link to={`/viewSensor/${sensor.id}`}>
                          {sensor.name}
                        </Link>
                      </td>
                      <td className="text-center py-2">{sensor.type}</td>
                      <td className="text-center py-2">{sensor.pin}</td>
                      <td className="text-center py-2 action">
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
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
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
      </div>
    </>
  );
}
