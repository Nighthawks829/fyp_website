import React, { useState } from "react";
import "./Dashboard.css";

import DashboardCard from "../../components/dashboard-card/DashboardCard";

export default function Dashboard() {
  // eslint-disable-next-line
  const [data, setData] = useState({
    labels: ["Room 1", "Room 2", "Room 3"], // Example categorical labels
    datasets: [
      {
        label: "Light Data",
        data: [10, 20, 30], // Example data
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });

  return (
    <div className="p-5">
      <div className="text-end">
        <button className="add-btn btn-primary fw-bold shadow px-3 py-1">
          +Add
        </button>
      </div>
      <div className="row g-4 mt-4">
        <DashboardCard
          type="widget"
          title="Room 1 LED"
          data="ON"
          sensorType="digital"
          control={true}
        />

        <DashboardCard
          type="widget"
          title="Room 2 LED"
          data="ON"
          sensorType="digital"
          control={false}
        />

        <DashboardCard
          type="widget"
          title="Room 3 FAN"
          data="350"
          sensorType="analog"
          control={true}
        />

        <DashboardCard
          type="widget"
          title="Room 3 Temperature"
          data="35°C"
          sensorType="analog"
          control={false}
        />

        <DashboardCard
          type="graph"
          title="Room 3 Temperature"
          data={[10, 20, 30]}
          sensorType="analog"
          control={false}
        />
      </div>
    </div>
  );
}
