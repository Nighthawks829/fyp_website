import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./DashboardCard.css";
import { IoMdMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { handleDashboardChange } from "../../stores/dashboard/dashboardSlice";
import customFetch from "../../utils/axios";
import mqtt from "mqtt";
import { toast } from "react-toastify";
import { handleSensorChange } from "../../stores/sensor/sensorSlice";

export default function DashboardCard({
  id,
  type,
  name,
  sensorType,
  control,
  sensorId,
  sensorName
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  // State variables for storing sensor data
  const [topic, setTopic] = useState(""); // MQTT topic for sensor
  const [data, setData] = useState(0); // Current sensor value
  const [listData, setListData] = useState([]); // Historical sensor data for graph
  const [unit, setUnit] = useState(""); // Unit of measurement for sensor data


  // MQTT client reference to manage connections
  let clientRef = useRef(null);

  // Fetch historical sensor data for graph visualization
  async function getGraphData() {
    const response = await customFetch.get(`/sensorData/${sensorId}`);
    if (Array.isArray(response.data.sensorData)) {
      setListData(response.data.sensorData.map((item) => item.data));
    }
  }

  // Fetch the latest sensor data
  async function getLatestData() {
    const response = await customFetch.get(`/sensorData/latest/${sensorId}`);
    // setData(response.data.sensorData.data.toFixed(2));
    setData(response.data.sensorData.data);
    setUnit(response.data.sensorData.unit);
  }

  // Get MQTT topic for the sensor
  async function getTopic() {
    const response = await customFetch.get(`/sensor/${sensorId}`);
    setTopic(response.data.sensor.topic);
  }

  // Fetch topic and sensor data when the component mounts
  useEffect(() => {
    getTopic();
    if (type === "graph") {
      getGraphData();
    } else if (type === "widget") {
      getLatestData();
    }
    // eslint-disable-next-line
  }, []);

  // Establish MQTT connection and subscribe to topic
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
      if (topicSub === topic) {
        if (type === "graph") {
          getGraphData();
        } else if (type === "widget") {
          getLatestData();
        }
      }
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
    // eslint-disable-next-line
  }, [topic]);

  // Update graph data when listData changes
  useEffect(() => {
    setGraphData({
      labels: listData.map((_, index) => index), // Example labels
      datasets: [
        {
          label: "Data",
          data: listData, // Example data
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.2)"
        }
      ]
    });
  }, [listData]);

  // State for graph data
  const [graphData, setGraphData] = useState({
    labels: [], // Example categorical labels
    datasets: [
      {
        label: "Data",
        data: [], // Example data
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)"
      }
    ]
  });

  // Handle switch control for digital sensors
  async function handleSwitchChange() {
    console.log("Handle Switch Change");
    try {
      await customFetch.post("/sensorControl/", {
        sensorId: sensorId,
        value: data ? 0 : 1,
        topic: topic,
        userId: user.userId,
        unit: ""
      });
      setData(data ? 0 : 1);
    } catch (error) {
      toast.error(error);
    }
  }

  // Handle slider input for analog sensors
  const handleSliderChange = (e) => {
    setData(e.target.value);
  };

  // Send slider value when user stops adjusting
  async function handleSliderChangeComplete() {
    try {
      await customFetch.post("/sensorControl/", {
        sensorId: sensorId,
        value: data,
        topic: topic,
        userId: user.userId,
        unit: ""
      });
    } catch (error) {
      toast.error(error);
    }
  }

  // Handle buzzer tone selection
  async function handleToneChange(e) {
    try {
      await customFetch.post("/sensorControl/", {
        sensorId: sensorId,
        value: parseInt(e.target.value),
        topic: topic,
        userId: user.userId,
        unit: ""
      });
      dispatch(
        handleSensorChange({ name: "value", value: parseInt(e.target.value) })
      );
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div
      className={
        type === "widget"
          ? "col-xl-3 col-lg-4 col-md-6 col-12"
          : "col-xl-6 col-lg-8 col-md-12 col-12"
      }
    >
      <div
        className={`position-relative ratio ${type === "widget" ? "ratio-1x1" : "ratio-4x3"
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
                <button
                  className="dropdown-item text-dark py-2 m-0"
                  data-bs-toggle="modal"
                  data-bs-target="#editWidget"
                  onClick={() => {
                    dispatch(handleDashboardChange({ name: "id", value: id }));
                  }}
                >
                  Edit
                </button>
              </li>

              <li className="ps-1 pe-2">
                <button
                  className="dropdown-item text-danger py-2 m-0 mb-1"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteWidget"
                  onClick={() => {
                    dispatch(handleDashboardChange({ name: "id", value: id }));
                    dispatch(
                      handleDashboardChange({ name: "name", value: name })
                    );
                  }}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
          <h4 className="text-center fw-bold mb-4 mt-2">{name}</h4>
          {type === "widget" ? (
            <>
              <h2 className="text-center fw-bold analogValue display-6 mb-4">
                {
                  sensorType === "Analog"
                    ? parseFloat(data).toFixed(2) +
                    " " +
                    (unit !== undefined ? " " + unit : "") // Show parsed float value for analog sensor
                    : data === 0
                      ? "OFF" // Show "OFF" if data is 0
                      : data === 1
                        ? "ON" // Show "ON" if data is 1
                        : "Invalid " // Optional: handle any other cases
                }
              </h2>
              {control ? (
                sensorType === "Digital" ? (
                  <div className="text-center mb-3">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={data === 1 ? true : false}
                        onChange={handleSwitchChange}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                ) : // <input
                  //   type="range"
                  //   className="mt-4"
                  //   min="0"
                  //   max="4096"
                  //   step="1"
                  //   id="customRange1"
                  //   value={data}
                  //   onChange={handleSliderChange}
                  //   onMouseUp={handleSliderChangeComplete}
                  //   onTouchEnd={handleSliderChangeComplete}

                  sensorName.toLowerCase().includes("buzzer") ? (
                    <div className="col-lg-6 col-md-8 col-12 mx-auto">
                      <select
                        className="form-select mt-4"
                        onChange={handleToneChange}
                        value={data}
                      >
                        <option value="0">Turn Off</option>
                        <option value="262">C</option>
                        <option value="277">C#</option>
                        <option value="294">D</option>
                        <option value="311">D#</option>
                        <option value="330">E</option>
                        <option value="349">F</option>
                        <option value="370">F#</option>
                        <option value="392">G</option>
                        <option value="415">G#</option>
                        <option value="440">A</option>
                        <option value="466">A#</option>
                        <option value="494">B</option>
                      </select>
                    </div>
                  ) : (
                    <input
                      type="range"
                      className="mt-4"
                      min="0"
                      max="4096"
                      step="1"
                      id="customRange1"
                      value={data}
                      onChange={handleSliderChange}
                      onMouseUp={handleSliderChangeComplete}
                      onTouchEnd={handleSliderChangeComplete}
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
