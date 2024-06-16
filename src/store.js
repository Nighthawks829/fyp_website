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

export const store = configureStore({
  reducer: {
    auth: authSlice,
    allUsers: allUsersSlice,
    user: userSlice,
    allBoards: allBoardsSlice,
    board: boardSlice,
    allSensors: allSensorsSlice,
    sensor: sensorSlice,
    allNotifications: allNotificationsSlice,
    notification: notificationSlice,
    allDashboards: allDashboardsSlice,
    dashboard: dashboardSlice,
    visualization: visualizationSlice,
  },
});
