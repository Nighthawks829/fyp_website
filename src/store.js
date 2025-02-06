import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./stores/auth/authSlice";
import allUsersSlice from "./stores/allUsers/allUsersSlice";
import userSlice from "./stores/user/userSlice";
import allBoardsSlice from "./stores/allBoards/allBoardsSlice";
import boardSlice from "./stores/board/boardSlice";
import allSensorsSlice from "./stores/allSensors/allSensorsSlice";
import sensorSlice from "./stores/sensor/sensorSlice";
import allNotificationsSlice from "./stores/allNotifications/allNotificationsSlice";
import notificationSlice from "./stores/notification/notificationSlice";
import allDashboardsSlice from "./stores/allDashboards/allDashboardsSlice";
import dashboardSlice from "./stores/dashboard/dashboardSlice";
import visualizationSlice from "./stores/visualization/visualizationSlice";

/**
 * Redux store configuration.
 * 
 * This store combines multiple slices of state, each responsible for managing
 * a different aspect of the application.
 * 
 * @property {object} reducer - Combines all the Redux slices to manage different states.
 */
export const store = configureStore({
  reducer: {
    // Authentication slice: Manages user authentication state.
    auth: authSlice,

    // All Users slice: Stores data related to all registered users.
    allUsers: allUsersSlice,

    // User slice: Stores information about the currently logged-in user.
    user: userSlice,

    // All Boards slice: Manages a list of all available boards.
    allBoards: allBoardsSlice,
    
    // Board slice: Stores details about a specific board.
    board: boardSlice,

    // All Sensors slice: Manages a list of all sensors in the system.
    allSensors: allSensorsSlice,

    // Sensor slice: Stores details about a specific sensor.
    sensor: sensorSlice,

    // All Notifications slice: Stores a list of all notifications.
    allNotifications: allNotificationsSlice,

    // Notification slice: Stores details about a specific notification.
    notification: notificationSlice,

    // All Dashboards slice: Manages a list of all dashboards.
    allDashboards: allDashboardsSlice,

    // Dashboard slice: Stores details about a specific dashboard.
    dashboard: dashboardSlice,

    // Visualization slice: Manages sensor data visualization.
    visualization: visualizationSlice,
  },
});
