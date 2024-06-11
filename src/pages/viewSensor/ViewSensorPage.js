import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./ViewSensorPage.css";
import { useDispatch, useSelector } from "react-redux";
import { clearSensorValues, getSensor } from "../../stores/sensor/sensorSlice";

import defaultImage from "../../assets/led.jpeg";

export default function ViewSensorPage() {
  const { id } = useParams();
  const { name, type, topic, pin, boardName, image, value } = useSelector(
    (store) => store.sensor
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSensor(id));
  }, [dispatch, id]);

  const SensorImage = ({ image }) => {
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

  const renderControls = () => {
    if (type === "Digital Input" || type === "Analog Input") {
      return null;
    } else if (type === "Digital Output") {
      return (
        <div className="text-center mt-4 col-12">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button className="px-3 py-1 edit-button shadow m-1">ON</button>
            <button className="px-3 py-1 delete-button shadow m-1">OFF</button>
          </div>
          <h3 className="mt-4">
            State:{" "}
            <span className="digital-value">{value > 0 ? "ON" : "OFF"}</span>
          </h3>
        </div>
      );
    } else if (type === "Analog Output") {
      return (
        <div className="text-center mt-4 col-12">
          <h3>
            Value: <span className="analog-value">{value ? value : "0"}</span>
          </h3>
          <div className="col-lg-6 col-md-8 col-12 mx-auto">
            <input
              type="range"
              className="mt-4"
              min="0"
              max="4096"
              step="1"
              id="customRange1"
              value={value}
              // onChange={(e) => dispatch(updateSensorValue(e.target.value))}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {/* Modal */}
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
              <h2 className="text-center mb-5">
                Are you sure want to delete Sensor 1?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
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

      <div className="p-xl-5 p-3">
        <div className="text-start">
          <button
            className="back-btn btn-primary fw-bold shadow px-4 py-1"
            onClick={() => {
              dispatch(clearSensorValues());
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>

        <div className="text-center">
          {/* <img
            src={require("../../assets/led.jpeg")}
            alt=""
            className="board-img"
          /> */}
          <SensorImage image={image} />
          {/* <div className="mt-4 col-12 text-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <button className="px-3 py-1 edit-button shadow m-1">ON</button>
              <button className="px-3 py-1 delete-button shadow m-1">
                OFF
              </button>
            </div>
            <h3 className="mt-4">
              State: <span className="digital-value">ON</span>
            </h3>
            <h3>
              Value: <span className="analog-value">1024</span>
            </h3>
            <div className="col-lg-6 col-md-8 col-12 mx-auto">
              <input
                type="range"
                className="mt-4"
                min="0"
                max="4096"
                step="1"
                id="customRange1"
              />
            </div>
          </div> */}
          {renderControls()}
          <div className="col-lg-8 col-12 mx-auto mt-5">
            <div className="row">
              <div className="col-lg-6 col-12 mb-3">
                <h5 className="fw-bold">
                  Name: <span className="board-data ms-1">{name}</span>
                </h5>
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <h5 className="fw-bold">
                  Pin: <span className="board-data ms-1">{pin}</span>
                </h5>
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <h5 className="fw-bold">
                  Type: <span className="board-data ms-1">{type}</span>
                </h5>
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <h5 className="fw-bold">
                  Board: <span className="board-data ms-1">{boardName}</span>
                </h5>
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <h5 className="fw-bold">
                  Topic: <span className="board-data ms-1">{topic}</span>
                </h5>
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <h5 className="fw-bold">
                  {type.includes("Digital") ? "State" : "Value"}:
                  <span className="board-data ms-1">
                    {type.includes("Digital")
                      ? value > 0
                        ? "ON"
                        : "OFF"
                      : value
                      ? value
                      : "0"}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 col-12 text-center ">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button
              className="px-3 py-1 edit-button shadow m-1"
              onClick={() => navigate(`/editSensor/1`)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 delete-button shadow m-1"
              data-bs-toggle="modal"
              data-bs-target="#deleteSensor"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
