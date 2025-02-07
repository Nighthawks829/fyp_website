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
import { toast } from "react-toastify";

export default function VisualizationPage() {
  // Get necessary data from Redux store
  const { sensorId, data } = useSelector((store) => store.visualization);
  const { topic } = useSelector((store) => store.sensor);
  const { sensors } = useSelector((store) => store.allSensors);
  // Local state for filtering sensors based on type
  const [filterSensor, setFilterSensor] = useState([]);
  const dispatch = useDispatch();

  // Reference for MQTT client
  let clientRef = useRef(null);

  // Function to handle user action for watching data
  function handleWatchData() {
    if (sensorId === "") {
      // Show error if no sensor is selected
      toast.error("Please select sensor type and sensor");
    } else {
      // Fetch visualization data if a sensor is selected
      getVisualizationData();
    }
  }

  // Handle sensor type selection
  const handleUserInputSensorType = (e) => {
    // Clear previous visualization values
    dispatch(clearVisualizationValues());
    const name = e.target.name;
    const value = e.target.value;
    // Update visualization state with selected type
    dispatch(handleVisualizationChange({ name, value }));
    // Filter sensors based on selected type
    setFilterSensor(sensors.filter((sensor) => sensor.type === value));
  };

  // Handle sensor selection
  const handleUserInputSensorId = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // Update visualization state with selected sensor ID
    dispatch(handleVisualizationChange({ name, value }));
  };

  // Fetch all sensors when the component mounts
  useEffect(() => {
    dispatch(getAllSensors());
  }, []);

  // Set up MQTT client connection on mount and subscribe to the sensor topic
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

    // Handle successful connection
    clientRef.current.on("connect", () => {
      console.log("Connected to MQTT broker");
    });

    // Handle incoming MQTT messages and update the visualization data
    clientRef.current.on("message", (topicSub, message) => {
      if (topicSub === topic) {
        dispatch(getSensorData(sensorId));
      }
    });

    // Subscribe to the topic once MQTT client is connected
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
        clientRef.current.end();    // Close MQTT client connection
      }
    };
  }, [sensorId, topic, dispatch]);

  // Default graph data structure
  const [graphData, setGraphData] = useState({
    labels: [],   // X-axis labels
    datasets: [
      {
        label: "Data",    // Label for the dataset
        data: [],   // Data points for the graph
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",   // Line color
        borderColor: "rgba(75, 192, 192, 0.2)"    // Border color for the line
      }
    ]
  });

  // Update the graph data whenever new sensor data is available
  useEffect(() => {
    if (Array.isArray(data)) {
      setGraphData({
        labels: data.map((_, index) => index),   // Use the index as labels for the X-axis
        datasets: [
          {
            label: "Data",
            data: data.map((item) => item.data), // Map the sensor data to the Y-axis
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
  }, [data]);    // Trigger when data changes

  // Fetch the visualization data (sensor data and values)
  async function getVisualizationData() {
    dispatch(getSensor(sensorId));       // Get sensor data
    dispatch(getSensorData(sensorId));   // Get sensor data for visualization
  }

  return (
    <>
      {/* Modal for selecting sensor type and sensor */}
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
              {/* Sensor type selection */}
              <select
                className="form-select border border-dark mb-4"
                aria-label="form-select sensor-type"
                id="type"
                name="type"
                onChange={handleUserInputSensorType}
              >
                <option value="">Select Sensor Type</option>
                <option value="Digital Input">Digital Input</option>
                <option value="Digital Output">Digital Output</option>
                <option value="Analog Input">Analog Input</option>
                <option value="Analog Output">Analog Output</option>
              </select>

              {/* Sensor selection */}
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
              {/* Modal buttons */}
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
                  onClick={handleWatchData}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main page content */}
      <div className="p-xl-5 p-3">
        {/* Button to open the modal for selecting sensor */}
        <div className="text-end mb-4">
          <button
            className="add-btn btn-primary fw-bold shadow px-3 py-1"
            data-bs-target="#watchData"
            data-bs-toggle="modal"
          >
            + Watch Data
          </button>
        </div>

        {/* Visualization section */}
        <h3 className="text-center fw-bold mb-5">Visualization Data</h3>
        <div className="d-flex justify-content-center align-items-center">
          {/* Line chart displaying the sensor data */}
          <Line data={graphData} style={{ width: "100%" }} />
        </div>
      </div>
    </>
  );
}
