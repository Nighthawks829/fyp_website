import { toast } from "react-toastify";
import {
  addDashboardThunk,
  deleteDashboardThunk,
  editDashboardThunk,
  getDashboardThunk
} from "./dashboardThunk";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the dashboard slice.
 * Stores dashboard details and loading state.
 */
const initialState = {
  isLoading: false, // Indicates if an async operation is in progress
  id: "",
  userId: "",
  sensorId: "",
  name: "",
  control: "",
  type: "widget", // Default type of dashboard
  data: 0, // Placeholder for sensor data
  sensorType: ""
};

/**
 * Async thunk to add a new dashboard.
 * Calls `addDashboardThunk` to send a POST request to the server.
 */
export const addDashboard = createAsyncThunk(
  "dashboard/addDashboard",
  async (dashboard, thunkAPI) => {
    return addDashboardThunk("/dashboard/", dashboard, thunkAPI);
  }
);

/**
 * Async thunk to retrieve a specific dashboard by ID.
 * Calls `getDashboardThunk` to send a GET request.
 */
export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (dashboardId, thunkAPI) => {
    return getDashboardThunk(`/dashboard/${dashboardId}`, thunkAPI);
  }
);

/**
 * Async thunk to edit an existing dashboard.
 * Calls `editDashboardThunk` to send a PATCH request.
 */
export const editDashboard = createAsyncThunk(
  "dashboard/editDashboard",
  async ({ dashboardId, dashboard }, thunkAPI) => {
    return editDashboardThunk(`/dashboard/${dashboardId}`, dashboard, thunkAPI);
  }
);

/**
 * Async thunk to delete a dashboard by ID.
 * Calls `deleteDashboardThunk` to send a DELETE request.
 */
export const deleteDashboard = createAsyncThunk(
  "dashboard/deleteDashboard",
  async (dashboardId, thunkAPI) => {
    return deleteDashboardThunk(`/dashboard/${dashboardId}`, thunkAPI);
  }
);

/**
 * Redux slice for handling dashboard-related state and actions.
 */
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Handles changes to the dashboard form inputs.
    handleDashboardChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    /**
 * Resets the dashboard state to its initial values.
 * Useful after successful form submission or when switching dashboards.
 */
    clearDashboardValues: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Dashboard
      .addCase(addDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDashboard.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add dashboard successful!");
      })
      .addCase(addDashboard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Get Dashboard
      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.id = payload.id;
        state.userId = payload.userId;
        state.sensorId = payload.sensorId;
        state.name = payload.name;
        state.control = payload.control;
        state.type = payload.type;
      })
      .addCase(getDashboard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Edit Dashboard
      .addCase(editDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit dashboard successful!");
      })
      .addCase(editDashboard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Delete Dashboard
      .addCase(deleteDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDashboard.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Dashboard deleted successful!");
      })
      .addCase(deleteDashboard.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

// Export actions for use in components
export const { handleDashboardChange, clearDashboardValues } =
  dashboardSlice.actions;

// Export reducer to be added to the Redux store
export default dashboardSlice.reducer;
