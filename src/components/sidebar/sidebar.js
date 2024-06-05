import React from "react";
import loginProfile from "../../assets/login-profile.jpeg";
// import { IoMenu } from "react-icons/io5";
import "./sidebar.css";
import NavigationButton from "../navigation-button/navigation-button";
import userProfile from "../../assets/profile.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "../../pages/dashboard/Dashboard";
import BoardPage from "../../pages/board/BoardPage";
import ViewBoardPage from "../../pages/view_board/ViewBoardPage";
import EditBoardPage from "../../pages/edit_board/EditBoardPage";
import AddBoardPage from "../../pages/addBoard/AddBoardPage";
import SensorPage from "../../pages/sensor/SensorPage";
import AddSensorPage from "../../pages/addSensor/AddSensorPage";
import ViewSensorPage from "../../pages/viewSensor/ViewSensorPage";
import EditSensorPage from "../../pages/editSensor/EditSensorPage";
import AlertNotificationPage from "../../pages/alertNotification/AlertNotificationPage";
import AddNotificationPage from "../../pages/addNotification/AddNotificationPage";
import EditNotificationPage from "../../pages/editNotification/EditNotificationPage";
import VisualizationPage from "../../pages/visualization/VisualizationPage";
import UserManagementPage from "../../pages/userManagement/UserManagementPage";
import ViewUserPage from "../../pages/viewUser/ViewUserPage";
import AddUserPage from "../../pages/addUser/AddUserPage";
import EditUserPage from "../../pages/editUser/EditUserPage";
import UserProfilePage from "../../pages/userProfile/UserProfilePage";
import EditUserProfilePage from "../../pages/editUserProfile/EditUserProfilePage";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../stores/auth/authSlice";

export default function SideBar({ currentTab, setCurrentTab }) {
  const dispatch = useDispatch();
  const navigationButton = [
    { icon: "RiBarChartBoxLine", name: "Dashboard", to: "/dashboard" },
    { icon: "LuCircuitBoard", name: "Board", to: "/board" },
    { icon: "GiLed", name: "Sensor", to: "/sensor" },
    {
      icon: "IoIosNotifications",
      name: "Alert Notification",
      to: "/notification",
    },
    { icon: "BsGraphUp", name: "Visualization Data", to: "/visualization" },
    { icon: "LiaUserCogSolid", name: "User Management", to: "/user" },
  ];

  async function logoutHandle() {
    dispatch(logoutUser());
  }

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-5">Are you sure want to logout?</h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => logoutHandle()}
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

      <div className="row g-0 m-0">
        <div className="sidebar-container">
          <div className="d-flex flex-column col-2 sidebar">
            <div className="header d-flex box align-items-center pt-4 pb-4 px-4 border-nav">
              <img
                src={loginProfile}
                alt=""
                className="border border-1 border-dark rounded-circle profile-img"
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
                  to={button.to}
                  setCurrentTab={setCurrentTab}
                  currentTab={currentTab}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col p-0">
          <div className="py-4 px-5 border-nav ms-auto d-flex align-items-center justify-content-end">
            <img
              src={userProfile}
              alt=""
              className="border border-1 border-dark rounded-circle user-profile profile-img"
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
                  <Link
                    className="dropdown-item text-dark py-2 m-0"
                    to="/userProfile"
                  >
                    User Profile
                  </Link>
                </li>
                <li className="ps-1 pe-2">
                  {/* <a
                    className="dropdown-item text-danger py-2 m-0 mb-1"
                    href="/"
                  >
                    Logout
                  </a> */}
                  <button
                    className="dropdown-item text-danger py-2 m-0 mb-1"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutModal"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/board" element={<BoardPage />} />
              <Route path="/viewBoard/:id" element={<ViewBoardPage />} />
              <Route path="/editBoard/:id" element={<EditBoardPage />} />
              <Route path="/addBoard" element={<AddBoardPage />} />
              <Route path="/sensor" element={<SensorPage />} />
              <Route path="/addSensor" element={<AddSensorPage />} />
              <Route path="/viewSensor/:id" element={<ViewSensorPage />} />
              <Route path="/editSensor/:id" element={<EditSensorPage />} />
              <Route path="/notification" element={<AlertNotificationPage />} />
              <Route path="/visualization" element={<VisualizationPage />} />
              <Route path="/user" element={<UserManagementPage />} />
              <Route path="/viewUser/:id" element={<ViewUserPage />} />
              <Route path="/addUser" element={<AddUserPage />} />
              <Route path="/editUser/:id" element={<EditUserPage />} />
              <Route
                path="/editNotification/:id"
                element={<EditNotificationPage />}
              />
              <Route
                path="/addNotification"
                element={<AddNotificationPage />}
              />
              <Route path="/userProfile" element={<UserProfilePage />} />
              <Route
                path="/editUserProfile"
                element={<EditUserProfilePage />}
              />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
