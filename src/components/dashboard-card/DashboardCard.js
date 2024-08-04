import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./DashboardCard.css";
import { IoMdMore } from "react-icons/io";
import { useDispatch } from "react-redux";
import { handleDashboardChange } from "../../stores/dashboard/dashboardSlice";
import customFetch from "../../utils/axios";

export default function DashboardCard({
  id,
  type,
  name,
  sensorType,
  control,
  sensorId
}) {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const [data, setData] = useState(0);
  const [listData, setListData] = useState([]);

  let clientRef = useRef(null);

  async function getGraphData() {
    const response = await customFetch.get(`/sensorData/${sensorId}`);
    if (Array.isArray(response.data.sensorData)) {
      setListData(response.data.sensorData.map((item) => item.data));
    }
  }

  async function getLatestData() {
    const response = await customFetch.get(`/sensorData/latest/${sensorId}`);
    setData(response.data.sensorData.data);
  }

  async function getTopic() {
    const response = await customFetch.get(`/sensor/${sensorId}`);
    setTopic(response.data.sensor.topic);
  }

  useEffect(() => {
    getTopic();
    if (type === "graph") {
      getGraphData();
    } else if (type === "widget") {
      getLatestData();
    }
  }, []);

  useEffect(()=>{
    setGraphData({
      labels: listData.map((_,index)=>index), // Example labels
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
  },[listData])

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

  return (
    <div
      className={
        type === "widget"
          ? "col-xl-3 col-lg-4 col-md-6 col-12"
          : "col-xl-6 col-lg-8 col-md-12 col-12"
      }
    >
      <div
        className={`position-relative ratio ${
          type === "widget" ? "ratio-1x1" : "ratio-4x3"
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
                {sensorType === "Analog"
                  ? data
                  : data === 0
                  ? "OFF"
                  : data === 1
                  ? "ON"
                  : data}
              </h2>
              {control ? (
                sensorType === "Digital" ? (
                  <div className="text-center mb-3">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                ) : (
                  <input
                    type="range"
                    className="mt-4"
                    min="0"
                    max="4096"
                    step="1"
                    id="customRange1"
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
