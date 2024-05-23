import React, { useState, useEffect } from "react";
import loginProfile from "../../assets/login-profile.jpeg";
// import { IoMenu } from "react-icons/io5";
import "./sidebar.css";
import NavigationButton from "../navigation-button/navigation-button";
import userProfile from "../../assets/profile.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "../../pages/dashboard/Dashboard";
import BoardPage from "../../pages/board/BoardPage";

export default function SideBar() {
  const navigationButton = [
    { icon: "RiBarChartBoxLine", name: "Dashboard" },
    { icon: "LuCircuitBoard", name: "Board" },
    { icon: "GiLed", name: "Sensor" },
    { icon: "IoIosNotifications", name: "Alert Notification" },
    { icon: "BsGraphUp", name: "Visualization Data" },
    { icon: "LiaUserCogSolid", name: "User Management" },
  ];

  const [activeButton, setActiveButton] = useState(null);
  const [sidebarHeight, setSidebarHeight] = useState(
    document.body.scrollHeight
  );

  useEffect(() => {
    const handleScroll = () => {
      setSidebarHeight(document.body.scrollHeight);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial call to set the height correctly on component mount
    handleScroll();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="row g-0 m-0">
        <div className="d-flex flex-column col-2 sidebar">
          <div className="header d-flex box align-items-center pt-4 pb-4 px-4 border-nav">
            <img
              src={loginProfile}
              alt=""
              className="border border-1 border-dark rounded-circle"
            />
            <h5 className="text-uppercase fw-bold my-0 ms-lg-4 ms-3">
              NIGHTHAWKS
            </h5>
          </div>
          <div className="sidebar-body pt-5">
            {navigationButton.map((button, index) => (
              <NavigationButton
                key={index}
                icon={button.icon}
                name={button.name}
                active={activeButton === button.name}
                onClick={() => setActiveButton(button.name)}
              />
            ))}
          </div>
        </div>
        <div className="col p-0">
          <div className="py-4 px-5 border-nav ms-auto d-flex align-items-center justify-content-end">
            <img
              src={userProfile}
              alt=""
              className="border border-1 border-dark rounded-circle user-profile"
            />
            <h5 className="text-capitalize my-0 ms-lg-4 ms-3 me-2 user-name">
              Sunlightsam
            </h5>
            <div className="dropdown">
              <IoIosArrowDown
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu mt-3 py-3">
                <li className="ps-1 pe-2 mb-2">
                  <a className="dropdown-item text-dark py-2 m-0" href="/">
                    User Profile
                  </a>
                </li>
                <li className="ps-1 pe-2">
                  <a
                    className="dropdown-item text-danger py-2 m-0 mb-1"
                    href="/"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/board" element={<BoardPage />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
