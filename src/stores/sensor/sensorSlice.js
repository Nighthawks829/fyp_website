import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSensorThunk,
  deleteSensorThunk,
  editSensorThunk,
  getSensorThunk,
} from "./sensorThunk";
import { toast } from "react-toastify";

/**
 * Initial state for the sensor slice.
 * @property {boolean} isLoading - Indicates whether an API request is in progress.
 * @property {string} boardId - The ID of the board associated with the sensor.
 * @property {string} boardName - The name of the board.
 * @property {string} name - The name of the sensor.
 * @property {string} pin - The pin number where the sensor is connected.
 * @property {string} type - The type of sensor (e.g., Digital Input).
 * @property {string} topic - The MQTT topic associated with the sensor.
 * @property {string} image - The image URL or file reference for the sensor.
 * @property {string} value - The current sensor value.
 */
const initialState = {
  isLoading: false,
  boardId: "",
  boardName: "",
  name: "",
  pin: "",
  type: "Digital Input",
  topic: "",
  image: "",
  value: "",
};

/**
 * Async thunk for adding a new sensor.
 * Dispatches an API request to add a sensor and handles the response.
 */
export const addSensor = createAsyncThunk(
  "sensor/addSensor",
  async (formData, thunkAPI) => {
    return addSensorThunk("/sensor/", formData, thunkAPI);
  }
);

/**
 * Async thunk for retrieving a specific sensor by ID.
 * Fetches sensor details from the API.
 */
export const getSensor = createAsyncThunk(
  "sensor/getSensor",
  async (sensorId, thunkAPI) => {
    return getSensorThunk(`/sensor/${sensorId}`, thunkAPI);
  }
);

/**
 * Async thunk for editing an existing sensor.
 * Sends updated sensor data to the API.
 */
export const editSensor = createAsyncThunk(
  "sensor/editSensor",
  async ({ sensorId, formData }, thunkAPI) => {
    return editSensorThunk(`/sensor/${sensorId}`, formData, thunkAPI);
  }
);

/**
 * Async thunk for deleting a sensor by ID.
 * Sends a delete request to the API.
 */
export const deleteSensor = createAsyncThunk(
  "sensor/deleteSensor",
  async (sensorId, thunkAPI) => {
    return deleteSensorThunk(`/sensor/${sensorId}`, thunkAPI);
  }
);

/**
 * Redux slice for managing sensor state.
 * Defines reducers and extra reducers for handling API requests.
 */
const sensorSlice = createSlice({
  name: "sensor",
  initialState,
  reducers: {
    /**
 * Handles changes to sensor fields in the Redux state.
 * @param {object} state - The current Redux state.
 * @param {object} action - The action containing the field name and new value.
 */
    handleSensorChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    /**
 * Resets sensor state to initial values.
 * @returns {object} - The initial state.
 */
    clearSensorValues: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle adding a sensor
      .addCase(addSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSensor.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Add sensor successful!");
      })
      .addCase(addSensor.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handle retrieving a sensor
      .addCase(getSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSensor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.boardId = payload.boardId;
        state.boardName = payload.boardName;
        state.name = payload.name;
        state.pin = payload.pin;
        state.type = payload.type;
        state.topic = payload.topic;
        state.image = payload.image;
        state.value = payload.value ? payload.value : "0";  // Default value if null
      })
      .addCase(getSensor.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handle editing a sensor
      .addCase(editSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSensor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Edit sensor successful!");
      })
      .addCase(editSensor.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Handle deleting a sensor
      .addCase(deleteSensor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSensor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Sensor deleted successfully");
      })
      .addCase(deleteSensor.rejected, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload);
      });
  },
});

export const { handleSensorChange, clearSensorValues } = sensorSlice.actions;
export default sensorSlice.reducer;
