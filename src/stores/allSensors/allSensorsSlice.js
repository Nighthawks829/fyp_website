import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSensorsThunk } from "./allSensorsThunk";
import { toast } from "react-toastify";

/**
 * Initial state for the sensor slice.
 * @property {boolean} isLoading - Indicates if the sensor data is being fetched.
 * @property {Array} sensors - Stores the list of sensors.
 * @property {number} totalSensors - Total number of sensors.
 */
const initialState = {
  isLoading: false,
  sensors: [],
  totalSensors: 0
};

/**
 * Async thunk action to fetch all sensors from the API.
 * It calls `getAllSensorsThunk` and handles API interactions.
 */
export const getAllSensors = createAsyncThunk(
  "sensor/getSensors",
  async (_, thunkAPI) => {
    return getAllSensorsThunk("/sensor", thunkAPI);
  }
);

/**
 * Redux slice to manage sensor data in the global state.
 * It handles actions for loading state, fetching, and clearing sensor data.
 */
const allSensorsSlice = createSlice({
  name: "allSensors",
  initialState,
  reducers: {
    /**
   * Sets `isLoading` to true to indicate data fetching is in progress.
   * @param {object} state - Current state of the sensor slice.
   */
    showLoading: (state) => {
      state.isLoading = true;
    },
    /**
 * Sets `isLoading` to false when data fetching is completed.
 * @param {object} state - Current state of the sensor slice.
 */
    hideLoading: (state) => {
      state.isLoading = false;
    },
    /**
 * Resets the sensor state to its initial values.
 * @returns {object} - The initial state of the sensor slice.
 */
    clearAllSensorValue: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      // Handles the pending state when sensor data is being fetched.
      .addCase(getAllSensors.pending, (state) => {
        state.isLoading = true;
      })
      // Handles the fulfilled state when sensor data is successfully fetched
      .addCase(getAllSensors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.sensors = payload.sensors;
        state.totalSensors = payload.count;
      })
      // Handles the rejected state when fetching sensor data fails.
      .addCase(getAllSensors.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

// Exporting actions for UI components to dispatch
export const { showLoading, hideLoading, clearAllSensorValue } =
  allSensorsSlice.actions;

// Exporting the reducer to be used in the Redux store
export default allSensorsSlice.reducer;
