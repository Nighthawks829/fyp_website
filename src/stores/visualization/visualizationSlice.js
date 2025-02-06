import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSensorDataThunk } from "./visualizationThunk";
import { toast } from "react-toastify";

/**
 * Initial state for the visualization slice.
 * @property {boolean} isLoading - Indicates whether the data is being fetched.
 * @property {string} sensorId - Stores the ID of the selected sensor.
 * @property {object} data - Stores the fetched sensor data.
 * @property {string} type - The type of sensor data (default: "Digital Input").
 * @property {number} count - A counter value related to the sensor data.
 */
const initialState = {
  isLoading: false,
  sensorId: "",
  data: {},
  type: "Digital Input",
  count: 0
};

/**
 * Async thunk function to fetch sensor data.
 * Dispatches different states (pending, fulfilled, rejected) based on API response.
 * 
 * @param {string} sensorId - The ID of the sensor for which data is requested.
 * @param {object} thunkAPI - Redux Thunk API for handling async operations.
 * @returns {Promise<object>} - The fetched sensor data.
 */
export const getSensorData = createAsyncThunk(
  "sensorData/getSensorData",
  async (sensorId, thunkAPI) => {
    return getSensorDataThunk(`/sensorData/${sensorId}`, thunkAPI);
  }
);

/**
 * Redux slice to manage visualization state.
 * Handles sensor data fetching, updates, and resets.
 */
const visualizationSlice = createSlice({
  name: "visualization",
  initialState,
  reducers: {
    // Handles changes in the visualization state.
    handleVisualizationChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    // Resets the visualization state to its initial values.
    clearVisualizationValues: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      // Handles the pending state when fetching sensor data.
      .addCase(getSensorData.pending, (state) => {
        state.isLoading = true;
      })
      // Handles the fulfilled state when sensor data is successfully fetched.
      .addCase(getSensorData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.sensorData;
        state.count = payload.count;
      })
      // Handles the rejected state when fetching sensor data fails.
      .addCase(getSensorData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

// Exporting actions and reducer
export const { handleVisualizationChange, clearVisualizationValues } =
  visualizationSlice.actions;
export default visualizationSlice.reducer;
