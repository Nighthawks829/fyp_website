import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  clearVisualizationValues,
  getSensorData,
  handleVisualizationChange
} from "../../stores/visualization/visualizationSlice";
import mqtt from "mqtt";
import { getSensor } from "../../stores/sensor/sensorSlice";
import { getAllSensors } from "../../stores/allSensors/allSensorsSlice";

export default function VisualizationPage() {
  const { sensorId, data, type } = useSelector((store) => store.visualization);
  const { topic } = useSelector((store) => store.sensor);
  const { sensors } = useSelector((store) => store.allSensors);
  const [filterSensor, setFilterSensor] = useState([]);
  const dispatch = useDispatch();

  let clientRef = useRef(null);

  const handleUserInputSensorType = (e) => {
    dispatch(clearVisualizationValues());
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleVisualizationChange({ name, value }));
    setFilterSensor(sensors.filter((sensor) => sensor.type === value));
  };

  const handleUserInputSensorId = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleVisualizationChange({ name, value }));
  };

  useEffect(() => {
    dispatch(getAllSensors());
  }, []);

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
        dispatch(getSensorData(sensorId));
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
  }, [sensorId, topic, dispatch]);

  // eslint-disable-next-line
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

  // const handleInputChange = (e) => {
  //   dispatch(handleSensorIdChange(e.target.value));
  // };

  useEffect(() => {
    if (Array.isArray(data)) {
      setGraphData({
        labels: data.map((_, index) => index), // Example labels
        datasets: [
          {
            label: "Data",
            data: data.map((item) => item.data), // Example data
            fill: false,
            backgroundColor: "rgb(75, 192, 192)",
            borderColor: "rgba(75, 192, 192, 0.2)"
          }
        ]
      });
    } else {
      setGraphData({
        labels: [],
        datasets: [
          {
            label: "Data",
            data: [],
            fill: false,
            backgroundColor: "rgb(75, 192, 192)",
            borderColor: "rgba(75, 192, 192, 0.2)"
          }
        ]
      });
    }
  }, [data]);

  async function getVisualizationData() {
    dispatch(getSensor(sensorId));
    dispatch(getSensorData(sensorId));
    // dispatch(handleSensorIdChange(""));
  }

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
              <h2 className="text-center mb-4">Select Sensor</h2>
              {/* <h4 className="text-center mb-4">Sensor ID</h4> */}
              <select
                className="form-select border border-dark mb-4"
                aria-label="form-select sensor-type"
                id="type"
                name="type"
                onChange={handleUserInputSensorType}
              >
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
                onChange={handleUserInputSensorId}
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
              {/* <input
                type="text"
                className="form-control border border-dark text-center"
                placeholder="Sensor ID"
                name="sensorId"
                id="sensorId"
                value={sensorId}
                onChange={handleVisualizationChange}
              /> */}
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => dispatch(clearVisualizationValues())}
                >
                  Cancel
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-target="#watchData"
                  data-bs-toggle="modal"
                  onClick={getVisualizationData}
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
          <Line data={graphData} style={{ width: "100%" }} />
        </div>
      </div>
    </>
  );
}
