import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNotificationThunk,
  deleteNotificationThunk,
  editNotificationThunk,
  getNotificationThunk
} from "./notificationThunk";
import { toast } from "react-toastify";

/**
 * Initial state for the notification slice.
 * Manages notification-related data such as userId, sensorId, message, etc.
 */
const initialState = {
  isLoading: false, // Indicates whether an async request is in progress
  userId: "", // ID of the user associated with the notification
  sensorId: "", // ID of the sensor associated with the notification
  name: "", // Notification name
  message: "", // Message content of the notification
  threshold: "", // Threshold value for triggering the notification
  condition: "bigger", // Condition for threshold comparison (e.g., "bigger" or "smaller")
  platform: "email", // Platform through which the notification is sent (email, SMS, etc.)
  address: "", // Recipient address (email or phone number)
  sensorName: "", // Name of the sensor triggering the notification
  sensorType: "" // Type of sensor associated with the notification
};

/**
 * Async thunk for adding a new notification.
 * Uses `addNotificationThunk` to send a request to the backend.
 */
export const addNotification = createAsyncThunk(
  "notification/addNotification",
  async (notification, thunkAPI) => {
    return addNotificationThunk("/notification/", notification, thunkAPI);
  }
);

/**
 * Async thunk for retrieving a specific notification by its ID.
 * Uses `getNotificationThunk` to fetch data from the backend.
 */
export const getNotification = createAsyncThunk(
  "notification/getNotification",
  async (notificationId, thunkAPI) => {
    return getNotificationThunk(`/notification/${notificationId}`, thunkAPI);
  }
);

/**
 * Async thunk for editing an existing notification.
 * Uses `editNotificationThunk` to send update requests to the backend.
 */
export const editNotification = createAsyncThunk(
  "/notification/editNotification",
  async ({ notificationId, notification }, thunkAPI) => {
    return editNotificationThunk(
      `/notification/${notificationId}`,
      notification,
      thunkAPI
    );
  }
);

/**
 * Async thunk for deleting a notification by its ID.
 * Uses `deleteNotificationThunk` to remove the notification from the backend.
 */
export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (notificationId, thunkAPI) => {
    return deleteNotificationThunk(`/notification/${notificationId}`, thunkAPI);
  }
);

/**
 * Redux slice for handling notification-related state and actions.
 */
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Updates the state when notification form fields change.
    handleNotificationChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    // Resets all notification-related state values to their initial state.
    clearNotificationValues: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      // Handling add notification
      .addCase(addNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNotification.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add notification successful!");
      })
      .addCase(addNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handling get notification
      .addCase(getNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userId = payload.userId;
        state.sensorId = payload.sensorId;
        state.name = payload.name;
        state.message = payload.message;
        state.threshold = payload.threshold;
        state.condition = payload.condition;
        state.platform = payload.platform;
        state.address = payload.address;
        state.sensorName = payload.sensorName;
      })
      .addCase(getNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handling edit notification
      .addCase(editNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit sensor successful!");
      })
      .addCase(editNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handling delete notification
      .addCase(deleteNotification.pending, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload);
      })
      .addCase(deleteNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Notification deleted successfully!");
      })
      .addCase(deleteNotification.rejected, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload);
      });
  }
});

// Exporting reducer functions for updating notification state.
export const { handleNotificationChange, clearNotificationValues } =
  notificationSlice.actions;

// Exporting the notification slice reducer to be used in the Redux store.
export default notificationSlice.reducer;
