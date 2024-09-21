import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./ViewSensorPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSensorValues,
  deleteSensor,
  getSensor,
  handleSensorChange
} from "../../stores/sensor/sensorSlice";

import defaultImage from "../../assets/led.jpeg";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import mqtt from "mqtt";
import { switchSidebar } from "../../stores/auth/authSlice";

export default function ViewSensorPage() {
  const { id } = useParams();
  const { name, type, topic, pin, boardName, image, value, boardId } =
    useSelector((store) => store.sensor);
  const { user } = useSelector((store) => store.auth);
  const [localValue, setLocalValue] = useState(value);
  const dispatch = useDispatch();

  let clientRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(switchSidebar({ sidebar: "Sensor" }));
  }, [dispatch]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    dispatch(getSensor(id));
  }, [dispatch, id]);

  useEffect(() => {
    clientRef.current = mqtt.connect("mqtt://192.168.0.6:8080", {
      clientId: `clientId_${Math.random().toString(16).substr(2, 8)}`,
      clean: true,
      username: "NighthawksMQTT",
      password: "sunlightsam829",
      connectTimeout: 10000,
      reconnectPeriod: 3000,
      keepalive: 60
    });

    clientRef.current.on("connect", () => {
      console.log("Connected to MQTT broker");
    });

    clientRef.current.on("message", (topicSub, message) => {
      const jsonString = message.toString();
      const jsonObject = JSON.parse(jsonString);
      setLocalValue(jsonObject.value);
      dispatch(handleSensorChange({ name: "value", value: jsonObject.value }));
    });

    // Ensure the MQTT client is available before subscribing
    if (clientRef.current && topic !== "") {
      clientRef.current.subscribe(topic, (err) => {
        if (err) {
          console.error("Subscription error:", err);
        } else {
          console.log(`Subscribed to topic: ${topic}`);
        }
      });
    }

    // Clean up the connection on component unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.end();
      }
    };
  }, [topic, dispatch]);

  const SensorImage = React.memo(
    ({ image }) => {
      const [imgSrc, setImgSrc] = useState("");

      useEffect(() => {
        try {
          setImgSrc(require(`../../../public/uploads/${image}`));
        } catch (error) {
          setImgSrc(defaultImage);
        }
      }, [image]);

      return <img src={imgSrc} alt="" className="board-img" />;
    },
    (prevProps, nextProps) => prevProps.image === nextProps.image
  );

  async function turnOnHandle() {
    try {
      await customFetch.post("/sensorControl/", {
        sensorId: id,
        value: 1,
        topic: topic,
        userId: user.userId,
        unit: ""
      });
      dispatch(handleSensorChange({ name: "value", value: 1 }));
    } catch (error) {
      toast.error(error);
    }
  }

  async function turnOffHandle() {
    try {
      await customFetch.post("/sensorControl/", {
        sensorId: id,
        value: 0,
        topic: topic,
        userId: user.userId,
        unit: ""
      });
      dispatch(handleSensorChange({ name: "value", value: 0 }));
    } catch (error) {
      toast.error(error);
    }
  }

  const handleSliderChange = (e) => {
    setLocalValue(e.target.value);
  };

  async function handleSliderChangeComplete() {
    dispatch(handleSensorChange({ name: "value", value: localValue }));
    try {
      await customFetch.post("/sensorControl/", {
        sensorId: id,
        value: localValue,
        topic: topic,
        userId: user.userId,
        unit: ""
      });
    } catch (error) {
      toast.error(error);
    }
  }

  const renderControls = () => {
    if (type === "Digital Input" || type === "Analog Input") {
      return null;
    } else if (type === "Digital Output") {
      return (
        <div className="text-center mt-4 col-12">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button
              className="px-3 py-1 edit-button shadow m-1"
              onClick={turnOnHandle}
            >
              ON
            </button>
            <button
              className="px-3 py-1 delete-button shadow m-1"
              onClick={turnOffHandle}
            >
              OFF
            </button>
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
            Value: <span className="analog-value">{localValue}</span>
          </h3>
          <div className="col-lg-6 col-md-8 col-12 mx-auto">
            <input
              type="range"
              className="mt-4"
              min="0"
              max="4096"
              step="1"
              id="customRange1"
              value={localValue}
              onChange={handleSliderChange}
              onMouseUp={handleSliderChangeComplete}
              onTouchEnd={handleSliderChangeComplete}
            />
          </div>
        </div>
      );
    }
  };

  async function handleDeleteSensor() {
    try {
      await dispatch(deleteSensor(id)).unwrap();
      navigate(-1);
    } catch (error) {}
  }

  const memoizedSensorImage = useMemo(
    () => <SensorImage image={image} />,
    [image]
  );

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
                Are you sure want to delete {name}?
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
          {memoizedSensorImage}
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
                  Board:{" "}
                  <span
                    className="board-data ms-1 board-link text-primary text-decoration-underline"
                    onClick={() => navigate(`/viewBoard/${boardId}`)}
                  >
                    {boardName}
                  </span>
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
                      : localValue}
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
              onClick={() => navigate(`/editSensor/${id}`)}
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
