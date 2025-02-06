import React, { useEffect, useState } from "react";
import loginProfile from "../../assets/login-profile.jpeg";
// import { IoMenu } from "react-icons/io5";
import "./sidebar.css";
import NavigationButton from "../navigation-button/navigation-button";
// import userProfile from "../../assets/profile.jpg";
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
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../stores/auth/authSlice";
import defaultImage from "../../assets/profile.jpg";
import { clearDashboardValues } from "../../stores/dashboard/dashboardSlice";
import { clearBoardValues } from "../../stores/board/boardSlice";
import { clearSensorValues } from "../../stores/sensor/sensorSlice";
import { clearNotificationValues } from "../../stores/notification/notificationSlice";
import { clearUserValues } from "../../stores/user/userSlice";
import { clearVisualizationValues } from "../../stores/visualization/visualizationSlice";
import { clearAllDashboardValue } from "../../stores/allDashboards/allDashboardsSlice";
import { clearAllBoardValue } from "../../stores/allBoards/allBoardsSlice";
import { clearAllSensorValue } from "../../stores/allSensors/allSensorsSlice";
import { clearAllNotificationValue } from "../../stores/allNotifications/allNotificationsSlice";
import { clearAllUserValue } from "../../stores/allUsers/allUsersSlice";


/**
 * Sidebar component that provides navigation for the application.
 * 
 * The sidebar includes user profile details, a logout function, and navigational
 * buttons that change based on the user's role (admin or regular user).
 * 
 * @returns {JSX.Element} The rendered Sidebar component.
 */

export default function SideBar() {
  // Retrieve user details from Redux stores
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Define navigation buttons for admin users
  const adminNavigationButton = [
    { icon: "RiBarChartBoxLine", name: "Dashboard", to: "/dashboard" },
    { icon: "LuCircuitBoard", name: "Board", to: "/board" },
    { icon: "GiLed", name: "Sensor", to: "/sensor" },
    {
      icon: "IoIosNotifications",
      name: "Alert Notification",
      to: "/notification"
    },
    { icon: "BsGraphUp", name: "Visualization Data", to: "/visualization" },
    { icon: "LiaUserCogSolid", name: "User Management", to: "/user" }
  ];

  // Define navigation buttons for regular users
  const userNavigationButton = [
    { icon: "RiBarChartBoxLine", name: "Dashboard", to: "/dashboard" },
    { icon: "LuCircuitBoard", name: "Board", to: "/board" },
    { icon: "GiLed", name: "Sensor", to: "/sensor" },
    {
      icon: "IoIosNotifications",
      name: "Alert Notification",
      to: "/notification"
    },
    { icon: "BsGraphUp", name: "Visualization Data", to: "/visualization" }
  ];

  /**
   * Handles user logout.
   * 
   * This function dispatches the logout action and clears all relevant Redux state values
   * to reset the application state for a new login session.
   */
  async function logoutHandle() {
    dispatch(logoutUser());

    dispatch(clearDashboardValues());
    dispatch(clearBoardValues());
    dispatch(clearSensorValues());
    dispatch(clearNotificationValues());
    dispatch(clearVisualizationValues());
    dispatch(clearUserValues());

    dispatch(clearAllDashboardValue());
    dispatch(clearAllBoardValue());
    dispatch(clearAllSensorValue());
    dispatch(clearAllNotificationValue());
    dispatch(clearAllUserValue());
  }

  /**
   * Component to display the user's profile image.
   * 
   * If the provided image is unavailable, a default image is used.
   * 
   * @param {Object} props - Component props
   * @param {string} props.image - The image filename from the backend
   * @returns {JSX.Element} The rendered user image component
   */
  const UserImage = ({ image }) => {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
      try {
        setImgSrc(require(`../../../public/uploads/${image}`));
      } catch (error) {
        setImgSrc(defaultImage);
      }
    }, [image]);

    return (
      <img
        src={imgSrc}
        alt=""
        className="border border-1 border-dark rounded-circle user-profile profile-img"
      />
    );
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
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

      {/* Sidebar Layout */}
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

            {/* Sidebar Navigation */}
            <div className="sidebar-body pt-5">
              {user.role === "admin"
                ? adminNavigationButton.map((button, index) => (
                  <NavigationButton
                    key={index}
                    icon={button.icon}
                    name={button.name}
                    to={button.to}
                  />
                ))
                : userNavigationButton.map((button, index) => (
                  <NavigationButton
                    key={index}
                    icon={button.icon}
                    name={button.name}
                    to={button.to}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col p-0">
          <div className="py-4 px-5 border-nav ms-auto d-flex align-items-center justify-content-end">
            <UserImage image={user.image} />
            <h5 className="text-capitalize my-0 ms-lg-4 ms-3 me-2 user-name">
              {user.name}
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

          {/* Application Routes */}
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
