import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllNotificationsThunk } from "./allNotificationsThunk";

/**
 * Initial state for the notifications slice.
 * @property {boolean} isLoading - Indicates if the API request is in progress.
 * @property {Array} notifications - Stores the list of fetched notifications.
 * @property {number} totalNotifications - Stores the total number of notifications.
 */
const initialState = {
  isLoading: false,
  notifications: [],
  totalNotifications: 0
};

/**
 * Asynchronous thunk to fetch all notifications from the backend.
 * Uses `getAllNotificationsThunk` to perform the API request.
 *
 * @function getAllNotifications
 * @async
 * @param {void} _ - No parameters are required.
 * @param {object} thunkAPI - Redux Toolkit's thunkAPI object for handling errors.
 * @returns {Promise<object>} - Resolves with the notifications data.
 */
export const getAllNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (_, thunkAPI) => {
    return getAllNotificationsThunk("/notification/", thunkAPI);
  }
);

/**
 * Redux slice for managing the notifications state.
 * Contains reducers to handle loading state and reset actions.
 */
const allNotificationsSlice = createSlice({
  name: "allNotifications",
  initialState,
  reducers: {
    // Sets isLoading to true to indicate a request is in progress.
    showLoading: (state) => {
      state.isLoading = true;
    },
    // Sets isLoading to false to indicate the request has completed.
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // Resets the notifications state to its initial values.
    clearAllNotificationValue: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      // Handles the pending state when fetching notifications.
      .addCase(getAllNotifications.pending, (state) => {
        state.isLoading = true;
      })
      // Handles the fulfilled state when notifications are successfully fetched.
      .addCase(getAllNotifications.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.notifications = payload.notifications;
        state.totalNotifications = payload.count;
      })
      // Handles the rejected state when fetching notifications fails.
      .addCase(getAllNotifications.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

/**
 * Exporting actions and reducer for use in the Redux store.
 */
export const { showLoading, hideLoading, clearAllNotificationValue } =
  allNotificationsSlice.actions;
export default allNotificationsSlice.reducer;
